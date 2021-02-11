import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormContactUser } from "../../experience/components/formContactUser/FormContactUser";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";
import axios from "axios";

const Flexbox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  background-color: #a3fa7b;

  font-weight: 600;
  :hover {
    background-color: #ffffff;
    color: #a3fa7b;
    border: 3px rgba(255, 255, 255, 0.2) solid;
    transition: all 0.4s ease-in-out;
  }
  :focus {
    outline: none;
  }
  border: 3px transparent solid;
  background-clip: padding-box;
`;

export const CardReception = ({
  senderFirstName,
  createdAt,
  _id,
  text,
  recipientID,
  handleDelete,
}) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const [messageToSend, setMessageToSend] = useState("");
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
          "Content-Type": "application/json",
        },
      };

      const dataToSend = {
        messageToSend,
        recipientID,
        sendUserID,
      };

      try {
        await axios.post("/api/messages/send", dataToSend, config);
        setAlert(
          "Votre message a été envoyé avec succès, vous pouvez avoir accès via votre profil.",
          "green"
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setAlert(
          "Une erreur est survenue, votre message n'a pas pu être envoyé.",
          "red"
        );
      }
    };
    sendMessage();
  };

  return (
    <>
      <Flexbox key={_id}>
        <div>
          De <Link to={`/profil-user/${recipientID}`}>{senderFirstName}</Link> -
          le {createdAt.slice(0, 10)} :
        </div>
        <div>{text}</div>
        <button onClick={() => handleDelete(_id)}>Supprimer</button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          Répondre
        </Button>
      </Flexbox>

      {isOpen ? (
        <FormContactUser
          messageToSend={messageToSend}
          setMessageToSend={setMessageToSend}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};
