import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import AuthContext from '../../../context/auth/authContext';
import { CardEnvoi } from './CardEnvoi';

const Section = styled.section`
  margin: auto;
  width: 100%;
  margin-top: 90px;
  margin-bottom: 45px;
  @media (max-width: 920px) {
    margin: 0;
    overflow: auto;
  }
`;
const Wrapper = styled.section`
  min-height: 90vh;
  margin: auto;
  margin-top: 5vh;
  max-width: 90vw;
  border-radius: 30px;

  @media (max-width: 920px) {
    min-width: 100%;
    height: 100vh;
    border-radius: none;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0;
    box-shadow: none;
    min-height: 0;
    margin: 0;
    margin-bottom: 35px;
    padding: 1rem;
  }
`;

const Top = styled.header`
  width: 60%;
  margin: auto;
  padding-top: 1rem;

  @media (max-width: 920px) {
    width: 100%;
  }
`;
const Article = styled.article`
  width: 60%;
  margin: auto;
  padding-top: 3rem;
  display: flex;
  flex-wrap: wrap;

  a {
    text-decoration: none;
    color: black;
  }
  @media (max-width: 920px) {
    width: 100%;
  }
`;

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

const BoiteEnvoi = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { _id } = user;
  const [isLoading, setIsLoading] = useState(false);
  const [mySended, setMySended] = useState([]);
  const [recipientName, setRecipientName] = useState('');

  const fetchSendedUser = () => {
    return axios
      .post('/api/messages/sended')
      .then(({ data }) => {
        return data;
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchSendedUser().then((userData) => setMySended(userData || []));
  }, []);

  const handleDelete = async (message_id) => {
    try {
      await axios
        .delete('/api/messages/delete', { params: { id: message_id } })
        .then(({ data }) => {
          if (data === 'success') {
            setMySended(
              mySended.filter((element) => element._id !== message_id)
            );
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const result = mySended.map((message) => {
    const { recipientFirstName, createdAt, _id, recipient } = message;
    const { text } = message.message;
    return (
      <CardEnvoi
        key={_id}
        recipientFirstName={recipientFirstName}
        createdAt={createdAt}
        _id={_id}
        text={text}
        recipientID={recipient}
        handleDelete={handleDelete}
      />
    );
  });

  return (
    <Section>
      <Wrapper>
        <Top>
          <h4>
            <Link to='/profil'>Mon compte</Link> →{' '}
            <Link to='/profil/messagerie/'>Messagerie</Link> → Boite d'envoi
          </h4>
          <br />
          <h2>Boite d'envoi</h2>
        </Top>
        <Article>
          <Flexbox>
            <>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <strong>Vos messages envoyés</strong>
              </div>
              <br />
              <br />
              <div
                style={{ width: '100%', borderBottom: '2px solid whitesmoke' }}
              >
                {result}
              </div>
            </>
          </Flexbox>
        </Article>
      </Wrapper>
    </Section>
  );
};
export default BoiteEnvoi;
