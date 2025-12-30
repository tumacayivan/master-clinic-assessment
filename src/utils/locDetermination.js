// LOC (Level of Care) Determination Algorithm
// Implements Phases 0-6 from the specification

export const determineLOC = (formData) => {
  // PHASE 0 — SUD PRIMARY GATEKEEPER
  const phase0Result = phase0_SUDPrimaryGatekeeper(formData);
  if (phase0Result) {
    return phase0Result;
  }

  // PHASE 1 — ER (EMERGENCY ROOM / ACUTE SAFETY)
  const phase1Result = phase1_ER(formData);
  if (phase1Result) {
    return phase1Result;
  }

  // PHASE 2 — DETOX / MEDICALLY SUPERVISED WITHDRAWAL
  const phase2Result = phase2_Detox(formData);
  if (phase2Result) {
    return phase2Result;
  }

  // PHASE 3 — RESIDENTIAL / HLOC
  const phase3Result = phase3_Residential(formData);
  if (phase3Result) {
    return phase3Result;
  }

  // PHASE 4 — PHP
  const phase4Result = phase4_PHP(formData);
  if (phase4Result) {
    return phase4Result;
  }

  // PHASE 5 — IOP
  const phase5Result = phase5_IOP(formData);
  if (phase5Result) {
    return phase5Result;
  }

  // PHASE 6 — OP
  const phase6Result = phase6_OP(formData);
  if (phase6Result) {
    return phase6Result;
  }

  return {
    loc: 'OP',
    reason: 'Default to Outpatient care',
    phase: 6
  };
};

// PHASE 0 — SUD PRIMARY GATEKEEPER
const phase0_SUDPrimaryGatekeeper = (formData) => {
  const presentingProblem = formData['0.1'];
  const mainProblem = formData['13.1'];
  const currentUse = formData['0.2'];
  const substances = formData['3.1'];

  // Check if mental health is primary
  if (
    presentingProblem === 'Mental health symptoms (such as anxiety, depression, trauma, mood instability)' ||
    mainProblem === 'Mental health symptoms are the main problem'
  ) {
    return {
      loc: 'Refer to Mental Health Provider',
      reason: 'Mental health is the primary concern',
      phase: 0
    };
  }

  // Check if no significant substance use
  if (
    Array.isArray(substances) && substances.includes('I am not currently using') &&
    currentUse === 'No significant history of use'
  ) {
    return {
      loc: 'Refer to Mental Health Provider',
      reason: 'No significant substance use history',
      phase: 0
    };
  }

  return null; // Continue to Phase 1
};

// PHASE 1 — ER (EMERGENCY ROOM / ACUTE SAFETY)
const phase1_ER = (formData) => {
  // Suicidal with intent
  if (formData['6.1'] === 'Yes' && formData['6.2'] === 'Yes') {
    return {
      loc: 'ER / Emergency Medical Evaluation',
      reason: 'Active suicidal ideation with plan or intent',
      phase: 1
    };
  }

  // Homicidal with intent
  if (formData['6.3'] === 'Yes' && formData['6.4'] === 'Yes') {
    return {
      loc: 'ER / Emergency Medical Evaluation',
      reason: 'Active homicidal ideation with plan or intent',
      phase: 1
    };
  }

  // Psychotic symptoms
  if (formData['6.5'] === 'Yes' || formData['6.6'] === 'Yes' || formData['6.8'] === 'Yes') {
    return {
      loc: 'ER / Emergency Medical Evaluation',
      reason: 'Active psychotic symptoms or immediate safety risk',
      phase: 1
    };
  }

  // Medical emergency symptoms
  const medicalSymptoms = formData['6.9'];
  if (Array.isArray(medicalSymptoms)) {
    const emergencySymptoms = [
      'Chest pain or pressure',
      'Difficulty breathing NOT caused by anxiety',
      'Feeling unable to stay awake (nodding off)',
      'Confusion or disorientation',
      'Seizure within the past 24 hours',
      'Uncontrolled bleeding',
      'Serious injury (head trauma, broken bones, etc.)'
    ];

    const hasEmergency = medicalSymptoms.some(symptom => 
      emergencySymptoms.includes(symptom)
    );

    if (hasEmergency) {
      return {
        loc: 'ER / Emergency Medical Evaluation',
        reason: 'Active medical emergency symptoms',
        phase: 1
      };
    }
  }

  return null; // Continue to Phase 2
};

