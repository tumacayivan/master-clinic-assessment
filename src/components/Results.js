import React from 'react';
import './Results.css';

const Results = ({ locResult, formData, onReset }) => {
  return (
    <div className="results-container">
      <h2 className="results-title">Assessment Complete</h2>
      <div className="loc-result">{locResult.loc}</div>
      <div className="results-details">
        <h3>Recommendation Details</h3>
        <p><strong>Reason:</strong> {locResult.reason}</p>
        <p><strong>Determined in Phase:</strong> {locResult.phase}</p>
      </div>
      <div className="results-details" style={{ marginTop: '20px' }}>
        <h3>Next Steps</h3>
        {locResult.loc === 'ER / Emergency Medical Evaluation' && (
          <p>
            <strong>Immediate Action Required:</strong> Please proceed to your nearest emergency room 
            or call 911 immediately. This assessment indicates an acute safety risk that requires 
            immediate medical attention.
          </p>
        )}
        {locResult.loc === 'Refer to Mental Health Provider' && (
          <p>
            Based on your responses, mental health appears to be the primary concern. 
            We recommend connecting with a mental health provider who specializes in your specific needs.
          </p>
        )}
        {locResult.loc === 'Detox / Medically Supervised Withdrawal' && (
          <p>
            You require medically supervised withdrawal management. Our team will help coordinate 
            admission to a detoxification facility to ensure your safety during withdrawal.
          </p>
        )}
        {locResult.loc === 'Residential / HLOC' && (
          <p>
            A residential treatment program with 24/7 support is recommended. Our intake team 
            will work with you to find an appropriate facility and coordinate admission.
          </p>
        )}
        {locResult.loc === 'PHP (Partial Hospitalization Program)' && (
          <p>
            A Partial Hospitalization Program (PHP) is recommended. This involves daily treatment 
            sessions while allowing you to return home in the evenings. Our team will help schedule 
            your assessment appointment.
          </p>
        )}
        {locResult.loc === 'IOP (Intensive Outpatient Program)' && (
          <p>
            An Intensive Outpatient Program (IOP) is recommended. This typically involves 
            3-hour sessions several times per week. Our team will help schedule your assessment appointment.
          </p>
        )}
        {locResult.loc === 'OP / Outpatient' && (
          <p>
            Outpatient treatment is recommended. Our team will help schedule your initial 
            assessment appointment to begin treatment.
          </p>
        )}
      </div>
      <button className="btn btn-primary" onClick={onReset} style={{ marginTop: '30px' }}>
        Start New Assessment
      </button>
    </div>
  );
};

export default Results;

