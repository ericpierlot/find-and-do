import styled from 'styled-components';

export const ContenuCategory = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media (min-width: 940px) {
    flex-direction: row;
    width: 90%;
    margin: auto;
  }
`;

export const CardTypeCategory = styled.button`
  font-size: 1.2rem;
  width: 223px;
  height: 150px;
  margin-top: 2rem;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  border-radius: 15px;
  padding: 1rem;
  border: 1px solid white;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.header};
  }
  margin-right: 1rem;
`;
