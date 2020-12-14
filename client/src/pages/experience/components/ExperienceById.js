import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../../utils/components/Spinner';
import { Link } from 'react-router-dom';
import { FormContactUser } from './formContactUser/FormContactUser';
import styled from 'styled-components';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';

const Section = styled.section`
  width: 90%;
  padding-top: 5rem;
  margin: auto;
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  @media screen and(min-width: 840px) {
    width: 80%;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 840px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
  padding-bottom: 2rem;
  @media (min-width: 840px) {
    padding-bottom: 0;
    text-align: left;
    width: 40%;
  }
`;

const Right = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 840px) {
    text-align: left;
    width: 60%;
  }
`;
const Title = styled.h1`
  text-align: center;
  font-size: 4rem;
  color: ${({ theme }) => theme.textinvert};
  text-shadow: rgba(60, 64, 67, 0.3) 0px 1px 10px;
  @media (min-width: 840px) {
    font-size: 5rem;
    text-align: left;
  }
`;

const UnderTitle = styled.h3`
  color: ${({ theme }) => theme.textinvert};
  font-size: 1rem;
  letter-spacing: 0.125rem;
  font-weight: 600;
  text-shadow: rgba(60, 64, 67, 0.3) 0px 1px 10px;
  @media (min-width: 840px) {
    margin-bottom: 0;
    font-size: 2rem;
  }
`;

const DivWrapper = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) contrast(120%);
  border-radius: 15px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  border: 3px solid transparent;
  background-clip: padding-box;
  padding: 1rem;
  margin-top: 2.5rem;
  p {
    margin-top: 1rem;
    width: 100%;
  }
  @media (min-width: 840px) {
    width: 100%;
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
    border: 3px solid transparent;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    background-clip: padding-box;
    border-radius: 10px;
  }

  @media (max-width: 840px) {
    img:first-child {
    }
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
  width: 100%;
  text-align: center;
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  height: 3rem;
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
    width: 30%;
  }
`;

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: auto;
  @media (min-width: 840px) {
    width: 70%;
  }
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
      <Container>
        {readThisID ? (
          <>
            <Left>
              <IMAGES>
                <img
                  src='https://source.unsplash.com/random/226x340'
                  alt='image1'
                />
                <img
                  src='https://source.unsplash.com/random/226x167'
                  alt='image4'
                />
                <img
                  src='https://source.unsplash.com/random/226x167'
                  alt='image3'
                />
                <img
                  src='https://source.unsplash.com/random/226x340'
                  alt='image2'
                />
              </IMAGES>
            </Left>
            <Right>
              <Title>{title}</Title>
              <UnderTitle>
                Proposée sur <u>{lieu}</u>
              </UnderTitle>
            </Right>
            <Wrapper>
              <DivWrapper>
                <h2>Au programme</h2>
                <p>{programme}</p>
              </DivWrapper>
            </Wrapper>
            <Wrapper>
              <DivWrapper style={{ cursor: 'pointer' }}>
                <h2>
                  A propos de {author.firstName} {author.lastName}
                </h2>
                <p>{aboutYou}</p>
              </DivWrapper>
            </Wrapper>
            <Wrapper>
              <DivWrapper style={{ marginBottom: '5rem', textAlign: 'center' }}>
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
                    display: contactIsClicked ? 'none' : '',
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
            </Wrapper>
          </>
        ) : (
          <Spinner />
        )}
      </Container>
    </Section>
  );
};

export default ExperienceById;
