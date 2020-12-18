import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../images/Find&Do.png';
import LogoImgWhite from '../images/Find&Do-white.png';
import AuthContext from '../context/auth/authContext';
import ExperienceContext from '../context/experience/experienceContext';

const Head = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 920px) {
    transition: background-color 330ms linear;
    backdrop-filter: blur(30px);
    background-clip: padding-box;
    background-color: ${({ theme }) => theme.header};
  }
  z-index: 5;
`;

const LogoDiv = styled.div`
  margin-left: 3rem;
  @media (max-width: 920px) {
    display: none;
  }
  width: 120px;
  height: 80px;
  background: url(${LogoImg});
`;

const LogoDivWhite = styled.div`
  margin-left: 3rem;
  @media (max-width: 920px) {
    display: none;
  }
  width: 120px;
  height: 80px;
  background: url(${LogoImgWhite});
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 3rem;
  @media (max-width: 920px) {
    justify-content: space-evenly;
    flex: 1;
    a:hover {
      border-bottom: none;
    }
  }

  a {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    padding: 1rem;
    border-bottom: 2px transparent solid;
  }
  a:hover {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(30px);
    border-radius: 5px;
    background-clip: padding-box;
    box-shadow: 0 0 0 2px transparent;
  }
  a:focus {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(30px);
    border-radius: 5px;
    background-clip: padding-box;
    box-shadow: 0 0 0 2px transparent;
  }
`;

const Li = styled.li`
  list-style-type: none;
`;

const MobileDiv = styled.div`
  padding: 1rem;
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex: 1;
  a {
    color: ${({ theme }) => theme.text};
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(30px);
    background-clip: padding-box;
    text-decoration: none;
    padding: 1rem;
  }
  a:hover {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(30px);
    background-clip: padding-box;
    background-color: ${({ theme }) => theme.header};
  }
  a:focus {
    outline: none;
  }
`;

const MenuBuger = styled.div`
  height: 100px;
  width: 100%;
  position: absolute;
  background-color: transparent;
  top: 65px;
  left: 0%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  visibility: hidden;
  opacity: 0;
  transition: width 1s ease, visibility 1s ease, opacity 0.8s ease,
    background-color 0.5s ease;
  z-index: 2;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: auto;
    height: 70px;
    width: 50%;
    border: transparent 3px solid;
    background-clip: padding-box;
  }
`;
const SunMoon = styled.button`
  padding-right: 1rem;
  background-color: transparent;
  font-size: 1.5rem;
  outline: none;
  border: none;
  cursor: pointer;
`;

const ButtonBurger = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 2rem;
  cursor: pointer;
`;
// const fetchUserRecipient = () => {
//   return axios
//     .post('/api/messages')
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((err) => console.error(err));
// };

