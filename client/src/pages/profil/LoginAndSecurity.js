import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../../utils/Alerts';
import { Button } from '../../css/styled/Subscribe/styled';
import axios from 'axios';

const Wrapper = styled.section`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2);
  min-height: 90vh;
  margin: auto;
  margin-top: 5vh;
  max-width: 90vw;
  border-radius: 30px;

  background-color: rgba(255, 255, 255, 0.8);

  @media (max-width: 920px) {
    min-width: 100%;
    border-radius: none;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0;
    box-shadow: none;
    min-height: 0;
    margin: 0;
    margin-bottom: 35px;
    padding: 1rem;
    :focus-within {
      box-shadow: none;
      transform: none;
    }
  }
`;

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

const Flexbox = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 2px white solid;
  padding-bottom: 80px;
  margin-top: 10px;
  @media (max-width: 920px) {
    width: 100%;
    border-bottom: 1px white solid;
  }
`;

const Modify = styled.button`
  background-color: transparent;
  height: 0;
  border: none;
  font-size: 1rem;
  color: seagreen;
  font-weight: bold;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const Input = styled.input`
  font-size: 1.2rem;
  width: 50%;
  height: 2rem;
  outline: none;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1rem;

  border: none;
  border-bottom: 2px black solid;
  margin-bottom: 2.5rem;
  transition: all 330ms ease-in-out;

  :focus {
    border-bottom: 2px #eb3941 solid;
  }
`;

const LoginAndSecurity = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { user, loadUser, error, clearErrors } = authContext;
  const [isClicked, setIsClicked] = useState({ password: false });
  const [newPassword, setNewPassword] = useState({
    actual: '',
    password: '',
    password2: '',
  });
  const [newSelected, setNewSelected] = useState({
    password: false,
  });

  const { password, password2, actual } = newPassword;

  useEffect(() => {
    if (newSelected.password) {
      const updateUser = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = {
          password: newPassword.password,
          actual: newPassword.actual,
        };
        try {
          await axios.put(
            `/api/users/${user._id}/updatePassword`,
            body,
            config
          );
        } catch (error) {
          setAlert('Error, actual password is wrong', 'danger');
          clearErrors();
        }
        // Refresh the user in my Context
        await loadUser();
      };
      // newSelected value is true, (form sended) then I call my function updateUser
      updateUser();

      // Change display Modify to normal back
      setNewSelected({ password: false });
      // Change "cancel" to "modify"
      console.log(error);
    }
    // eslint-disable-next-line
  }, [newSelected.password, error, clearErrors]);

  const passwordOnSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6 || password2.length < 6 || actual.length < 6)
      return setAlert('Password cannot be less than 6 characters', 'danger');
    if (password !== password2)
      return setAlert(
        'Be careful, new password and confirm are different',
        'danger'
      );

    // looks good then let's update Database
    return setNewSelected({ password: true });
  };

  const passwordOnChange = (e) => {
    setNewPassword({
      ...newPassword,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Section>
      <Wrapper>
        <Top>
          {' '}
          <h4>
            <Link to='/profil'>Profil</Link> → Login and Security
          </h4>
          <br />
          <h2>Login and Security</h2>
        </Top>
        <Article>
          <Flexbox onSubmit={passwordOnSubmit}>
            {isClicked.password ? (
              <>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <strong>Login</strong>

                  <div
                    style={{
                      cursor: 'pointer',
                      color: '#b62c2c',
                      textDecoration: 'underline',
                    }}
                    onClick={() => {
                      setIsClicked(false);
                    }}
                  >
                    Cancel
                  </div>
                </div>

                <div>
                  <div>
                    <label>Actual password : </label>
                    <Input
                      type='password'
                      value={actual}
                      onChange={passwordOnChange}
                      name='actual'
                      style={{ height: '2rem' }}
                    />
                    <br />
                    <br />
                    <label>New Password : </label>
                    <Input
                      type='password'
                      value={password}
                      onChange={passwordOnChange}
                      name='password'
                      style={{ height: '2rem' }}
                    />
                    <br />
                    <label>New Password confirmation : </label>
                    <Input
                      type='password'
                      value={password2}
                      onChange={passwordOnChange}
                      style={{ height: '2rem' }}
                      name='password2'
                    />
                  </div>
                  <Button>Save</Button>
                  <Alerts />
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Login</strong>
                  <br />
                  <br />
                </p>
                <Modify
                  onClick={() => {
                    setIsClicked({ password: true });
                  }}
                >
                  Modify
                </Modify>
              </>
            )}
          </Flexbox>
        </Article>
      </Wrapper>
    </Section>
  );
};

export default LoginAndSecurity;
