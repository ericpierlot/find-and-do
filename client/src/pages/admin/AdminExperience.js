import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

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
  color: #b62c2c;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
  background-clip: padding-box;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
  }
  @media (max-width: 920px) {
    width: 80%;
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
  @media (min-width: 840px) {
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

const ButtonNext = styled.button`
  margin-top: 2rem;
  width: 220px;
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
`;

const FetchAllExperiences = (nbpage) => {
  return axios
    .get(`/api/experiences/admin/all?&page=${nbpage}`)
    .then(({ data }) => data)
    .catch((err) => console.error(err));
};

const AdminExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [page, setPage] = useState(1);
  const [totalExperiences, setTotalExperiences] = useState(0);
  const { data, status, error, refetch } = useQuery(
    ["experiences-list", page],
    () => FetchAllExperiences(page).then((data) => data)
  );

  // useEffect(() => {
  //   FetchAllExperiences()
  //     .then((data) => {
  //       setExperiences(data.allExperiences || []);
  //       setTotalExperiences(data.totalExperiences);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  // Delete function
  const handleState = async (experienceID, state) => {
    await axios
      .put(`/api/experiences/admin/validated/${experienceID}`, { state })
      .then(() => refetch())
      .catch((err) => console.error(err));
  };

  const listOfExperiences =
    data &&
    data.allExperiences.map((experience) => {
      const { _id, title, validated, createdBy } = experience;

      return (
        <ContainState key={_id}>
          <div>
            <Link to={`/experiences/id/${_id}`}>{title}</Link>
          </div>
          <div>{createdBy}</div>
          <div>{validated}</div>
          <Button
            style={{ backgroundColor: validated ? "#ff7373" : "#a3fa7b" }}
            onClick={() => {
              handleState(_id, validated);
            }}
          >
            {validated ? "Désactiver" : "Activer"}
          </Button>
        </ContainState>
      );
    });

  const nextExperience = () => {
    const newPage = page + 1;
    setPage(newPage);
    refetch(page);
    // FetchAllExperiences(newPage)
    //   .then((data) => {
    //     setExperiences(data.allExperiences);
    //     setTotalExperiences(data.totalExperiences);
    //   })
    //   .catch((err) => console.error(err));
  };

  const prevExperience = () => {
    const newPage = page - 1;
    setPage(newPage);
    refetch(page);
    // FetchAllExperiences(newPage)
    //   .then((data) => {
    //     setExperiences(data.allExperiences);
    //     setTotalExperiences(data.totalExperiences);
    //   })
    //   .catch((err) => console.error(err));
  };

  return (
    <Section>
      <Container>
        <Left>
          <Title>Expériences</Title>
          <UnderTitle>Administrateur</UnderTitle>
        </Left>
        <Right>
          <Contenu>{listOfExperiences}</Contenu>
        </Right>
        {page > 1 ? (
          <ButtonNext onClick={prevExperience}>Page précédente</ButtonNext>
        ) : (
          ""
        )}
        {data &&
        data.totalExperiences > 5 &&
        page * 5 < data.totalExperiences ? (
          <ButtonNext onClick={nextExperience}>Page suivante</ButtonNext>
        ) : (
          ""
        )}
      </Container>
    </Section>
  );
};

export default AdminExperience;