// PHASE 2 — DETOX / MEDICALLY SUPERVISED WITHDRAWAL
const phase2_Detox = (formData) => {
  const substances = formData['3.1'];
  const withdrawalHistory = formData['5.1'];
  const lastUse = formData['3.3'];
  const withdrawalSeverity = formData['5.7'];

  if (!Array.isArray(substances)) {
    return null;
  }

  const hasAlcohol = substances.includes('Alcohol (beer, wine, liquor)');
  const hasBenzos = substances.includes('Benzodiazepines (Xanax, Klonopin, Ativan, Valium)');

  // PHASE 2A — AUTOMATIC DETOX (ALCOHOL OR BENZODIAZEPINES)
  if ((hasAlcohol || hasBenzos) && withdrawalHistory === 'Yes' && lastUse === '4–7 days ago') {
    return {
      loc: 'Detox / Medically Supervised Withdrawal',
      reason: 'Alcohol or benzodiazepine withdrawal risk with recent use',
      phase: 2
    };
  }

  // PHASE 2B — DETOX DUE TO WITHDRAWAL SEVERITY
  if (withdrawalHistory === 'Yes' && 
      (withdrawalSeverity === 'Moderate — symptoms made normal functioning difficult' ||
       withdrawalSeverity === 'Severe — symptoms were overwhelming or impossible to manage alone')) {
    return {
      loc: 'Detox / Medically Supervised Withdrawal',
      reason: 'Moderate to severe withdrawal symptoms',
      phase: 2
    };
  }

  return null; // Continue to Phase 3
};

// PHASE 3 — RESIDENTIAL / HLOC
const phase3_Residential = (formData) => {
  const daysPerWeek = formData['3.5'];
  const typicalAmount = formData['3.6'];
  const morningRelief = formData['4.3'];
  const lossOfControl = formData['4.1'];
  const cravingIntensity = formData['4.2'];
  const polysubstance = formData['3.7'];
  const selfHarm = formData['6.7'];

  // Substance Use Severity
  const highUseSeverity = (
    (daysPerWeek === '4–6 days per week' || daysPerWeek === 'Every day') ||
    (typicalAmount === 'Heavy amount' || typicalAmount === 'Very heavy amount') ||
    morningRelief === 'Yes' ||
    (lossOfControl === 'Often' || lossOfControl === 'Almost always') ||
    (typeof cravingIntensity === 'number' && cravingIntensity >= 7) ||
    polysubstance === 'Yes'
  );

  // Behavioral Instability
  const behavioralInstability = (
    formData['14.1'] === 'Yes' ||
    formData['14.2'] === 'Yes' ||
    formData['14.3'] === 'Yes' ||
    formData['14.4'] === 'Yes' ||
    formData['14.5'] === 'Yes' ||
    formData['14.6'] === 'Yes' ||
    selfHarm === 'Yes'
  );

  if (highUseSeverity || behavioralInstability) {
    return {
      loc: 'Residential / HLOC',
      reason: highUseSeverity && behavioralInstability 
        ? 'High substance use severity and behavioral instability'
        : highUseSeverity 
        ? 'High substance use severity requiring 24/7 care'
        : 'Behavioral instability requiring 24/7 monitoring',
      phase: 3
    };
  }

  return null; // Continue to Phase 4
};