const Header = ({ themeToggler, theme, setTheme }) => {
  const authContext = useContext(AuthContext);
  const experienceContext = useContext(ExperienceContext);
  const { experience } = experienceContext;
  const { isAuthenticated, logout, user, loadUser } = authContext;
  const [top, setTop] = useState(true);
  const Burger = useRef();
  const menuInvi = useRef();
  const [isOpen, setIsOpen] = useState(true);
  const fullDate = new Date().toLocaleString();
  const hours = fullDate.slice(11, 14);

  //const [haveNewMessage, setHaveNewMessage] = useState();
  // A mettre dans le useState si je veux une actualisation directe, mais consomme quelques appels..
  /* 
      fetchUserRecipient().then((userData) => {
      if (!userData) return setHaveNewMessage(0);
      if (userData.length > 0) return setHaveNewMessage(userData.length);
    });
    */
  const handleBurger = () => {
    if (isOpen) {
      menuInvi.current.style.visibility = 'visible';
      menuInvi.current.style.opacity = '1';
      menuInvi.current.style.display = 'flex';
      menuInvi.current.style.width = '100%';
      return setIsOpen(!isOpen);
    }

    menuInvi.current.style.width = '0vw';
    menuInvi.current.style.opacity = '0';
    menuInvi.current.style.visibility = 'hidden';
    return setIsOpen(!isOpen);
  };

  const isOnMobile = window.matchMedia('(max-width: 920px)').matches;
  const onLogout = () => {
    logout();
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    hours >= 17 || hours < 0 ? setTheme('dark') : setTheme('light');
    // fetchUserRecipient().then((userData) => {
    //   if (!userData) return setHaveNewMessage(0);
    //   if (userData.length > 0) return setHaveNewMessage(userData.length);
    // });
  }, [hours, setTheme]);

  const authLinks = (
    <React.Fragment>
      <h4>
        {hours >= 17 || hours < 0 ? 'Bonsoir,' : 'Bonjour,'}{' '}
        {user && user.firstName} 👋
      </h4>
      <Ul>
        {user && user.isAdmin && (
          <Link to='/admin'>
            <Li style={{ color: '#b62c2c' }}>Panel Admin</Li>
          </Link>
        )}
        {experience.length === 0 ? null : (
          <Link to='/experiences'>
            <Li>Votre dernière recherche</Li>
          </Link>
        )}
        <Link to='/'>
          <Li>Accueil</Li>
        </Link>
        <Link to='/profil'>
          <Li>Mon compte</Li>
        </Link>
        {user && user.experienceCreated.length > 0 ? (
          <Link to={`/experience-manage/${user._id}`}>
            <Li>Gérer votre expérience</Li>
          </Link>
        ) : (
          <Link to='/experience-create'>
            <Li>Créer une Expérience</Li>
          </Link>
        )}

        <Link to='/' onClick={onLogout}>
          Se déconnecter
        </Link>
      </Ul>
      <SunMoon onClick={themeToggler}>
        {theme === 'light' ? '🌞' : '🌚'}
      </SunMoon>
    </React.Fragment>
  );
  const authLinksMobile = (
    <React.Fragment>
      <MobileDiv>
        <ButtonBurger
          ref={Burger}
          onClick={handleBurger}
          style={{ zIndex: '5' }}
        >
          ☲
        </ButtonBurger>
        <MenuBuger ref={menuInvi}>
          <Link to='/' onClick={handleBurger}>
            Accueil
          </Link>
          <Link to='/profil' onClick={handleBurger}>
            Profil
          </Link>
          {user && user.experienceCreated.length > 0 ? (
            <Link to={`/experience-manage/${user._id}`} onClick={handleBurger}>
              Gérer mon expérience
            </Link>
          ) : (
            <Link to='/experience-create' onClick={handleBurger}>
              Créer une expérience
            </Link>
          )}
          <Link to='/' onClick={onLogout}>
            Quitter
          </Link>
          {user && user.isAdmin && (
            <Link to='/admin' onClick={handleBurger}>
              <span style={{ color: '#b62c2c' }}>Admin</span>
            </Link>
          )}
        </MenuBuger>
        <SunMoon onClick={themeToggler}>
          {theme === 'light' ? '🌞' : '🌚'}
        </SunMoon>
      </MobileDiv>
    </React.Fragment>
  );
  const guestLinksMobile = (
    <>
      <MobileDiv>
        <Link to='/'>Accueil</Link>
        <Link to='/login'>Connexion</Link>
        <Link to='/subscribe'>S'inscrire</Link>
        <SunMoon onClick={themeToggler}>
          {theme === 'light' ? (
            <span role='img' aria-label='Light'>
              🌞
            </span>
          ) : (
            <span role='img' aria-label='Dark'>
              🌚
            </span>
          )}
        </SunMoon>
      </MobileDiv>
    </>
  );

  const guestLinks = (
    <React.Fragment>
      <h4>
        {hours >= 17 || hours < 0 ? 'Bonsoir ' : 'Bonjour'}{' '}
        <span role='img' aria-label='Hello'>
          👋
        </span>
      </h4>
      <Ul>
        {experience.length === 0 ? null : (
          <Link to='/experiences'>
            <Li>Votre dernière recherche</Li>
          </Link>
        )}
        <Link to='/'>
          <Li>Accueil</Li>
        </Link>
        <Link to='/subscribe'>
          <Li>S'inscrire</Li>
        </Link>
        <Link to='/login'>
          <Li>Se connecter</Li>
        </Link>
      </Ul>
      <SunMoon onClick={themeToggler}>
        {theme === 'light' ? '🌞' : '🌚'}
      </SunMoon>
    </React.Fragment>
  );

  useEffect(() => {
    const scrollTop = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollTop);
    return () => window.removeEventListener('scroll', scrollTop);
  }, [top]);

  return (
    <Head
      style={{
        borderBottom: top ? '' : '3px solid transparent',
        backgroundColor: top ? 'transparent' : '',
      }}
    >
      <Link to='/'>{top ? <LogoDivWhite /> : <LogoDiv />}</Link>
      {isOnMobile
        ? isAuthenticated
          ? authLinksMobile
          : guestLinksMobile
        : isAuthenticated
        ? authLinks
        : guestLinks}
    </Head>
  );
};

export default Header;
