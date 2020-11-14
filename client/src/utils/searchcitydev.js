import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;
const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 30px;
  width: 70%;
  background-color: transparent;
  font-size: 1rem;
  transition: 330ms ease-in-out;
  outline: none;
  @media (max-width: 768px) {
    :hover {
      transition: 100ms ease-in-out;
    }
  }
`;

const SelectKm = styled.select`
  background-color: transparent;
  border: none;
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
  width: 2rem;
  background-color: transparent;
  border: none;
`;
const SearchExperience = (props) => {
  // Init de mes Hooks pour les différents input et retour de données
  const [inputCity, setInputCity] = useState('');
  const [inputKm, setInputKm] = useState(5);
  const [results, setResults] = useState([]);
  const [formSended, setFormSended] = useState(false);
  const [apiSend, setApiSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Utilisation de useEffect et d'une condition pour éviter que l'API lance une recherche au premier affichage de ma page.
  useEffect(() => {
    if (apiSend) {
      if (inputCity === '') {
        return;
      }
      const search = async () => {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["place"="city"]["name"="${inputCity}"]->.ville;node["place"="village"]["name"="${inputCity}"]->.village;node["place"="town"]["name"="${inputCity}"]->.commune;node(around.village:${
            inputKm * 1000
          })["place"="village"];node(around.ville:${
            inputKm * 1000
          })["place"="city"];node(around.commune:${
            inputKm * 1000
          })["place"="town"];node(around.village:${
            inputKm * 1000
          })["place"="town"];node(around.ville:${
            inputKm * 1000
          })["place"="village"];node(around.commune:${
            inputKm * 1000
          })["place"="city"];node(around.village:${
            inputKm * 1000
          })["place"="city"];node(around.ville:${
            inputKm * 1000
          })["place"="town"];node(around.commune:${
            inputKm * 1000
          })["place"="village"];);out body;`
        );

        setResults(data.elements);
        setIsLoading(false);
        // Permet d'aller chercher plus loin au bout de 5 secondes si < 5 affichage

        const timeID = setTimeout(() => {
          //Condition pour que si la longueur de mon data est inférieur à 5, que ça relance automatiquement avec +5 km
          if (data.elements.length < 5) {
            setInputKm((prevValue) => prevValue + 5);
            autoClickButton();
          } else {
            return clearTimeout(timeID);
          }
        }, 1000);
      };

      search();
      setApiSend(!apiSend);
    }
  }, [apiSend, inputCity, inputKm]);

  // Mes fonctions pour enregistrer les valeurs que l'utilisateur écris dans l'input dans mon Hook (Rendre l'input contrôlable)
  const onChangeCity = (e) => {
    setInputCity(e.target.value);
  };
  if (inputKm >= 31) {
    return setInputKm(Number(30));
  }
  if (inputKm <= -1) {
    return setInputKm(Number(0));
  }

  // J'oblige à ce que ce soit un number, sinon lorsque j'update après la requête pour allonger le rayon de recherche, ça me rajoutera + 5 en string, et ça.. on veut pas !
  const onChangeKm = (e) => {
    setInputKm(Number(e.target.value));
  };
  // Permet de simuler un clique sur le bouton Recherche pour relancer une requête API si le nombre de ville retourné est inférieur à 5 tout en
  // Effectuant une nouvelle recherche avec 5km en plus
  const autoClickButton = () => {
    const mybutton = document.querySelector('#send');
    mybutton.click();
  };
  // Rendre le formulaire contrôlable
  const onSubmitSearch = (e) => {
    e.preventDefault();
    setFormSended(!formSended);
    setApiSend(!apiSend);
  };

  // Aficher en guise de vérification que tout fonctionne
  const renderAff = () => {
    return (
      <div>
        <p>{aSavoir}</p>
        <br />
        <ul>{renderListCity}</ul>
      </div>
    );
  };
  // Je map mon tableau de results pour récupérer chaque élement un par un
  const renderListCity = results.map((result) => {
    return (
      <li style={{ listStyleType: 'none' }} key={result.id}>
        {result.tags.name}
      </li>
    );
  });

  const aSavoir =
    results.length > 0
      ? 'La liste-ci dessous me permet de vérifier si la requête fonctionne, le résultat ira directement rechercher dans ma BDD les Activités disponible dans ces villes.'
      : null;

  // J'affiche mon JSX
  return (
    <>
      <Form onSubmit={onSubmitSearch}>
        <Input
          type={props.type}
          value={inputCity}
          onChange={onChangeCity}
          name={props.name}
          placeholder={props.placeholder}
        />
        <SelectKm type='number' name='km' value={inputKm} onChange={onChangeKm}>
          <option value='5'>5 km</option>
          <option value='10'>10 km</option>
          <option value='15'>15km</option>
          <option value='20'>20 km</option>
        </SelectKm>
        <Button id='send'>
          <svg id='search-icon' viewBox='0 0 24 24'>
            <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
            <path d='M0 0h24v24H0z' fill='none' />
          </svg>
        </Button>
      </Form>
      {isLoading ? 'Loading ...' : renderAff()}
    </>
  );
};

export default SearchExperience;
