import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Spinner from "../../utils/components/Spinner";

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

const FetchListUsers = (nbpage = 1) => {
  return axios
    .get(`/api/users/admin/all?&page=${nbpage}`)
    .then(({ data }) => data)
    .catch((err) => err);
};

const AdminUsers = () => {
  const [page, setPage] = React.useState(1);
  const { data, status, refetch } = useQuery(["users-list", page], () =>
    FetchListUsers(page).then((data) => data)
  );

  const handleAccess = async (userID, state) => {
    await axios
      .put(`/api/users/admin/ban/${userID}`, { state })
      .then(() => FetchListUsers().catch((err) => console.error(err)))
      .catch((err) => console.error(err));
  };

  const nextUser = () => {
    const newPage = page + 1;
    setPage(newPage);
    refetch(page);
  };

  const prevUser = () => {
    const newPage = page - 1;
    setPage(newPage);
    refetch(page);
  };

  return (
    <Section>
      <Container>
        <Left>
          <Title>Utilisateurs</Title>
          <UnderTitle>Administrateur</UnderTitle>
        </Left>
        <Right>
          <Contenu>
            {status === "success" ? (
              data.users.map((user) => {
                const { _id, firstName, email, hasAccess } = user;
                return (
                  <ContainState key={user._id}>
                    <Link to={`/profil-user/${_id}`}>
                      <div>{email}</div>
                      <div>{firstName}</div>
                    </Link>
                    <Button onClick={() => handleAccess(_id, hasAccess)}>
                      {hasAccess ? "Bloquer" : "Débloquer"}
                    </Button>
                  </ContainState>
                );
              })
            ) : (
              <Spinner />
            )}
          </Contenu>
        </Right>
      </Container>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data && data.totalUsers > 5 && page * 5 < data.totalUsers ? (
          <ButtonNext onClick={nextUser}>Page suivante</ButtonNext>
        ) : null}
        {page > 1 ? (
          <ButtonNext onClick={prevUser}>Page précédente</ButtonNext>
        ) : null}
      </div>
    </Section>
  );
};

export default AdminUsers;
