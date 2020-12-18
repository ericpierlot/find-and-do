import styled from 'styled-components';
export const Section = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  @media (min-width: 840px) {
    flex-direction: row;
    min-height: 100vh;
  }
`;

export const Container = styled.section`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) contrast(120%);
  border: 3px solid transparent;
  background-clip: padding-box;
  padding: 1rem;
  text-align: center;
  @media (min-width: 840px) {
    min-height: 50vh;
    max-width: 40vw;
    border-radius: 30px;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const H1 = styled.h1`
  font-size: 2rem;
  padding: 2rem;
`;

export const Button = styled.button`
  width: 50%;
  text-align: center;
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  height: 3rem;
  text-align: center;
  border: none;
  border-radius: 10px;
  transition: all 0.4s ease-in-out;
  background-color: #eb9e82;

  font-weight: 600;
  :hover {
    border: 3px rgba(255, 255, 255, 0.2) solid;
    transition: all 0.4s ease-in-out;
  }
  :focus {
    outline: none;
  }
  margin-bottom: 1rem;
  border: 3px transparent solid;
  background-clip: padding-box;
`;

export const Back = styled(Button)`
  background-color: #4d4d4d;
`;

export const InputEmail = styled.input.attrs((props) => ({
  type: 'email',
}))`
  font-size: 1.2rem;
  width: 70%;
  height: 2rem;
  outline: none;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  margin-bottom: 1rem;
  padding-left: 1rem;
  border: none;
  border-bottom: 2px black solid;
  margin-bottom: 2.5rem;
  transition: all 330ms ease-in-out;

  :focus {
    background-color: rgba(255, 255, 255, 0.6);
    border-bottom: 2px #eb3941 solid;
  }
  @media (min-width: 840px) {
    width: 50%;
  }
`;

export const Flex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

export const InputPassword = styled.input.attrs((props) => ({
  type: 'password',
}))`
  font-size: 1.2rem;
  width: 70%;
  height: 2rem;
  outline: none;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  margin-bottom: 1rem;
  padding-left: 1rem;
  border: none;
  border-bottom: 2px black solid;
  margin-bottom: 2.5rem;
  transition: all 330ms ease-in-out;

  :focus {
    background-color: rgba(255, 255, 255, 0.6);
    border-bottom: 2px #eb3941 solid;
  }

  @media (min-width: 840px) {
    width: 50%;
  }
`;
export const Label = styled.label`
  width: 70%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  padding-bottom: 1rem;
  @media (min-width: 840px) {
    width: 50%;
  }
`;

export const InputFirstName = styled.input.attrs((props) => ({
  type: 'text',
}))`
  font-size: 1.2rem;
  width: 70%;
  height: 2rem;
  outline: none;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  padding-left: 1rem;
  border: none;
  border-bottom: 2px black solid;
  margin-bottom: 2.5rem;
  transition: all 330ms ease-in-out;

  :focus {
    background-color: rgba(255, 255, 255, 0.6);
    border-bottom: 2px #eb3941 solid;
  }

  @media (min-width: 840px) {
    width: 50%;
  }
`;

export const InputDays = styled.input.attrs((props) => ({
  type: 'number',
  name: 'days',
}))`
  font-size: 1.2rem;
  width: 16%;
  height: 2rem;
  outline: none;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  padding-left: 0.5rem;
  border: none;
  border-bottom: 2px black solid;
  margin-bottom: 2.5rem;
  transition: all 330ms ease-in-out;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :focus {
    background-color: rgba(255, 255, 255, 0.6);
    border-bottom: 2px #eb3941 solid;
  }
  @media (min-width: 840px) {
    width: 10%;
  }
`;
export const InputYears = styled.input.attrs((props) => ({
  type: 'number',
  name: 'years',
}))`
  font-size: 1.2rem;
  width: 21%;
  height: 2rem;
  outline: none;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  padding-left: 0.5rem;
  border: none;
  border-bottom: 2px black solid;
  margin-bottom: 2.5rem;
  transition: all 330ms ease-in-out;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :focus {
    background-color: rgba(255, 255, 255, 0.6);
    border-bottom: 2px #eb3941 solid;
  }
  @media (min-width: 840px) {
    width: 15%;
  }
`;
export const SelectMonths = styled.select.attrs((props) => ({
  type: 'text',
  name: 'months',
}))`
  font-size: 1.2rem;
  width: 31%;
  height: 2rem;
  outline: none;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  padding-left: 0.2rem;
  border: none;
  border-bottom: 2px black solid;
  margin-bottom: 2.5rem;
  transition: all 330ms ease-in-out;
  :-webkit-inner-spin-button,
  :-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :focus {
    background-color: rgba(255, 255, 255, 0.6);
    border-bottom: 2px #eb3941 solid;
  }
  @media (min-width: 840px) {
    width: 25%;
  }
`;
