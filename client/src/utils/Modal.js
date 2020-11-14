import React from 'react';
import Popup from 'reactjs-popup';

export default (props) => (
  <Popup trigger={<span style={{ cursor: 'pointer' }}> {props.text}</span>} modal>
    <span> {props.content} </span>
  </Popup>
);
