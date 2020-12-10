import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../../utils/components/Spinner';
import { Link } from 'react-router-dom';
import {
  Wrapper,
  Section,
  Article,
} from '../../../css/styled/Experience/styled';
import { FormContactUser } from './formContactUser/FormContactUser';
import styled from 'styled-components';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;

  border: whitesmoke 2px solid;
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);
  width: 100%;
  border-radius: 10px;
  padding: 1rem;
  margin-top: 2.5rem;

  p {
    margin-top: 1rem;
    width: 100%;
  }
  @media (max-width: 1200px) {
    width: 225px;
  }

  @media (max-width: 920px) {
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;

    justify-content: center;
    align-items: center;
  }
`;

const TOP = styled.div`
  width: 100%;
  margin: auto;
  h2 {
    margin-top: 2.2rem;
  }
  h4 {
    margin-top: 1rem;
  }

  @media (max-width: 920px) {
    h2 {
      margin-top: 0;
    }
  }
`;

const IMAGES = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: auto;
  img {
    border: 2px solid whitesmoke;
    border-radius: 15px;
  }

  @media (max-width: 920px) {
    img:nth-child(2) {
      display: none;
    }
    img:nth-child(3) {
      display: none;
    }
    img:nth-child(4) {
      display: none;
    }
    img:nth-child(5) {
      display: none;
    }
  }
`;

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

const ExperienceById = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [readThisID, setReadThisID] = useState('');
  const [author, setAuthor] = useState({
    id: '',
    firstName: '',
    lastName: '',
  });

  const { title, aboutYou, lieu, programme } = readThisID;

  // Loading
  const [isLoading, setIsLoading] = useState(false);
  // CONTACT HOOKS
  const [contactIsClicked, setContactIsClicked] = useState(false);
  const [messageToSend, setMessageToSend] = useState('');
  let sendUserID = null;
  if (user) {
    sendUserID = user._id;
  }
  const recipientID = author._id;

  const { id } = useParams();

  useEffect(() => {
    // go to my api rest /api/experience/:id

    const fetchExperienceID = async () => {
      const { data } = await axios.get(`/api/experiences/id/${id}`);
      setReadThisID(data);
    };
    // retrive Author of the experience
    const getAuthorFullName = async () => {
      const { data } = await axios.get(`/api/users/experience/${id}`);
      //console.log(data.author[0]);
      const { firstName, lastName, _id } = data.author[0];
      setAuthor({ _id, firstName, lastName });
    };

    fetchExperienceID();
    getAuthorFullName();
  }, [id]);

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
    <Section>
      <Wrapper>
        <Article>
          {readThisID ? (
            <>
              <IMAGES>
                <img
                  src='https://source.unsplash.com/random/226x340'
                  alt='image1'
                />
                <img
                  src='https://source.unsplash.com/random/226x340'
                  alt='image2'
                />
                <img
                  src='https://source.unsplash.com/random/226x169'
                  alt='image3'
                />
                <img
                  src='https://source.unsplash.com/random/226x169'
                  alt='image4'
                />
                <img
                  src='https://source.unsplash.com/random/226x340'
                  alt='image5'
                />
              </IMAGES>
              <TOP>
                <h2>{title}</h2>
                <h4>
                  Proposée sur <u>{lieu}</u>
                </h4>
              </TOP>
              <DivWrapper style={{ height: '100px' }}>
                <h2>Expérience organisée par {author.firstName}</h2>
              </DivWrapper>
              <div>
                <DivWrapper>
                  <h2>Au programme</h2>
                  <p>{programme}</p>
                </DivWrapper>
                <DivWrapper>
                  <h2>A propos de {author.firstName}</h2>
                  <p>{aboutYou}</p>
                </DivWrapper>
              </div>
              <DivWrapper style={{ marginBottom: '5rem' }}>
                {contactIsClicked ? (
                  user ? (
                    <FormContactUser
                      messageToSend={messageToSend}
                      setMessageToSend={setMessageToSend}
                      handleSendMessage={handleSendMessage}
                      isLoading={isLoading}
                    />
                  ) : (
                    <Link
                      to='/subscribe'
                      style={{
                        color: 'red',
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                      }}
                    >
                      Pour pouvoir contacter {author.firstName} veuillez créer
                      un compte.
                    </Link>
                  )
                ) : (
                  ''
                )}

                <Button
                  style={{
                    backgroundColor: contactIsClicked ? 'grey' : '',
                    backgroundImage: contactIsClicked ? 'none' : null,
                    pointerEvents: contactIsClicked ? 'none' : '',
                  }}
                  onClick={() => setContactIsClicked(true)}
                >
                  Contacter {author.firstName}
                </Button>
                <h6 style={{ textAlign: 'center' }}>
                  Pour protéger votre paiement, ne transférez jamais d'argent et
                  ne communiquez pas en dehors du site ou de l'application Find
                  & Do
                </h6>
              </DivWrapper>
            </>
          ) : (
            <Spinner />
          )}
        </Article>
      </Wrapper>
    </Section>
  );
};

export default ExperienceById;
