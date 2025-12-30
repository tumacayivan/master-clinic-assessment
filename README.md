# Master Clinical Assessment System

A comprehensive React-based clinical assessment application that guides users through a structured intake process and automatically determines the appropriate Level of Care (LOC) recommendation.

## Features

- **15 Comprehensive Sections** covering all aspects of clinical assessment:
  - Presenting Issue / Triage Anchor
  - Patient Information
  - Insurance Information
  - Substance Use Information
  - Pattern of Use
  - Withdrawal Risk
  - Safety / Psychiatric Emergency
  - Medical Safety
  - Housing & Environment
  - Functioning & Impairment
  - Legal & Practical Factors
  - Readiness & Motivation
  - Treatment History
  - Mental Health Primary Screen
  - Behavioral Stability Module

- **Dynamic Form Logic**: Questions appear/disappear based on previous answers
- **Automatic LOC Determination**: Implements a 6-phase algorithm to recommend:
  - ER / Emergency Medical Evaluation
  - Refer to Mental Health Provider
  - Detox / Medically Supervised Withdrawal
  - Residential / HLOC
  - PHP (Partial Hospitalization Program)
  - IOP (Intensive Outpatient Program)
  - OP / Outpatient

- **Form Validation**: Required field validation with error messages
- **Progress Tracking**: Visual progress bar showing completion status
- **Responsive Design**: Works on desktop and mobile devices

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── AssessmentForm.js    # Main form component
│   ├── Field.js              # Reusable field component
│   ├── Results.js           # Results display component
│   └── *.css                # Component styles
├── data/
│   └── fieldDefinitions.js  # All field definitions and section rules
├── utils/
│   ├── visibilityLogic.js   # Field/section visibility logic
│   └── locDetermination.js  # LOC determination algorithm
├── App.js                   # Main app component
├── App.css                  # App styles
├── index.js                 # Entry point
└── index.css               # Global styles
```

## How It Works

1. **Form Flow**: Users progress through sections sequentially, with fields appearing based on their answers
2. **Visibility Rules**: Each field has visibility rules that determine when it should be shown
3. **LOC Algorithm**: After completing all sections, the system runs through 6 phases:
   - Phase 0: SUD Primary Gatekeeper
   - Phase 1: ER / Emergency Safety
   - Phase 2: Detox Assessment
   - Phase 3: Residential / HLOC
   - Phase 4: PHP
   - Phase 5: IOP
   - Phase 6: OP (default)

4. **Results**: The system displays the recommended LOC with reasoning and next steps

## Key Features

- **Conditional Logic**: Complex visibility rules ensure users only see relevant questions
- **Data Validation**: Required fields are validated before proceeding
- **User Experience**: Clean, modern UI with progress indicators
- **Accessibility**: Semantic HTML and proper form labels

## Technologies Used

- React 18.2.0
- CSS3 (no external UI libraries for maximum customization)
- Create React App

## Notes

- All form data is stored in component state (not persisted to a backend)
- The LOC determination follows the exact specification provided
- Field definitions match the specification exactly

