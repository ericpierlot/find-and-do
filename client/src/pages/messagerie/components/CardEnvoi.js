import React from 'react';
import styled from 'styled-components';
const Flexbox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) contrast(120%);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  border-radius: 15px;
  padding: 1rem;
  border: 3px solid transparent;
  background-clip: padding-box;
  :hover {
    background-color: ${({ theme }) => theme.header};
  }
  @media (max-width: 920px) {
    width: 100%;
  }
`;

const Button = styled.button`
  text-align: center;
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.textinvert};
  cursor: pointer;
  text-align: center;
  border: none;
  border-radius: 10px;
  transition: all 0.4s ease-in-out;
  background-color: #fa7b7b;

  font-weight: 600;
  :hover {
    background-color: #fa5757;
    color: ${({ theme }) => theme.text};
    border: 3px rgba(255, 255, 255, 0.2) solid;
    transition: all 0.4s ease-in-out;
  }
  :focus {
    outline: none;
  }
  border: 3px transparent solid;
  background-clip: padding-box;
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
      <Button onClick={() => handleDelete(_id)}>Supprimer</Button>
    </Flexbox>
  );
};
