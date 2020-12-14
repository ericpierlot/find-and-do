import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AlertContext from '../context/alert/alertContext';
import Alerts from '../utils/Alerts';
import axios from 'axios';
import styled from 'styled-components';
import ExperienceContext from '../context/experience/experienceContext';
import Spinner from './components/Spinner.js';

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;
const Input = styled.input`
  padding: 0.5rem;
  border: none;

  width: 70%;
  background-color: transparent;
  font-size: 1rem;
  transition: 330ms ease-in-out;
  outline: none;
  border-bottom: 2px solid black;
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

const HandleAction = styled.div`
  text-align: center;
`;

const SearchExperience = ({ type, name, placeholder }) => {
  const experienceContext = useContext(ExperienceContext);
  const { saveExperiences } = experienceContext;
  const { push } = useHistory();
  const [value, setValue] = useState('');
  const [formSend, setFormSend] = useState(false);
  const [inputKm, setInputKm] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [citySuggested, setCitySuggested] = useState([]);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // UseEffect for my API to suggest City name
  useEffect(() => {
    if (value.length > 0) {
      const config = {
        headers: '',
      };
      const FetchCityAPI = async () => {
        return await axios
          .get(
            `https://geocode.search.hereapi.com/v1/geocode?q=${value}&apiKey=vVtg-sSJWaB1KQ5481hHJq5PmJV27oiCwpdS6p70A38`,
            config
          )
          .then(({ data }) =>
            setCitySuggested(
              data.items.filter((item) => item.address.countryName === 'France')
            )
          )
          .catch((err) => console.error(err));
      };
      FetchCityAPI();
    }
  }, [value]);

  //Render city name & postal code
  const render = citySuggested.map((item, index) => {
    return (
      <option
        key={index}
        value={`${item.address.city} - ${item.address.postalCode}`}
      />
    );
  });

  useEffect(() => {
    if (formSend) {
      const getCity = async () => {
        setIsLoading(true);
        //remove postal code for the request
        const cityWithoutPostalCode = value.split(' - ');
        const { data } = await axios.get(
          `https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["place"="city"]["name"="${
            cityWithoutPostalCode[0]
          }"]->.ville;node["place"="village"]["name"="${
            cityWithoutPostalCode[0]
          }"]->.village;node["place"="town"]["name"="${
            cityWithoutPostalCode[0]
          }"]->.commune;node(around.village:${
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

        //Me retourne en tableau la liste des villes autour
        const citiesList = data.elements.map((element) => {
          return element.tags.name;
        });
        citiesList.push(cityWithoutPostalCode[0]);
        const arrayCities = citiesList.join('&lieu=');
        const request = `/api/experiences/city/${cityWithoutPostalCode[0]}?${arrayCities}`;

        //Send to my context
        saveExperiences(request)
          .then(() => {
            setIsLoading(false);
            push('/experiences');
          })
          .catch(() => {
            setIsLoading(false);
            setValue('');
            setAlert('Aucune expérience a été trouvée', 'black');
          });
      }; // Fin getCity()

      // Let's fetch in our db
      getCity();
      setFormSend(!setFormSend);
    } // end formSend

    return () => {
      return setFormSend(false);
    };
  }, [formSend, value, inputKm, saveExperiences, push, setAlert]);

  function onSubmit(e) {
    e.preventDefault();

    if (value.length < 2)
      return setAlert(
        'La ville ne peut pas faire moins de 2 caractères.',
        'black'
      );

    // Mettre la première lettre en lettre capital
    setValue(
      (currentValue) =>
        currentValue.charAt(0).toUpperCase() + currentValue.slice(1)
    );
    setFormSend(!formSend);
  }

  const onChangeKm = (e) => {
    setInputKm(e.target.value);
  };

  // J'affiche mon JSX
  return (
    <>
      <label
        style={{
          display: 'flex',
          paddingBottom: '1rem',
        }}
        htmlFor='searchCity'
      >
        Choisissez votre Ville et la Distance du rayon de recherche.
      </label>
      <Form onSubmit={onSubmit}>
        <Input
          list='suggest'
          id='searchCity'
          type={type}
          value={value}
          onChange={(e) => {
            setValue(
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
            );
          }}
          name={name}
          placeholder={placeholder}
        />
        <datalist id='suggest'>{render}</datalist>
        <SelectKm
          id='km'
          type='number'
          name='km'
          value={inputKm}
          onChange={onChangeKm}
        >
          <option value='5'>5 km</option>
          <option value='10'>10 km</option>
          <option value='15'>15km</option>
          <option value='20'>20 km</option>
        </SelectKm>
        <Button name='search' id='send'>
          <svg id='search-icon' viewBox='0 0 24 24'>
            <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
            <path d='M0 0h24v24H0z' fill='none' />
          </svg>
        </Button>
      </Form>
      <HandleAction>
        {isLoading ? <Spinner /> : ''}
        <Alerts />
      </HandleAction>
    </>
  );
};

export default SearchExperience;
