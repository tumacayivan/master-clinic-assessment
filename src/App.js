import React, { useState } from 'react';
import AssessmentForm from './components/AssessmentForm';
import Results from './components/Results';
import './App.css';

function App() {
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [locResult, setLocResult] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleComplete = (result, data) => {
    setLocResult(result);
    setFormData(data);
    setAssessmentComplete(true);
  };

  const handleReset = () => {
    setAssessmentComplete(false);
    setLocResult(null);
    setFormData(null);
  };

  return (
    <div className="app">
      <div className="container">
        {!assessmentComplete ? (
          <>
            <div className="header">
              <h1>Master Clinical Assessment</h1>
              <p>Please answer all questions to determine the appropriate level of care</p>
            </div>
            <AssessmentForm onComplete={handleComplete} />
          </>
        ) : (
          <Results locResult={locResult} formData={formData} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}

export default App;

