import React, { useContext } from 'react';

import styled from 'styled-components';
import AuthContext from '../../context/auth/authContext';

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

const LoginAndSecurity = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return <Section>Login and security {user && user.firstName}</Section>;
};

export default LoginAndSecurity;
