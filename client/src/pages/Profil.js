import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "./profil/components/Card";
import styled from "styled-components";
import AuthContext from "../context/auth/authContext";
import Spinner from "../utils/components/Spinner";
import axios from "axios";

const Section = styled.section`
  width: 90%;
  margin: auto;
  min-height: 100vh;
  display: flex;
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
  a {
    text-decoration: none;
  }
  @media (min-width: 840px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Left = styled.div`
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
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media (min-width: 840px) {
    text-align: left;
    width: 60%;
  }
`;
const Title = styled.h1`
  font-size: 4rem;
  color: ${({ theme }) => theme.textinvert};
  text-shadow: rgba(60, 64, 67, 0.3) 0px 1px 10px;
  @media (min-width: 840px) {
    font-size: 5rem;
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
const FetchNewMessage = () => {
  return axios
    .post("/api/messages/read")
    .then(({ data }) => data.length)
    .catch((err) => console.error(err));
};

const Profil = () => {
  const [isLoading, setIsLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [hasNewMessage, setHasNewMessage] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    FetchNewMessage()
      .then((numberUnread) => {
        setHasNewMessage(numberUnread);
      })
      .catch(() => setIsLoading(false))
      .finally(() => setIsLoading(false));
  }, []);

  let naissance;
  if (user) {
    naissance = Object.values(user.birthdate || {}).join(" ");
  }

  const actualDate = new Date().getTime();
  const birthdateDate = new Date(naissance).getTime();
  const yearsOld = ((actualDate - birthdateDate) / 31536000000).toFixed(0);
  return (
    <Section>
      <Container>
        <Left>
          <Title>
            Mon compte {hasNewMessage !== 0 && `(${hasNewMessage})`}
          </Title>
          <UnderTitle>
            {user && user.firstName}, {user && user.email}
          </UnderTitle>
          <UnderTitle>{user && yearsOld} ans</UnderTitle>
        </Left>
        <Right>
          <Link to="/profil/messagerie">
            <Card
              Image={`📬 ${
                hasNewMessage > 1 ? `→ ${hasNewMessage} messages non lu.` : ""
              }${
                hasNewMessage === 1 ? `→ ${hasNewMessage} message non lu.` : ""
              } `}
              ImageAlt="Messagerie"
              Title="Votre messagerie"
              Description="Accédez à votre boite de réception et votre boîte d'envoi"
            />
          </Link>
          <Link to="/profil/personal-info">
            <Card
              Image="🔐"
              ImageAlt="Personal informations"
              Title="Infos personnelles"
              Description="Fournissez des renseignements personnels"
            />
          </Link>
        </Right>
      </Container>
    </Section>
  );
};

export default Profil;
