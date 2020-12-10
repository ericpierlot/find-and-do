import React from 'react';
import styled from 'styled-components';
import Spinner from '../../../../utils/components/Spinner';
import Alerts from '../../../../utils/Alerts';

const Button = styled.button`
  text-align: center;
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  border-radius: 15px;
  transition: all 0.4s ease-in-out;
  background-image: linear-gradient(
    to right,
    #eb3941,
    #f15e64,
    #e14e53,
    #e2373f
  );
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(242, 97, 103, 0.4);
  :hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
  }
  :focus {
    outline: none;
  }
  margin: auto;
  margin-bottom: 1rem;
  border: 3px rgba(255, 255, 255, 0.3) solid;
`;

export const FormContactUser = ({
  messageToSend,
  setMessageToSend,
  handleSendMessage,
  isLoading,
}) => {
  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <textarea
        name='message'
        id=''
        cols='30'
        rows='10'
        value={messageToSend}
        maxLength={650}
        minLength={20}
        onChange={(e) =>
          setMessageToSend(
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
          )
        }
      />
      <Alerts />
      <Button onClick={handleSendMessage}>
        {isLoading ? <Spinner /> : 'Envoyer'}
      </Button>
    </form>
  );
};
