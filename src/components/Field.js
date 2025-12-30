import React from 'react';
import './Field.css';

const Field = ({ fieldDef, value, onChange, error, isVisible }) => {
  if (!isVisible) {
    return null;
  }

  const renderField = () => {
    switch (fieldDef.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <input
            type={fieldDef.type === 'email' ? 'email' : fieldDef.type === 'phone' ? 'tel' : 'text'}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="field-input"
            placeholder={fieldDef.question}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="field-input"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="field-textarea"
            placeholder={fieldDef.question}
            rows={4}
          />
        );

      case 'single-choice':
        return (
          <div className="radio-group">
            {fieldDef.options.map((option) => (
              <label
                key={option}
                className={`radio-option ${value === option ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name={fieldDef.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(e.target.value)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'multiple-choice':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="checkbox-group">
            {fieldDef.options.map((option) => (
              <label
                key={option}
                className={`checkbox-option ${selectedValues.includes(option) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedValues.includes(option)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...selectedValues, option]
                      : selectedValues.filter((v) => v !== option);
                    onChange(newValue);
                  }}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'slider':
        const numValue = typeof value === 'number' ? value : fieldDef.min || 0;
        return (
          <div className="slider-container">
            <input
              type="range"
              min={fieldDef.min || 0}
              max={fieldDef.max || 10}
              value={numValue}
              onChange={(e) => onChange(parseInt(e.target.value, 10))}
              className="slider"
            />
            <div className="slider-value">{numValue}</div>
          </div>
        );

      default:
        return <div>Unknown field type: {fieldDef.type}</div>;
    }
  };

  return (
    <div className="field-group">
      <label className="field-label">
        {fieldDef.question}
        {fieldDef.required && <span className="required">*</span>}
      </label>
      {renderField()}
      {error && <div className="field-error">{error}</div>}
    </div>
  );
};

export default Field;

