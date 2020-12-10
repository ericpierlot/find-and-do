import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FormContactUser } from '../../experience/components/formContactUser/FormContactUser';
import AlertContext from '../../../context/alert/alertContext';
import AuthContext from '../../../context/auth/authContext';
import axios from 'axios';

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
export const CardReception = ({
  senderFirstName,
  createdAt,
  _id,
  text,
  recipientID,
}) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const [messageToSend, setMessageToSend] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  let sendUserID = null;
  if (user) {
    sendUserID = user._id;
  }

  const handleSendMessage = (e) => {
    e.preventDefault();

    const sendMessage = async () => {
      setIsLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const dataToSend = {
        messageToSend,
        recipientID,
        sendUserID,
      };

      try {
        await axios.post('/api/messages/send', dataToSend, config);
        setAlert(
          'Votre message a été envoyé avec succès, vous pouvez avoir accès via votre profil.',
          'green'
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setAlert(
          "Une erreur est survenue, votre message n'a pas pu être envoyé.",
          'red'
        );
      }
    };
    sendMessage();
  };

  return (
    <>
      <Flexbox key={_id}>
        <div>
          De {senderFirstName} - le {createdAt.slice(0, 10)} :
        </div>
        <div>{text}</div>
        {/* <button onClick={() => handleDelete(_id)}>Supprimer</button> */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          Répondre
        </button>
      </Flexbox>
      {isOpen ? (
        <FormContactUser
          messageToSend={messageToSend}
          setMessageToSend={setMessageToSend}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      ) : (
        ''
      )}
    </>
  );
};
