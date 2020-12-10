import React, { useContext } from 'react';
import AlertContext from '../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div style={{}} key={alert.id}>
        <u
          style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            color: alert.colorChoosen,
          }}
        >
          {alert.message}
        </u>
      </div>
    ))
  );
};

export default Alerts;
