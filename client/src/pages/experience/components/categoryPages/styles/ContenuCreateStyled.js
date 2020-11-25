import styled from 'styled-components';

export const ContenuCategory = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CardTypeCategory = styled.button`
  width: 20%;
  height: 150px;
  margin-top: 2rem;
  border-radius: 10px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  border: whitesmoke 2px solid;
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);
  :hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  margin-right: 1rem;
`;
