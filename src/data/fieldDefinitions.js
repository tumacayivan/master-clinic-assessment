// Field definitions for all sections (0-14)

export const fieldDefinitions = {
  // SECTION 0 — PRESENTING ISSUE / TRIAGE ANCHOR
  '0.1': {
    id: '0.1',
    section: 0,
    type: 'single-choice',
    question: 'What is the main reason you are seeking help today?',
    options: [
      'Problems with alcohol or drugs',
      'Mental health symptoms (such as anxiety, depression, trauma, mood instability)',
      'Both mental health and alcohol/drug use',
      'I am not sure'
    ],
    required: true,
    visibility: { always: true }
  },
  '0.2': {
    id: '0.2',
    section: 0,
    type: 'single-choice',
    question: 'Are you currently using alcohol or drugs?',
    options: [
      'Yes',
      'No, but I have recently',
      'No',
      'No significant history of use'
    ],
    required: true,
    visibility: { always: true }
  },

  // SECTION 1 — PATIENT INFORMATION
  '1.1': {
    id: '1.1',
    section: 1,
    type: 'text',
    question: 'What is your full legal name?',
    required: true,
    visibility: { always: true }
  },
  '1.2': {
    id: '1.2',
    section: 1,
    type: 'date',
    question: 'What is your date of birth?',
    required: true,
    visibility: { always: true }
  },
  '1.3': {
    id: '1.3',
    section: 1,
    type: 'phone',
    question: 'What is the best phone number to reach you?',
    required: true,
    visibility: { always: true }
  },
  '1.4': {
    id: '1.4',
    section: 1,
    type: 'email',
    question: 'What is your email address?',
    required: false,
    visibility: { always: true }
  },
  '1.5': {
    id: '1.5',
    section: 1,
    type: 'single-choice',
    question: 'What is your relationship to the patient?',
    options: [
      'I am the patient',
      'Parent or guardian',
      'Spouse or partner',
      'Family member',
      'Friend',
      'Healthcare professional',
      'Other'
    ],
    required: true,
    visibility: { always: true }
  },
  '1.6': {
    id: '1.6',
    section: 1,
    type: 'single-choice',
    question: 'How did you hear about BeBold?',
    options: [
      'Google / online search',
      'Social media',
      'Friend or family',
      'Hospital or doctor',
      'Therapist or counselor',
      'Insurance company',
      'Court / legal referral',
      'Prior patient',
      'Other (please specify)'
    ],
    required: true,
    visibility: { always: true }
  },

  // SECTION 2 — INSURANCE INFORMATION
  '2.1': {
    id: '2.1',
    section: 2,
    type: 'single-choice',
    question: 'Do you have insurance?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '2.2': {
    id: '2.2',
    section: 2,
    type: 'text',
    question: 'Insurance Provider Name',
    required: true,
    visibility: { all: [{ field: '2.1', value: 'Yes' }] }
  },
  '2.3': {
    id: '2.3',
    section: 2,
    type: 'text',
    question: 'Insurance Member ID',
    required: true,
    visibility: { all: [{ field: '2.1', value: 'Yes' }] }
  },
  '2.4': {
    id: '2.4',
    section: 2,
    type: 'single-choice',
    question: 'If you do not have insurance, would you like assistance with any of the following?',
    options: [
      'Enrolling in Medicaid or other benefits',
      'Learning about self-pay options',
      'Not sure yet'
    ],
    required: true,
    visibility: { all: [{ field: '2.1', value: 'No' }] }
  },

  // SECTION 3 — SUBSTANCE USE INFORMATION
  '3.1': {
    id: '3.1',
    section: 3,
    type: 'multiple-choice',
    question: 'Which substances do you currently use or have used recently?',
    options: [
      'Alcohol (beer, wine, liquor)',
      'Opioids (heroin, fentanyl, oxycodone, hydrocodone, morphine, methadone)',
      'Benzodiazepines (Xanax, Klonopin, Ativan, Valium)',
      'Cocaine (powder or crack)',
      'Methamphetamine',
      'Marijuana / THC (smoked, vaped, edible)',
      'Synthetic cannabinoids (K2, Spice)',
      'Hallucinogens (LSD, mushrooms, DMT)',
      'Prescription stimulants (Adderall, Ritalin, Vyvanse)',
      'Prescription sedatives (Ambien, Lunesta)',
      'Inhalants (whippets, solvents)',
      'Other (please specify)',
      'I am not currently using'
    ],
    required: true,
    visibility: { section: 3 }
  },
  '3.2': {
    id: '3.2',
    section: 3,
    type: 'single-choice',
    question: 'What is the primary substance causing you the most problems right now?',
    options: [
      'Alcohol (beer, wine, liquor)',
      'Opioids (heroin, fentanyl, oxycodone, hydrocodone, morphine, methadone)',
      'Benzodiazepines (Xanax, Klonopin, Ativan, Valium)',
      'Cocaine (powder or crack)',
      'Methamphetamine',
      'Marijuana / THC (smoked, vaped, edible)',
      'Synthetic cannabinoids (K2, Spice)',
      'Hallucinogens (LSD, mushrooms, DMT)',
      'Prescription stimulants (Adderall, Ritalin, Vyvanse)',
      'Prescription sedatives (Ambien, Lunesta)',
      'Inhalants (whippets, solvents)',
      'Other (please specify)'
    ],
    required: true,
    visibility: { 
      all: [{ 
        field: '3.1', 
        condition: 'hasValue'
      }] 
    }
  },
  '3.3': {
    id: '3.3',
    section: 3,
    type: 'single-choice',
    question: 'When was the last time you used ANY substance?',
    options: [
      'Within the last 4 hours',
      'Within the last 12 hours',
      'Within the last 24 hours',
      '1–3 days ago',
      '4–7 days ago',
      '8–30 days ago',
      'More than 30 days ago'
    ],
    required: true,
    visibility: { 
      any: [
        { field: '0.2', value: 'Yes' },
        { field: '0.2', value: 'No, but I have recently' }
      ]
    }
  },
  '3.4': {
    id: '3.4',
    section: 3,
    type: 'single-choice',
    question: 'How do you usually take your primary substance?',
    options: [
      'Orally (swallowed, pills, drinks)',
      'Smoked',
      'Snorted',
      'Injected',
      'Other (please describe)'
    ],
    required: true,
    visibility: { all: [{ field: '3.2', condition: 'answered' }] }
  },
  '3.5': {
    id: '3.5',
    section: 3,
    type: 'single-choice',
    question: 'On average, how many days per week do you use substances?',
    options: [
      '0–1 days per week',
      '2–3 days per week',
      '4–6 days per week',
      'Every day'
    ],
    required: true,
    visibility: { 
      any: [
        { field: '0.2', value: 'Yes' },
        { field: '0.2', value: 'No, but I have recently' }
      ]
    }
  },
  '3.6': {
    id: '3.6',
    section: 3,
    type: 'single-choice',
    question: 'On days you use, how much of your primary substance do you typically use?',
    options: [
      'Light amount',
      'Moderate amount',
      'Heavy amount',
      'Very heavy amount'
    ],
    required: true,
    visibility: { 
      all: [{ 
        field: '3.1', 
        condition: 'hasValue'
      }] 
    }
  },
  '3.7': {
    id: '3.7',
    section: 3,
    type: 'single-choice',
    question: 'Do you often use more than one substance at the same time?',
    options: ['Yes', 'No'],
    required: false,
    visibility: { 
      all: [{ 
        field: '3.1', 
        condition: 'hasValue'
      }] 
    }
  },

  // SECTION 4 — PATTERN OF USE
  '4.1': {
    id: '4.1',
    section: 4,
    type: 'single-choice',
    question: 'When you start using, how often do you use more than you intended?',
    options: ['Never', 'Sometimes', 'Often', 'Almost always'],
    required: true,
    visibility: { section: 4 }
  },
  '4.2': {
    id: '4.2',
    section: 4,
    type: 'slider',
    question: 'How strong are your cravings to use substances right now? (0 = none, 10 = extreme)',
    min: 0,
    max: 10,
    required: true,
    visibility: { section: 4 }
  },
  '4.3': {
    id: '4.3',
    section: 4,
    type: 'single-choice',
    question: 'Do you typically need to use alcohol or drugs shortly after waking up to feel normal or stop withdrawal symptoms?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { section: 4 }
  },
  '4.4': {
    id: '4.4',
    section: 4,
    type: 'single-choice',
    question: 'Do you often use substances alone?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { section: 4 }
  },

  // SECTION 5 — WITHDRAWAL RISK
  '5.1': {
    id: '5.1',
    section: 5,
    type: 'single-choice',
    question: 'Have you ever experienced withdrawal symptoms when cutting down or stopping substance use?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { section: 5 }
  },
  '5.2': {
    id: '5.2',
    section: 5,
    type: 'multiple-choice',
    question: 'Which withdrawal symptoms have you experienced?',
    options: [
      'Shaking or tremors',
      'Sweating',
      'Nausea or vomiting',
      'Anxiety or agitation',
      'Hallucinations (seeing or hearing things)',
      'Seizures',
      'Insomnia (difficulty sleeping)',
      'Rapid heartbeat',
      'Confusion or disorientation',
      'Other (please describe)'
    ],
    required: true,
    visibility: { all: [{ field: '5.1', value: 'Yes' }] }
  },
  '5.3': {
    id: '5.3',
    section: 5,
    type: 'single-choice',
    question: 'Have you ever had a seizure related to withdrawal?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { all: [{ field: '5.1', value: 'Yes' }] }
  },
  '5.4': {
    id: '5.4',
    section: 5,
    type: 'single-choice',
    question: 'Have you ever been hospitalized because of withdrawal symptoms?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { all: [{ field: '5.1', value: 'Yes' }] }
  },
  '5.5': {
    id: '5.5',
    section: 5,
    type: 'single-choice',
    question: 'Do you experience withdrawal symptoms (such as shaking, sweating, nausea, or anxiety) when you first wake up?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { 
      any: [
        { field: '3.1', condition: 'contains', value: 'Alcohol (beer, wine, liquor)' },
        { field: '3.1', condition: 'contains', value: 'Benzodiazepines (Xanax, Klonopin, Ativan, Valium)' }
      ]
    }
  },
  '5.6': {
    id: '5.6',
    section: 5,
    type: 'single-choice',
    question: 'Do you use alcohol, benzodiazepines, or opioids every day or almost every day?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { 
      any: [
        { field: '3.1', condition: 'contains', value: 'Alcohol (beer, wine, liquor)' },
        { field: '3.1', condition: 'contains', value: 'Benzodiazepines (Xanax, Klonopin, Ativan, Valium)' },
        { field: '3.1', condition: 'contains', value: 'Opioids (heroin, fentanyl, oxycodone, hydrocodone, morphine, methadone)' }
      ]
    }
  },
  '5.7': {
    id: '5.7',
    section: 5,
    type: 'single-choice',
    question: 'Overall, how severe were your withdrawal symptoms the last time you stopped or cut down your use?',
    options: [
      'Mild — uncomfortable but still able to function normally',
      'Moderate — symptoms made normal functioning difficult',
      'Severe — symptoms were overwhelming or impossible to manage alone'
    ],
    required: true,
    visibility: { all: [{ field: '5.1', value: 'Yes' }] }
  },

  // SECTION 6 — SAFETY / PSYCHIATRIC EMERGENCY
  '6.1': {
    id: '6.1',
    section: 6,
    type: 'single-choice',
    question: 'In the past 2 weeks, have you had thoughts of harming yourself or not wanting to live?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '6.2': {
    id: '6.2',
    section: 6,
    type: 'single-choice',
    question: 'Do you have a plan or strong intent to act on these thoughts?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { all: [{ field: '6.1', value: 'Yes' }] }
  },
  '6.3': {
    id: '6.3',
    section: 6,
    type: 'single-choice',
    question: 'In the past 2 weeks, have you had thoughts about seriously harming someone else?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '6.4': {
    id: '6.4',
    section: 6,
    type: 'single-choice',
    question: 'Do you have a plan or intent to act on these thoughts?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { all: [{ field: '6.3', value: 'Yes' }] }
  },
  '6.5': {
    id: '6.5',
    section: 6,
    type: 'single-choice',
    question: 'Are you currently seeing or hearing things that other people do not see or hear?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '6.6': {
    id: '6.6',
    section: 6,
    type: 'single-choice',
    question: 'Are you currently feeling extremely paranoid or believing things others say are not true?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '6.7': {
    id: '6.7',
    section: 6,
    type: 'single-choice',
    question: 'Have you recently harmed yourself in any way (such as cutting, burning, or other self-injury)?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '6.8': {
    id: '6.8',
    section: 6,
    type: 'single-choice',
    question: 'Do you feel you are in immediate danger or unable to keep yourself safe right now?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '6.9': {
    id: '6.9',
    section: 6,
    type: 'multiple-choice',
    question: 'Are you currently experiencing any of the following symptoms?',
    options: [
      'Chest pain or pressure',
      'Difficulty breathing NOT caused by anxiety',
      'Feeling unable to stay awake (nodding off)',
      'Confusion or disorientation',
      'Seizure within the past 24 hours',
      'Uncontrolled bleeding',
      'Serious injury (head trauma, broken bones, etc.)',
      'None of the above'
    ],
    required: true,
    visibility: { always: true }
  },
  '6.10': {
    id: '6.10',
    section: 6,
    type: 'single-choice',
    question: 'Have you ever been hospitalized for a mental health crisis?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },

  // SECTION 7 — MEDICAL SAFETY
  '7.1': {
    id: '7.1',
    section: 7,
    type: 'single-choice',
    question: 'Do you have any major medical conditions (such as heart disease, lung disease, liver disease, kidney disease, diabetes, seizure disorder)?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '7.2': {
    id: '7.2',
    section: 7,
    type: 'textarea',
    question: 'Please describe your medical conditions.',
    required: true,
    visibility: { all: [{ field: '7.1', value: 'Yes' }] }
  },
  '7.3': {
    id: '7.3',
    section: 7,
    type: 'single-choice',
    question: 'Are you currently pregnant?',
    options: ['Yes', 'No', 'Not applicable'],
    required: true,
    visibility: { always: true }
  },
  '7.4': {
    id: '7.4',
    section: 7,
    type: 'single-choice',
    question: 'Are you currently taking any prescription medications?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '7.5': {
    id: '7.5',
    section: 7,
    type: 'textarea',
    question: 'Please list the medications you are currently taking.',
    required: true,
    visibility: { all: [{ field: '7.4', value: 'Yes' }] }
  },
  '7.6': {
    id: '7.6',
    section: 7,
    type: 'single-choice',
    question: 'Have you visited an emergency room within the past 30 days?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '7.7': {
    id: '7.7',
    section: 7,
    type: 'textarea',
    question: 'Please describe why you were seen in the emergency room.',
    required: true,
    visibility: { all: [{ field: '7.6', value: 'Yes' }] }
  },

  // SECTION 8 — HOUSING & ENVIRONMENT
  '8.1': {
    id: '8.1',
    section: 8,
    type: 'single-choice',
    question: 'Do you currently have a safe and stable place to live?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '8.2': {
    id: '8.2',
    section: 8,
    type: 'single-choice',
    question: 'Are you currently homeless or staying in a shelter, hotel, or couch-surfing?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '8.3': {
    id: '8.3',
    section: 8,
    type: 'single-choice',
    question: 'Do people you live with regularly use alcohol or drugs?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '8.4': {
    id: '8.4',
    section: 8,
    type: 'single-choice',
    question: 'Are there people in your life who pressure you to use substances?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '8.5': {
    id: '8.5',
    section: 8,
    type: 'single-choice',
    question: 'Do you have supportive people who want to help you stay sober and stable?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '8.6': {
    id: '8.6',
    section: 8,
    type: 'single-choice',
    question: 'Has your substance use led you into dangerous or risky situations (such as driving intoxicated, unsafe areas, or unsafe people)?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },

  // SECTION 9 — FUNCTIONING & IMPAIRMENT
  '9.1': {
    id: '9.1',
    section: 9,
    type: 'multiple-choice',
    question: 'Has your substance use or mental health affected any of the following areas of your life?',
    options: [
      'Work or school',
      'Family or relationships',
      'Legal issues',
      'Physical health',
      'Financial stability',
      'None of the above'
    ],
    required: true,
    visibility: { always: true }
  },
  '9.2': {
    id: '9.2',
    section: 9,
    type: 'single-choice',
    question: 'In the past 30 days, have you missed work, school, or important responsibilities because of your substance use or mental health?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },

  // SECTION 10 — LEGAL & PRACTICAL FACTORS
  '10.1': {
    id: '10.1',
    section: 10,
    type: 'single-choice',
    question: 'Are you currently on probation or parole?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '10.2': {
    id: '10.2',
    section: 10,
    type: 'single-choice',
    question: 'Are you currently employed?',
    options: ['Yes', 'No'],
    required: false,
    visibility: { always: true }
  },
  '10.3': {
    id: '10.3',
    section: 10,
    type: 'single-choice',
    question: 'Do you need assistance with finding stable housing during treatment?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '10.4': {
    id: '10.4',
    section: 10,
    type: 'single-choice',
    question: 'Do you have reliable transportation to attend treatment?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },

  // SECTION 11 — READINESS & MOTIVATION
  '11.1': {
    id: '11.1',
    section: 11,
    type: 'slider',
    question: 'On a scale of 0 to 10, how ready are you to make changes in your substance use or mental health? (0 = not ready at all, 10 = completely ready)',
    min: 0,
    max: 10,
    required: true,
    visibility: { always: true }
  },
  '11.2': {
    id: '11.2',
    section: 11,
    type: 'slider',
    question: 'On a scale of 0 to 10, how confident are you in your ability to stay on track with treatment? (0 = not confident, 10 = very confident)',
    min: 0,
    max: 10,
    required: false,
    visibility: { always: true }
  },
  '11.3': {
    id: '11.3',
    section: 11,
    type: 'single-choice',
    question: 'Are you able and willing to attend treatment 6 days per week for several hours a day if recommended?',
    options: ['Yes', 'No', 'Not sure'],
    required: true,
    visibility: { always: true }
  },

  // SECTION 12 — TREATMENT HISTORY
  '12.1': {
    id: '12.1',
    section: 12,
    type: 'single-choice',
    question: 'Have you ever been in treatment for mental health or substance use before?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '12.2': {
    id: '12.2',
    section: 12,
    type: 'date',
    question: 'When was the most recent treatment you attended?',
    required: true,
    visibility: { all: [{ field: '12.1', value: 'Yes' }] }
  },
  '12.3': {
    id: '12.3',
    section: 12,
    type: 'multiple-choice',
    question: 'Which types of treatment have you participated in before?',
    options: [
      'Detox (medically supervised withdrawal)',
      'Residential treatment',
      'PHP (Partial Hospitalization Program)',
      'IOP (Intensive Outpatient Program)',
      'Outpatient counseling / OP',
      'Individual therapy',
      'Psychiatry / medication management',
      'Other (please specify)'
    ],
    required: false,
    visibility: { all: [{ field: '12.1', value: 'Yes' }] }
  },
  '12.4': {
    id: '12.4',
    section: 12,
    type: 'single-choice',
    question: 'Did you complete your most recent treatment program?',
    options: ['Yes', 'No'],
    required: false,
    visibility: { all: [{ field: '12.1', value: 'Yes' }] }
  },
  '12.5': {
    id: '12.5',
    section: 12,
    type: 'single-choice',
    question: 'Have you relapsed since completing your most recent treatment?',
    options: ['Yes', 'No'],
    required: false,
    visibility: { all: [{ field: '12.1', value: 'Yes' }] }
  },

  // SECTION 13 — MENTAL HEALTH PRIMARY SCREEN
  '13.1': {
    id: '13.1',
    section: 13,
    type: 'single-choice',
    question: 'Based on everything above, which issue feels like the main problem for you right now?',
    options: [
      'Alcohol or drug use is the main problem',
      'Mental health symptoms are the main problem',
      'Both issues are equally a problem'
    ],
    required: true,
    visibility: { section: 13 }
  },
  '13.2': {
    id: '13.2',
    section: 13,
    type: 'multiple-choice',
    question: 'Which mental health symptoms are you currently experiencing?',
    options: [
      'Anxiety or nervousness',
      'Panic attacks',
      'Depression or low mood',
      'Mood swings',
      'Irritability or anger',
      'Trauma symptoms (flashbacks, nightmares, hypervigilance)',
      'Obsessive thoughts or compulsive behaviors',
      'Sleep problems (insomnia or excessive sleep)',
      'Hallucinations or delusional beliefs',
      'None of the above'
    ],
    required: true,
    visibility: { section: 13 }
  },
  '13.3': {
    id: '13.3',
    section: 13,
    type: 'single-choice',
    question: 'Have you ever been diagnosed with a mental health disorder?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { section: 13 }
  },
  '13.4': {
    id: '13.4',
    section: 13,
    type: 'textarea',
    question: 'What mental health diagnoses have you been given?',
    required: true,
    visibility: { all: [{ field: '13.3', value: 'Yes' }] }
  },
  '13.5': {
    id: '13.5',
    section: 13,
    type: 'single-choice',
    question: 'Are you currently seeing a psychiatrist, therapist, or counselor?',
    options: ['Yes', 'No'],
    required: false,
    visibility: { section: 13 }
  },
  '13.6': {
    id: '13.6',
    section: 13,
    type: 'single-choice',
    question: 'Are you currently taking any psychiatric medications?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { section: 13 }
  },
  '13.7': {
    id: '13.7',
    section: 13,
    type: 'textarea',
    question: 'Please list the psychiatric medications you are currently taking.',
    required: false,
    visibility: { all: [{ field: '13.6', value: 'Yes' }] }
  },

  // SECTION 14 — BEHAVIORAL STABILITY MODULE
  '14.1': {
    id: '14.1',
    section: 14,
    type: 'single-choice',
    question: 'In the past 2 weeks, have you had episodes where you felt unable to control your behavior or impulses?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '14.2': {
    id: '14.2',
    section: 14,
    type: 'single-choice',
    question: 'In the past 2 weeks, have you acted aggressively or violently toward another person?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '14.3': {
    id: '14.3',
    section: 14,
    type: 'single-choice',
    question: 'Have others recently told you that your behavior felt threatening, unsafe, or unpredictable to them?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '14.4': {
    id: '14.4',
    section: 14,
    type: 'single-choice',
    question: 'Do you currently have difficulty following basic expectations, instructions, or rules in structured settings (work, school, programs, etc.)?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '14.5': {
    id: '14.5',
    section: 14,
    type: 'single-choice',
    question: 'Do you feel you need someone to monitor or check on you frequently throughout the day to stay safe or stable?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  },
  '14.6': {
    id: '14.6',
    section: 14,
    type: 'single-choice',
    question: 'In the past 30 days, have you damaged property or had an emotional outburst that felt dangerous to yourself or others?',
    options: ['Yes', 'No'],
    required: true,
    visibility: { always: true }
  }
};

// Section visibility rules
export const sectionVisibility = {
  3: {
    any: [
      { field: '0.1', value: 'Problems with alcohol or drugs' },
      { field: '0.1', value: 'Both mental health and alcohol/drug use' },
      { field: '0.2', value: 'Yes' },
      { field: '0.2', value: 'No, but I have recently' }
    ]
  },
  4: {
    any: [
      { field: '0.2', value: 'Yes' },
      { field: '0.2', value: 'No, but I have recently' }
    ]
  },
  5: {
    any: [
      { field: '0.2', value: 'Yes' },
      { field: '0.2', value: 'No, but I have recently' }
    ]
  },
  13: {
    any: [
      { field: '0.1', value: 'Mental health symptoms (such as anxiety, depression, trauma, mood instability)' },
      { field: '0.1', value: 'Both mental health and alcohol/drug use' },
      { field: '0.1', value: 'I am not sure' },
      { field: '0.2', value: 'No' },
      { field: '6.1', value: 'Yes' },
      { field: '6.3', value: 'Yes' },
      { field: '6.5', value: 'Yes' },
      { field: '6.6', value: 'Yes' }
    ]
  }
};

