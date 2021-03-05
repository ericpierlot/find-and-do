import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 840px) {
    text-align: left;
    width: 40%;
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

const Contenu = styled.div`
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) contrast(120%);
  border-radius: 15px;
  width: 100%;
  margin: auto;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  border: 3px solid transparent;
  background-clip: padding-box;
  @media (max-width: 920px) {
    width: 80%;
  }
`;

const Center = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) contrast(120%);
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  border: 3px solid transparent;
  background-clip: padding-box;

  @media (min-width: 840px) {
  }
`;

const MyProfil = () => {
  const { id } = useParams();
  const { data, status } = useQuery(`user-${id}`, () =>
    fetchUserByID(id).then((data) => data[0])
  );
  console.log(data);
  function fetchUserByID(userid) {
    return axios
      .get(`/api/users/profil/${userid}`)
      .then(({ data }) => data)
      .catch((err) => console.log(err));
  }
  function fetchUserExperiences(userid) {
    return axios
      .get(`/api/experiences/user-experience/${userid}`)
      .then(({ data }) => data);
  }
  const { data: experiences } = useQuery(`experiences-${id}`, () =>
    fetchUserExperiences(id).then((data) => data)
  );

  const naissance = Object.values((data && data.birthdate) || {}).join(" ");

  const actualDate = new Date().getTime();
  const birthdateDate = new Date(naissance).getTime();
  const yearsOld = ((actualDate - birthdateDate) / 31536000000).toFixed(0);
  return (
    <>
      {status === "success" ? (
        <>
          <Section>
            <Container>
              <>
                <Left>
                  <Title>{data.firstName}</Title>
                  <UnderTitle>{data.lastName}</UnderTitle>
                  <UnderTitle>{data.birthdate && yearsOld} ans</UnderTitle>
                  <UnderTitle>
                    Compte crée le{" "}
                    {data.createdAt ? data.createdAt.slice(0, 10) : ""}
                  </UnderTitle>
                </Left>
                <Right>
                  <Contenu>Photo de profil</Contenu>
                </Right>
                <Center>
                  <div style={{ padding: "1rem" }}>
                    <ul>
                      {experiences &&
                        experiences.map((experience) => (
                          <li key={experience._id}>
                            <Link to={`/experiences/id/${experience._id}`}>
                              {experience.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </Center>
              </>
            </Container>
          </Section>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default MyProfil;
