import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../images/Find&Do.png';
import LogoImgWhite from '../images/Find&Do-white.png';
import AuthContext from '../context/auth/authContext';
import ExperienceContext from '../context/experience/experienceContext';
import subIcon from '../images/register.svg';

const Head = styled.header`
  position: fixed;
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px; */
  transition: all 330ms ease-in;
  @media (max-width: 920px) {
    position: fixed;
    height: 70px;
    bottom: 0;
    left: 0;
    background-color: whitesmoke !important;
    border-top: 2px lightgrey solid;
    transition: none !important;
    transform: none !important;
    z-index: 999;
  }
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
    color: black;
    text-decoration: none;
    padding: 1rem;
    border-bottom: 2px transparent solid;
    transition: border 900ms ease;
  }
  a:hover {
    color: #b62c2c;
    padding: 1rem;
    border-bottom: 2px #b62c2c solid;
  }
  a:focus {
    color: #b62c2c;
    padding: 1rem;
    border-bottom: 2px #b62c2c solid;
  }
`;

const Li = styled.li`
  list-style-type: none;
`;

const MobileDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex: 1;
`;

// const fetchUserRecipient = () => {
//   return axios
//     .post('/api/messages')
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((err) => console.error(err));
// };

const Header = () => {
  const authContext = useContext(AuthContext);
  const experienceContext = useContext(ExperienceContext);
  const { experience } = experienceContext;
  const { isAuthenticated, logout, user, loadUser } = authContext;
  const [top, setTop] = useState(true);
  const [bottom, setBottom] = useState(false);
  //const [haveNewMessage, setHaveNewMessage] = useState();
  // A mettre dans le useState si je veux une actualisation directe, mais consomme quelques appels..
  /* 
      fetchUserRecipient().then((userData) => {
      if (!userData) return setHaveNewMessage(0);
      if (userData.length > 0) return setHaveNewMessage(userData.length);
    });
    */

  const isOnMobile = window.matchMedia('(max-width: 920px)').matches;
  const onLogout = () => {
    logout();
  };

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // fetchUserRecipient().then((userData) => {
    //   if (!userData) return setHaveNewMessage(0);
    //   if (userData.length > 0) return setHaveNewMessage(userData.length);
    // });
  }, []);

  const authLinks = (
    <React.Fragment>
      <h4>Bienvenue {user && user.firstName} !</h4>
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
    </React.Fragment>
  );
  const authLinksMobile = (
    <React.Fragment>
      <MobileDiv>
        <Link to='/'>
          <svg
            viewBox='0 0 32 32'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            role='presentation'
            focusable='false'
            className='svg search'
          >
            <g fill='none'>
              <path d='m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9'></path>
            </g>
          </svg>
        </Link>
        <Link to='/profil'>
          <svg
            viewBox='0 0 32 32'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            role='presentation'
            focusable='false'
            className='svg subscribe'
          >
            <path d='m16 1c8.2842712 0 15 6.71572875 15 15 0 8.2842712-6.7157288 15-15 15-8.28427125 0-15-6.7157288-15-15 0-8.28427125 6.71572875-15 15-15zm0 8c-2.7614237 0-5 2.2385763-5 5 0 2.0143973 1.2022141 3.7998876 2.9996346 4.5835001l.0003231 2.0984999-.1499943.0278452c-2.8326474.5613112-5.31897338 2.2230336-6.93575953 4.5872979 2.34343054 2.291067 5.54974273 3.7028569 9.08579613 3.7028569 3.5355506 0 6.7414538-1.4113884 9.0850203-3.701476-1.6141801-2.3628535-4.0978119-4.0247647-6.929184-4.5867938l-.1558786-.0287302.001228-2.0991413c1.7288399-.7547474 2.9066959-2.4357565 2.9936498-4.355479l.0051645-.2283797c0-2.7614237-2.2385763-5-5-5zm0-6c-7.17970175 0-13 5.82029825-13 13 0 2.9045768.95257276 5.5866683 2.56235849 7.7509147 1.42074739-1.9134907 3.33951478-3.4002416 5.53860831-4.2955956l.3480332-.1363191-.0229565-.0189706c-1.43704227-1.2411241-2.34462949-3.045583-2.42083359-5.0285539l-.00520991-.2714755c0-3.8659932 3.1340068-7 7-7s7 3.1340068 7 7c0 1.9941317-.8415062 3.8279876-2.224566 5.1193683l-.225434.2006317.0447787.0163138c2.3268368.8792152 4.3570558 2.4138611 5.8430586 4.4127726 1.6098837-2.1632453 2.5621627-4.8449575 2.5621627-7.7490864 0-7.17970175-5.8202983-13-13-13z'></path>
          </svg>
        </Link>
        <Link to='/experience-create'>
          <Li>Ajouter une Expérience</Li>
        </Link>
        <Link to='/' onClick={onLogout}>
          Quitter
        </Link>
        {user && user.isAdmin && (
          <Link to='/admin'>
            <Li style={{ color: '#b62c2c' }}>Admin</Li>
          </Link>
        )}
      </MobileDiv>
    </React.Fragment>
  );
  const guestLinksMobile = (
    <React.Fragment>
      <MobileDiv>
        <Link to='/'>
          <svg
            viewBox='0 0 32 32'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            role='presentation'
            focusable='false'
            className='svg search'
          >
            <g fill='none'>
              <path d='m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9'></path>
            </g>
          </svg>
        </Link>
        <Link to='/login'>
          <svg
            viewBox='0 0 32 32'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            role='presentation'
            focusable='false'
            className='svg subscribe'
          >
            <path d='m16 1c8.2842712 0 15 6.71572875 15 15 0 8.2842712-6.7157288 15-15 15-8.28427125 0-15-6.7157288-15-15 0-8.28427125 6.71572875-15 15-15zm0 8c-2.7614237 0-5 2.2385763-5 5 0 2.0143973 1.2022141 3.7998876 2.9996346 4.5835001l.0003231 2.0984999-.1499943.0278452c-2.8326474.5613112-5.31897338 2.2230336-6.93575953 4.5872979 2.34343054 2.291067 5.54974273 3.7028569 9.08579613 3.7028569 3.5355506 0 6.7414538-1.4113884 9.0850203-3.701476-1.6141801-2.3628535-4.0978119-4.0247647-6.929184-4.5867938l-.1558786-.0287302.001228-2.0991413c1.7288399-.7547474 2.9066959-2.4357565 2.9936498-4.355479l.0051645-.2283797c0-2.7614237-2.2385763-5-5-5zm0-6c-7.17970175 0-13 5.82029825-13 13 0 2.9045768.95257276 5.5866683 2.56235849 7.7509147 1.42074739-1.9134907 3.33951478-3.4002416 5.53860831-4.2955956l.3480332-.1363191-.0229565-.0189706c-1.43704227-1.2411241-2.34462949-3.045583-2.42083359-5.0285539l-.00520991-.2714755c0-3.8659932 3.1340068-7 7-7s7 3.1340068 7 7c0 1.9941317-.8415062 3.8279876-2.224566 5.1193683l-.225434.2006317.0447787.0163138c2.3268368.8792152 4.3570558 2.4138611 5.8430586 4.4127726 1.6098837-2.1632453 2.5621627-4.8449575 2.5621627-7.7490864 0-7.17970175-5.8202983-13-13-13z'></path>
          </svg>
        </Link>
        <Link to='/subscribe'>
          <img src={subIcon} className='svg' alt='register' />
        </Link>
        <a href='https://www.github.com/ericpierlot' target='blank'>
          <svg
            style={{
              width: '40px',
              height: '40px',
              fill: 'black',
            }}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
          </svg>
        </a>
      </MobileDiv>
    </React.Fragment>
  );

  const guestLinks = (
    <React.Fragment>
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
    </React.Fragment>
  );

  useEffect(() => {
    const scrollTop = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollTop);
    return () => window.removeEventListener('scroll', scrollTop);
  }, [top]);

  // I was thinking when we are at the bottom of the page the bottom menu disappear
  // But bad idea because menu will disappear on mine, and content too small to have benefit
  useEffect(() => {
    const ScrollBottom = () => {
      window.innerHeight + window.scrollY === document.body.offsetHeight
        ? setBottom(true)
        : setBottom(false);
    };
    window.addEventListener('scroll', ScrollBottom);
    return () => window.removeEventListener('scroll', ScrollBottom);
  });

  return (
    <Head
      style={{
        transform: bottom ? '' : '',
        backgroundColor: top ? 'transparent' : 'white',
        boxShadow: top
          ? '1px 1px 1px white'
          : ' rgba(60, 64, 67, 0.15) 0px 2px 6px 2px, rgba(60, 64, 67, 0.3) 0px 1px 2px 0px',
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
