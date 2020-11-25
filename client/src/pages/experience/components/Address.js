import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.article`
  width: 100%;
  margin-top: 10vh;
`;

const Top = styled.div`
  width: 40%;
  margin: auto;
  h2 {
    margin-bottom: 2rem;
  }
`;

const Contenu = styled.div`
  width: 40%;
  margin: auto;
`;

const Input = styled.input`
  margin-top: 2rem;
  font-size: 1.2rem;
  width: 100%;
  height: 3rem;
  outline: none;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1rem;
  padding-left: 1rem;
  border: none;
  border-bottom: 2px black solid;
  margin-bottom: 2.5rem;
  transition: all 330ms ease-in-out;

  :focus {
    border-bottom: 2px #eb3941 solid;
  }
`;

const AddressChoosen = ({ experience, setExperience, render }) => {
  return (
    <Wrapper>
      <Top>
        <h2>Adresse</h2>
        <p>Dans quelle ville proposerez-vous votre expérience ?</p>
        <p>
          Vérifiez qu'il s'agit d'une ville valide et que le nom soit
          correctement orthographié. <br /> Ne vous inquiétez pas si votre ville
          est introuvable. <br /> Choisissez la ville la plus proche et vous
          pourrez mettre à jour l'adresse exacte plus tard.
        </p>
      </Top>
      <Contenu>
        <Input
          list='sugg'
          type='text'
          value={experience.lieu}
          placeholder='Entrez le nom de la ville'
          onChange={(e) =>
            setExperience({ ...experience, lieu: e.target.value })
          }
        />
        <datalist id='sugg'>{render}</datalist>
      </Contenu>
    </Wrapper>
  );
};

export default AddressChoosen;
