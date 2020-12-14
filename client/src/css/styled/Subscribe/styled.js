import styled from 'styled-components';

const Section = styled.section`
  margin: auto;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 840px) {
    height: 100vh;
    width: 80%;
    flex-direction: row;
  }
`;

const Container = styled.section`
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
const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;
const H1 = styled.h1`
  text-align: center;
  font-size: 2rem;
  padding: 2rem;
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
const Back = styled(Button)`
  background-image: linear-gradient(
    to right,
    #353535,
    #555555,
    #795b5c,
    #412e2f
  );
`;

const InputEmail = styled.input.attrs((props) => ({
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

const InputPassword = styled.input.attrs((props) => ({
  type: 'password',
}))`
  font-size: 1.2rem;
  width: 70%;
  height: 2rem;
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

  @media (min-width: 840px) {
    width: 50%;
  }
`;
const InputFirstName = styled.input.attrs((props) => ({
  type: 'text',
  name: 'firstName',
}))`
  font-size: 1.2rem;
  width: 70%;
  height: 2rem;
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

  @media (min-width: 840px) {
    width: 50%;
  }
`;

const InputDays = styled.input.attrs((props) => ({
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
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  border: none;
  border: 0.5px white solid;
  border-bottom: 2px black solid;
  margin-bottom: 2.5rem;
  transition: all 330ms ease-in-out;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :focus {
    border-bottom: 2px #eb3941 solid;
  }
`;
const InputYears = styled.input.attrs((props) => ({
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
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  border: none;
  border: 0.5px white solid;
  border-bottom: 2px black solid;
  margin-bottom: 2.5rem;
  transition: all 330ms ease-in-out;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :focus {
    border-bottom: 2px #eb3941 solid;
  }
`;
const SelectMonths = styled.select.attrs((props) => ({
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
  margin-bottom: 1rem;
  padding-left: 0.2rem;
  border: none;
  border: 0.5px white solid;
  border-bottom: 2px black solid;
  margin-bottom: 2.5rem;
  transition: all 330ms ease-in-out;
  :-webkit-inner-spin-button,
  :-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :focus {
    border-bottom: 2px #eb3941 solid;
  }
`;

const Label = styled.label`
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

export {
  Section,
  Container,
  FormContainer,
  Flex,
  H1,
  Back,
  Button,
  InputEmail,
  InputPassword,
  InputFirstName,
  InputDays,
  InputYears,
  SelectMonths,
  Label,
};
