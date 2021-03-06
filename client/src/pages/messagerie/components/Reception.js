import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { CardReception } from "./CardReception";
import { useQuery } from "react-query";

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

const Flexbox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 80px;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.header};
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  border-radius: 15px;
  padding: 1rem;
  border: 3px solid transparent;
  background-clip: padding-box;
  @media (max-width: 920px) {
    width: 100%;
  }
`;

const BoiteReception = () => {
  const { data, status, refetch } = useQuery("message-receive", () =>
    fetchUserRecipient().then((data) => data)
  );

  function fetchUserRecipient() {
    return axios
      .post("/api/messages")
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleDelete = async (message_id) => {
    try {
      await axios
        .delete("/api/messages/delete", { params: { id: message_id } })
        .then(({ data }) => {
          if (data === "success") {
            refetch();
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  const MessagesRecu =
    status === "success" && data !== 0
      ? data.map((message) => {
          const { senderFirstName, createdAt, _id, sender } = message;
          const { text } = message.message;
          return (
            <CardReception
              key={_id}
              senderFirstName={senderFirstName}
              createdAt={createdAt}
              _id={_id}
              text={text}
              recipientID={sender}
              handleDelete={handleDelete}
            />
          );
        })
      : "Vous n'avez aucun message";

  return (
    <Section>
      <Container>
        <Left>
          <UnderTitle>
            <Link to="/profil">Mon compte</Link> →{" "}
            <Link to="/profil/messagerie">Messagerie</Link>
          </UnderTitle>
          <Title>Réception</Title>
        </Left>
        <Right>
          <Flexbox>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "100%" }}>{MessagesRecu}</div>
            </div>
          </Flexbox>
        </Right>
      </Container>
    </Section>
  );
};

export default BoiteReception;
