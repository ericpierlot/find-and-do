import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

import Spinner from "../../utils/components/Spinner";
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
  background-color: #ff7373;

  font-weight: 600;
  :hover {
    border: 3px rgba(255, 255, 255, 0.2) solid;
    transition: all 0.4s ease-in-out;
  }
  :focus {
    outline: none;
  }
  border: 3px transparent solid;
  background-clip: padding-box;
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

const ContainState = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 80px;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) contrast(120%);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  border-radius: 15px;
  padding: 1rem;
  border: 3px solid transparent;
  background-clip: padding-box;
  cursor: pointer;
  a {
    color: ${({ theme }) => theme.text};
  }
  :hover {
    background-color: ${({ theme }) => theme.header};
  }
  @media (max-width: 920px) {
    width: 100%;
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

const ExperienceManage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [experience, setExperience] = useState("");
  const { data, status, error, refetch } = useQuery("my-experiences", () =>
    FetchUserExperience().then((data) => data)
  );
  const { id } = useParams();

  async function FetchUserExperience() {
    return axios
      .get(`/api/experiences/myexperience`, {
        params: { id },
      })
      .then(({ data }) => data);
  }

  const handleDelete = async (experience_id) => {
    setIsLoading(true);
    try {
      await axios
        .delete("/api/experiences/delete", {
          params: { id: experience_id },
        })
        .then(({ data }) => {
          if (data === "success") {
            setIsLoading(false);
            refetch();
          }
        });
    } catch (error) {
      setIsLoading(false);

      const renderError = (
        <>
          <div>Erreur, vous ne possédez pas d'expérience.</div>
        </>
      );
      setIsError({ message: renderError });
    }
  };

  return (
    <Section>
      <Container>
        <Left>
          <Title>Gestion</Title>
          <UnderTitle>De votre expérience</UnderTitle>
        </Left>
        <Right>
          {data && data.length > 0 ? (
            data.map((exp) => {
              return (
                <ContainState key={exp._id}>
                  <div>
                    <Link to={`/experiences/id/${exp._id}`}>{exp.title}</Link>
                  </div>
                  <div>
                    {exp.validated ? (
                      <span style={{ color: "green" }}>En ligne</span>
                    ) : (
                      <span style={{ color: "red" }}>
                        En cours de validation
                      </span>
                    )}
                  </div>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Button onClick={() => handleDelete(exp._id)}>
                      Supprimer
                    </Button>
                  )}
                  {isError && isError.message}
                </ContainState>
              );
            })
          ) : (
            <Spinner />
          )}
        </Right>
      </Container>
    </Section>
  );
};

export default ExperienceManage;
