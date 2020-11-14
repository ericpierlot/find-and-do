import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: space-between;

  transition: transform 250ms ease;
  :focus-within {
    transform: scale(1.033);
  }
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
  const [value, setValue] = useState('');
  const [results, setResults] = useState('');
  const [formSend, setFormSend] = useState(false);
  const [inputKm, setInputKm] = useState(5);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (formSend) {
      const getCity = async () => {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["place"="city"]["name"="${value}"]->.ville;node["place"="village"]["name"="${value}"]->.village;node["place"="town"]["name"="${value}"]->.commune;node(around.village:${
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
        setCities(
          data.elements.map((element) => {
            return element.tags.name;
          })
        );
      }; // Fin getCity()

      const getExperience = async () => {
        // console.log(cities.join('&city='));
        const arrayCities = cities.join('&city=');
        const { data } = await axios.get(
          `http://localhost:5000/api/experiences/${value}?${arrayCities}`
        );

        //Map to show as a list the Data
        const allExperienceFetched = data.map((experience, index) => {
          return (
            <div key={index}>
              <h1>{experience.title}</h1>
              <h3>{experience.city}</h3>
              <h5>{experience.createdBy}</h5>
            </div>
          );
        });
        setResults(allExperienceFetched);
        setIsLoading(false);
        const timeID = setTimeout(() => {
          if (inputKm < 20) {
            setInputKm((prevValue) => prevValue + 5);
            autoClickButton();
          } else {
            return clearTimeout(timeID);
          }
        }, 4000);
      }; //Fin getExperience()

      getExperience();
      getCity();

      setFormSend(!setFormSend);
    } // end formSend
  }, [formSend, value, inputKm, cities, results]);

  const autoClickButton = () => {
    const mybutton = document.querySelector('#send');
    mybutton.click();
  };
  function onSubmit(e) {
    setFormSend(!formSend);
    e.preventDefault();
  }

  // DEBUG
  // console.log('Nombre de ville dans Cities :', cities.length);
  // console.log('Liste des villes dans Cities :', cities);
  // console.log('Resultats from DB : ', results);

  const onChangeKm = (e) => {
    setInputKm(e.target.value);
  };
  // Render all experiences saved in results
  const renderAff = () => {
    return (
      <div>
        <ul>{results}</ul>
      </div>
    );
  };
  // J'affiche mon JSX
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          id='searchCity'
          type={props.type}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          name={props.name}
          placeholder={props.placeholder}
        />
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
      {isLoading ? 'Loading ...' : renderAff()}
    </>
  );
};

export default SearchExperience;
