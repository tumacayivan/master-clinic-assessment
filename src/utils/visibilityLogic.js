// Visibility logic for fields and sections

export const isFieldVisible = (fieldId, fieldDef, formData, sectionVisibilityRules) => {
  const visibility = fieldDef.visibility;

  // Always visible
  if (visibility.always) {
    return true;
  }

  // Section-based visibility
  if (visibility.section !== undefined) {
    return isSectionVisible(visibility.section, formData, sectionVisibilityRules);
  }

  // All conditions must be true
  if (visibility.all) {
    return visibility.all.every(condition => checkCondition(condition, formData));
  }

  // Any condition must be true
  if (visibility.any) {
    return visibility.any.some(condition => checkCondition(condition, formData));
  }

  return false;
};

export const isSectionVisible = (sectionId, formData, sectionVisibilityRules) => {
  const rules = sectionVisibilityRules[sectionId];
  if (!rules) return true; // Default to visible if no rules

  if (rules.always) return true;
  if (rules.any) {
    return rules.any.some(condition => checkCondition(condition, formData));
  }
  if (rules.all) {
    return rules.all.every(condition => checkCondition(condition, formData));
  }

  return true;
};

const checkCondition = (condition, formData) => {
  const fieldValue = formData[condition.field];

  // Check if field is answered
  if (condition.condition === 'answered') {
    return fieldValue !== undefined && fieldValue !== null && fieldValue !== '';
  }

  // Check if field has value
  if (condition.condition === 'hasValue') {
    if (Array.isArray(fieldValue)) {
      return fieldValue.length > 0;
    }
    return fieldValue !== undefined && fieldValue !== null && fieldValue !== '';
  }

  // Check if array contains value
  if (condition.condition === 'contains' || condition.condition === 'includes') {
    if (Array.isArray(fieldValue)) {
      if (typeof condition.value === 'function') {
        return condition.value(fieldValue);
      }
      if (typeof condition.value === 'string') {
        return fieldValue.includes(condition.value);
      }
    }
    if (typeof condition.value === 'string' && typeof fieldValue === 'string') {
      return fieldValue.includes(condition.value);
    }
    return false;
  }

  // Check count
  if (condition.condition === 'count') {
    if (Array.isArray(fieldValue) && typeof condition.value === 'function') {
      return condition.value(fieldValue);
    }
    return false;
  }

  // Direct value comparison
  if (condition.value !== undefined) {
    if (Array.isArray(fieldValue)) {
      return fieldValue.includes(condition.value);
    }
    return fieldValue === condition.value;
  }

  return false;
};

