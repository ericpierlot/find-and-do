import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../../utils/Alerts';
import { Button } from '../../css/styled/form';
import axios from 'axios';

const Article = styled.article`
  width: 100%;
  margin: auto;
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

  @media (max-width: 920px) {
    width: 100%;
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
  width: 70%;
  height: 2rem;
  outline: none;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1rem;
  padding-left: 1rem;
  border: none;
  border-bottom: 2px black solid;
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
          setAlert('Le mot de passe a été actualisé avec succès', 'green');
        } catch (error) {
          setAlert('Le mot de passe actuel est incorrect', 'red');
          clearErrors();
        }
        // Refresh the user in my Context
        loadUser();
      };
      // newSelected value is true, (form sended) then I call my function updateUser
      updateUser();

      // Change display Modify to normal back
      setNewSelected({ password: false });
    }
    // eslint-disable-next-line
  }, [newSelected.password, error, clearErrors]);

  const passwordOnSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6 || password2.length < 6 || actual.length < 6)
      return setAlert(
        'Le mot de passe ne peut pas faire moins de 6 caractères',
        'red'
      );
    if (password !== password2)
      return setAlert(
        'Attention, les deux nouveaux mots de passe ne correspondent pas',
        'red'
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
              <strong>Mot de passe</strong>
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
                Annuler
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <br />
                <label>Mot de passe actuel : </label>
                <Input
                  type='password'
                  value={actual}
                  onChange={passwordOnChange}
                  name='actual'
                />
                <br />
                <label>Nouveau mot de passe : </label>
                <Input
                  type='password'
                  value={password}
                  onChange={passwordOnChange}
                  name='password'
                />
                <br />
                <label>Nouveau mot de passe : </label>
                <Input
                  type='password'
                  value={password2}
                  onChange={passwordOnChange}
                  name='password2'
                />
              </div>
              <Button style={{ width: '70%' }}>Sauvegarder</Button>
              <Alerts />
            </div>
          </>
        ) : (
          <>
            <p>
              <strong>Mot de passe</strong>
              <br />
              <br />
            </p>
            <Modify
              onClick={() => {
                setIsClicked({ password: true });
              }}
            >
              Modifier
            </Modify>
          </>
        )}
      </Flexbox>
    </Article>
  );
};

export default LoginAndSecurity;
