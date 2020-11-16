import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';

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

const Button = styled.button`
  width: 50%;
  text-align: center;
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
  height: 3rem;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
  background-image: linear-gradient(
    to right,
    #eb3941,
    #f15e64,
    #e14e53,
    #e2373f
  );
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(242, 97, 103, 0.4);
  line-height: 0;
  :hover {
    background-position: 100% 0;
    transition: all 0.3s ease-in-out;
  }
  :focus {
    outline: none;
  }
  margin: auto;
  margin-bottom: 1rem;
  border: 3px rgba(255, 255, 255, 0.3) solid;
`;

const Personal = () => {
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;
  const [isClicked, setIsClicked] = useState({
    legalName: false,
    birthate: false,
    email: false,
  });
  const [newSelected, setNewSelected] = useState({
    legalName: false,
    birthate: false,
    email: false,
  });
  const { firstName, lastName, birthdate, email } = user;
  const { days, months, years } = user.birthdate;
  const [newUser, setNewUser] = useState({
    email,
    firstName,
    lastName,
    birthdate: {
      days,
      months,
      years,
    },
  });
  console.log('from database USER :', user);
  console.log('NewUser object : ', newUser);

  useEffect(() => {
    // In case it's Legal name asking to modify
    if (newSelected.legalName) {
      const updateUser = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        await axios.put(`/api/users/${user._id}`, newUser, config);
        // Refresh the user in my Context
        await loadUser();
      };
      // newSelected value is true, (form sended) then I call my function updateUser
      updateUser();

      // Change display Modify to normal back
      setNewSelected({ legalName: false });
      // Change "cancel" to "modify"
      setIsClicked(false);
    }

    // In case it's Birthdate choose to modify
    if (newSelected.birthdate) {
      const updateUser = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        await axios.put(`/api/users/${user._id}`, newUser, config);
        // Refresh the user in my Context
        await loadUser();
      };
      // newSelected value is true, (form sended) then I call my function updateUser
      updateUser();

      // Change display Modify to normal back
      setNewSelected({ birthdate: false });
      // Change "cancel" to "modify"
      setIsClicked(false);
    }

    // In case it's Email choose to modify
    if (newSelected.email) {
      const updateUser = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        await axios.put(`/api/users/${user._id}`, newUser, config);
        // Refresh the user in my Context
        await loadUser();
      };
      // newSelected value is true, (form sended) then I call my function updateUser
      updateUser();

      // Change display Modify to normal back
      setNewSelected({ email: false });
      // Change "cancel" to "modify"
      setIsClicked(false);
    }

    // eslint-disable-next-line
  }, [newSelected]);
  console.log('ONFLY NEWUSER : ', newUser);
  const onChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
      birthdate: {
        ...newUser.birthdate,
      },
    });
  };

  const onChangeBirthdate = (e) => {
    setNewUser({
      ...newUser,
      birthdate: {
        ...newUser.birthdate,
        [e.target.name]: e.target.value,
      },
    });
  };

  const onChangeEmail = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
      birthdate: {
        ...newUser.birthdate,
      },
    });
  };

  const LegalNameSubmit = (e) => {
    e.preventDefault();
    // Have to set my alerts to throw to the user What's wrong
    if (newUser.firstName === '') return;
    if (newUser.lastName === '') return;

    setNewSelected({ legalName: true });
  };

  const BirthdateSubmit = (e) => {
    e.preventDefault();
    if (newUser.birthdate.days === '') return;
    if (newUser.birthdate.months === '') return;
    if (newUser.birthdate.years === '') return;

    // Everything looks fine, then let's send :
    setNewSelected({ birthdate: true });
  };

  const EmailSubmit = (e) => {
    e.preventDefault();
    if (newUser.email === '') return;

    // Everything looks fine, then let's send :
    setNewSelected({ email: true });
  };

  return (
    <Section>
      <Wrapper>
        <Top>
          <h4>
            <Link to='/profil'>Profil</Link> > Personal Info
          </h4>
          <br />
          <h2>Personal Information</h2>
        </Top>
        <Article>
          <Flexbox onSubmit={LegalNameSubmit}>
            {isClicked.legalName ? (
              <>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <strong>Legal Name</strong>

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
                <br />
                <br />
                <div style={{ width: '100%' }}>
                  This is the name that you have on your passport or ID card or
                  License driving for example.
                </div>
                <br />
                <br />
                <div>
                  <div>
                    <label>First name : </label>
                    <Input
                      placeholder={user.firstName}
                      value={newUser.firstName}
                      onChange={onChange}
                      name='firstName'
                      style={{ height: '2rem' }}
                    />
                    <br />
                    <label>Last name : </label>
                    <Input
                      placeholder={user.lastName}
                      value={newUser.lastName}
                      onChange={onChange}
                      style={{ height: '2rem' }}
                      name='lastName'
                    />
                  </div>
                  <Button>Save</Button>
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Legal Name</strong>
                  <br />
                  <br />
                  {newUser.firstName}{' '}
                  {newUser.lastName ? (
                    newUser.lastName
                  ) : (
                    <strong> Last name not define, please let us know</strong>
                  )}
                </p>
                <Modify
                  onClick={() => {
                    setIsClicked({ legalName: true });
                  }}
                >
                  Modify
                </Modify>
              </>
            )}
          </Flexbox>
          {/* FOR BIRTHDATE */}
          <Flexbox onSubmit={BirthdateSubmit}>
            {isClicked.birthate ? (
              <>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <strong>Birthdate</strong>

                  <div
                    style={{
                      cursor: 'pointer',
                      color: '#b62c2c',
                      textDecoration: 'underline',
                    }}
                    onClick={() => {
                      setIsClicked({ birthate: false });
                    }}
                  >
                    Cancel
                  </div>
                </div>
                <br />
                <br />
                <div style={{}}>
                  <div>
                    <label>Months: </label>
                    <Input
                      placeholder={birthdate.months}
                      value={newUser.birthdate.months}
                      onChange={onChangeBirthdate}
                      name='months'
                      style={{ height: '2rem' }}
                    />
                    <br />
                    <label>Days: </label>
                    <Input
                      placeholder={birthdate.days}
                      value={newUser.birthdate.days}
                      onChange={onChangeBirthdate}
                      style={{ height: '2rem' }}
                      name='days'
                    />
                    <br />
                    <label>Years: </label>
                    <Input
                      placeholder={birthdate.years}
                      value={birthdate.years}
                      onChange={onChangeBirthdate}
                      style={{ height: '2rem' }}
                      name='years'
                    />
                  </div>
                  <Button>Save</Button>
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Birthdate</strong>
                  <br />
                  <br />
                  Born on {newUser.birthdate.days} {newUser.birthdate.months}{' '}
                  {newUser.birthdate.years}.
                </p>
                <Modify
                  onClick={() => {
                    setIsClicked({ birthate: true });
                  }}
                >
                  Modify
                </Modify>
              </>
            )}
          </Flexbox>
          <Flexbox onSubmit={EmailSubmit}>
            {/* FOR EMAIL */}
            {isClicked.email ? (
              <>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <strong>Email</strong>

                  <div
                    style={{
                      cursor: 'pointer',
                      color: '#b62c2c',
                      textDecoration: 'underline',
                    }}
                    onClick={() => {
                      setIsClicked({ birthate: false });
                    }}
                  >
                    Cancel
                  </div>
                </div>
                <br />
                <br />
                <div style={{}}>
                  <div>
                    <label>Your address email : </label>
                    <Input
                      placeholder={user.email}
                      value={newUser.email}
                      onChange={onChangeEmail}
                      name='email'
                      style={{ height: '2rem' }}
                    />
                    <br />
                  </div>
                  <Button>Save</Button>
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Email</strong>
                  <br />
                  <br />
                  Your address E-mail is {newUser.email}
                </p>
                <Modify
                  onClick={() => {
                    setIsClicked({ email: true });
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

export default Personal;
