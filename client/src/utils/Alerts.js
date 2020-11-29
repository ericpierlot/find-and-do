import React, { useContext } from 'react';
import AlertContext from '../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div style={{}} key={alert.id}>
        <i
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: alert.colorChoosen,
          }}
        >
          {alert.message}
        </i>
      </div>
    ))
  );
};

export default Alerts;
