import React from 'react';
import spinner from '../../images/spinner.svg';

export default ({ size }) => (
  <>
    {size ? (
      <div style={{ minHeight: '100vh' }}>
        <img
          src={spinner}
          style={{ width: '200px', margin: 'auto', display: 'block' }}
          alt='Loading...'
        />
      </div>
    ) : (
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    )}
  </>
);
