import React, { useState, useMemo } from 'react';
import Field from './Field';
import { fieldDefinitions, sectionVisibility } from '../data/fieldDefinitions';
import { isFieldVisible, isSectionVisible } from '../utils/visibilityLogic';
import { determineLOC } from '../utils/locDetermination';
import './AssessmentForm.css';

const sectionTitles = {
  0: 'Presenting Issue / Triage Anchor',
  1: 'Patient Information',
  2: 'Insurance Information',
  3: 'Substance Use Information',
  4: 'Pattern of Use',
  5: 'Withdrawal Risk',
  6: 'Safety / Psychiatric Emergency',
  7: 'Medical Safety',
  8: 'Housing & Environment',
  9: 'Functioning & Impairment',
  10: 'Legal & Practical Factors',
  11: 'Readiness & Motivation',
  12: 'Treatment History',
  13: 'Mental Health Primary Screen',
  14: 'Behavioral Stability Module'
};

const AssessmentForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [currentSection, setCurrentSection] = useState(0);

  // Get all field IDs grouped by section
  const fieldsBySection = useMemo(() => {
    const grouped = {};
    Object.keys(fieldDefinitions).forEach(fieldId => {
      const section = fieldDefinitions[fieldId].section;
      if (!grouped[section]) {
        grouped[section] = [];
      }
      grouped[section].push(fieldId);
    });
    return grouped;
  }, []);

  // Get visible sections
  const visibleSections = useMemo(() => {
    return Object.keys(fieldsBySection)
      .map(Number)
      .filter(section => {
        // Section 0 and 1 are always visible
        if (section === 0 || section === 1) return true;
        return isSectionVisible(section, formData, sectionVisibility);
      })
      .sort((a, b) => a - b);
  }, [formData, fieldsBySection]);

  // Get visible fields for current section
  const visibleFields = useMemo(() => {
    if (!fieldsBySection[currentSection]) return [];
    return fieldsBySection[currentSection].filter(fieldId => {
      const fieldDef = fieldDefinitions[fieldId];
      return isFieldVisible(fieldId, fieldDef, formData, sectionVisibility);
    });
  }, [currentSection, formData, fieldsBySection]);

  // Calculate progress
  const progress = useMemo(() => {
    const totalSections = visibleSections.length;
    const currentIndex = visibleSections.indexOf(currentSection);
    return totalSections > 0 ? ((currentIndex + 1) / totalSections) * 100 : 0;
  }, [currentSection, visibleSections]);

  const updateField = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    // Clear error for this field
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateSection = () => {
    const sectionErrors = {};
    visibleFields.forEach(fieldId => {
      const fieldDef = fieldDefinitions[fieldId];
      if (fieldDef.required) {
        const value = formData[fieldId];
        if (value === undefined || value === null || value === '' || 
            (Array.isArray(value) && value.length === 0)) {
          sectionErrors[fieldId] = 'This field is required';
        }
      }
    });
    setErrors(sectionErrors);
    return Object.keys(sectionErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateSection()) {
      return;
    }

    const currentIndex = visibleSections.indexOf(currentSection);
    if (currentIndex < visibleSections.length - 1) {
      setCurrentSection(visibleSections[currentIndex + 1]);
      window.scrollTo(0, 0);
    } else {
      // Last section - determine LOC and complete
      const locResult = determineLOC(formData);
      onComplete(locResult, formData);
    }
  };

  const handlePrevious = () => {
    const currentIndex = visibleSections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(visibleSections[currentIndex - 1]);
      window.scrollTo(0, 0);
    }
  };

  const canGoNext = visibleSections.indexOf(currentSection) < visibleSections.length - 1;
  const canGoPrevious = visibleSections.indexOf(currentSection) > 0;

  return (
    <div className="assessment-form">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="section">
        <h2 className="section-title">
          Section {currentSection + 1}: {sectionTitles[currentSection]}
        </h2>
        {visibleFields.map(fieldId => {
          const fieldDef = fieldDefinitions[fieldId];
          return (
            <Field
              key={fieldId}
              fieldDef={fieldDef}
              value={formData[fieldId]}
              onChange={(value) => updateField(fieldId, value)}
              error={errors[fieldId]}
              isVisible={true}
            />
          );
        })}
      </div>

      <div className="button-group">
        <button
          className="btn btn-secondary"
          onClick={handlePrevious}
          disabled={!canGoPrevious}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
        >
          {canGoNext ? 'Next' : 'Complete Assessment'}
        </button>
      </div>
    </div>
  );
};

export default AssessmentForm;

