import React from 'react';
import styled from 'styled-components';
import Spinner from '../../../../utils/components/Spinner';
import Alerts from '../../../../utils/Alerts';

const ButtonSend = styled.button`
  width: 50%;
  text-align: center;
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  text-align: center;
  border: none;
  border-radius: 10px;
  transition: all 0.4s ease-in-out;
  background-color: #eb9e82;

  font-weight: 600;
  :hover {
    border: 3px rgba(255, 255, 255, 0.2) solid;
    transition: all 0.4s ease-in-out;
  }
  :focus {
    outline: none;
  }
  margin-bottom: 1rem;
  border: 3px transparent solid;
  background-clip: padding-box;
  @media (min-width: 840px) {
    width: 20%;
  }
`;

const TextArea = styled.textarea`
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.header};
  backdrop-filter: blur(30px) contrast(120%);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  border-radius: 15px;
  border: 3px solid transparent;
  background-clip: padding-box;
  padding: 1rem;
  font-size: 1.5rem;
  width: 80%;
`;
export const FormContactUser = ({
  messageToSend,
  setMessageToSend,
  handleSendMessage,
  isLoading,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextArea
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
      <ButtonSend onClick={handleSendMessage}>
        {isLoading ? <Spinner /> : 'Envoyer 📨'}
      </ButtonSend>
    </div>
  );
};