// PHASE 4 — PHP (Partial Hospitalization Program)
const phase4_PHP = (formData) => {
  const daysPerWeek = formData['3.5'];
  const typicalAmount = formData['3.6'];
  const morningRelief = formData['4.3'];
  const phpAvailability = formData['11.3'];

  // Moderate SUD severity
  const moderateSeverity = (
    (daysPerWeek === '2–3 days per week' || daysPerWeek === '4–6 days per week') &&
    (typicalAmount === 'Moderate amount' || typicalAmount === 'Heavy amount') &&
    morningRelief === 'No'
  );

  // Can attend PHP schedule
  const canAttendPHP = phpAvailability === 'Yes';

  // Behavioral instability
  const hasBehavioralIssues = (
    formData['14.1'] === 'Yes' ||
    formData['14.2'] === 'Yes' ||
    formData['14.3'] === 'Yes' ||
    formData['14.4'] === 'Yes' ||
    formData['14.5'] === 'Yes' ||
    formData['14.6'] === 'Yes'
  );

  if (moderateSeverity && canAttendPHP && hasBehavioralIssues) {
    return {
      loc: 'PHP (Partial Hospitalization Program)',
      reason: 'Moderate SUD severity with behavioral issues, able to attend PHP schedule',
      phase: 4
    };
  }

  return null; // Continue to Phase 5
};

// PHASE 5 — IOP (Intensive Outpatient Program)
const phase5_IOP = (formData) => {
  const daysPerWeek = formData['3.5'];
  const typicalAmount = formData['3.6'];
  const morningRelief = formData['4.3'];
  const missedResponsibilities = formData['9.2'];
  const lifeAreasImpacted = formData['9.1'];
  const phpAvailability = formData['11.3'];

  // Mild-moderate SUD severity
  const mildModerateSeverity = (
    (daysPerWeek === '0–1 days per week' || daysPerWeek === '2–3 days per week') &&
    (typicalAmount === 'Light amount' || typicalAmount === 'Moderate amount') &&
    morningRelief === 'No'
  );

  // Little to moderate impairment
  const hasImpairment = (
    missedResponsibilities === 'Yes' ||
    (Array.isArray(lifeAreasImpacted) && !lifeAreasImpacted.includes('None of the above'))
  );

  // Not able to attend PHP
  const cannotAttendPHP = phpAvailability === 'No';

  // No behavioral instability
  const noBehavioralIssues = (
    formData['14.1'] === 'No' &&
    formData['14.2'] === 'No' &&
    formData['14.3'] === 'No' &&
    formData['14.4'] === 'No' &&
    formData['14.5'] === 'No' &&
    formData['14.6'] === 'No'
  );

  if (mildModerateSeverity && hasImpairment && (cannotAttendPHP || noBehavioralIssues)) {
    return {
      loc: 'IOP (Intensive Outpatient Program)',
      reason: 'Mild to moderate SUD severity with some impairment, suitable for IOP',
      phase: 5
    };
  }

  return null; // Continue to Phase 6
};

// PHASE 6 — OP (Outpatient / Lowest Level of Care)
const phase6_OP = (formData) => {
  const daysPerWeek = formData['3.5'];
  const typicalAmount = formData['3.6'];
  const morningRelief = formData['4.3'];
  const lifeAreasImpacted = formData['9.1'];
  const missedResponsibilities = formData['9.2'];
  const withdrawalHistory = formData['5.1'];

  // Mild SUD
  const mildSUD = (
    daysPerWeek === '0–1 days per week' &&
    typicalAmount === 'Light amount' &&
    morningRelief === 'No'
  );

  // Functioning mostly intact
  const functioningIntact = (
    (Array.isArray(lifeAreasImpacted) && lifeAreasImpacted.includes('None of the above')) &&
    missedResponsibilities === 'No'
  );

  // No withdrawal risk
  const noWithdrawalRisk = withdrawalHistory === 'No';

  // No behavioral instability
  const noBehavioralIssues = (
    formData['14.1'] === 'No' &&
    formData['14.2'] === 'No' &&
    formData['14.3'] === 'No' &&
    formData['14.4'] === 'No' &&
    formData['14.5'] === 'No' &&
    formData['14.6'] === 'No'
  );

  if (mildSUD && functioningIntact && noWithdrawalRisk && noBehavioralIssues) {
    return {
      loc: 'OP / Outpatient',
      reason: 'Mild SUD with intact functioning and no withdrawal or behavioral risks',
      phase: 6
    };
  }

  return {
    loc: 'OP / Outpatient',
    reason: 'Default outpatient care recommendation',
    phase: 6
  };
};

