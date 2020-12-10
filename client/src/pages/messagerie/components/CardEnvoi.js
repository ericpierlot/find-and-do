import React from 'react';
import styled from 'styled-components';
const Flexbox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 2px white solid;
  padding-bottom: 80px;
  margin-top: 10px;
  background-color: transparent;
  backdrop-filter: blur(20px);
  border-radius: 10px;
  padding: 1rem;
  border: whitesmoke 2px solid;
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);
  @media (max-width: 920px) {
    width: 100%;
    border-bottom: 1px white solid;
  }
`;
export const CardEnvoi = ({
  recipientFirstName,
  createdAt,
  _id,
  text,
  handleDelete,
  recipientID,
}) => {
  return (
    <Flexbox key={_id}>
      <div>
        A {recipientFirstName} - le {createdAt.slice(0, 10)} :
      </div>
      <div>{text}</div>
      <button onClick={() => handleDelete(_id)}>Supprimer</button>
    </Flexbox>
  );
};
