import styled from 'styled-components';

const Section = styled.section`
  margin: auto;
  width: 100%;
  text-align: center;
  @media (max-width: 920px) {
    margin-top: 0;
    overflow: auto;
  }
`;

const Wrapper = styled.section`
  min-height: 50vh;
  width: 80%;
  margin: auto;
  width: 30vw;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 250ms ease;
  transition: transform 250ms ease;
  background-color: rgba(255, 255, 255, 0.3);

  border-radius: 50px;
  padding: 1rem;
  border: whitesmoke 2px solid;
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);
  :focus-within {
    box-shadow: 0px 0.2em 2.5em rgba(0, 0, 0, 0.3);
    transform: scale(1.025);
  }
  @media (max-width: 920px) {
    height: 100vh;
    min-width: 100%;
    border-radius: none;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0;
    box-shadow: none;
    min-height: 0;
    :focus-within {
      box-shadow: none;
      transform: none;
    }
  }
`;
const FormContainer = styled.form`
  max-width: 100%;
  min-height: 100px;
`;

const Flex = styled.div`
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
const Back = styled.a`
  margin-right: 20px;
  text-align: center;
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;

  text-align: center;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  transition: all 0.4s ease-in-out;
  background-image: linear-gradient(
    to right,
    #353535,
    #555555,
    #795b5c,
    #412e2f
  );
  font-weight: 600;
  :hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
  }
  :focus {
    outline: none;
  }
  margin: auto;
  margin-bottom: 3rem;
  border: 3px rgba(255, 255, 255, 0.3) solid;
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

const InputEmail = styled.input.attrs((props) => ({
  type: 'email',
}))`
  font-size: 1.2rem;
  width: 50%;
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
`;
const InputPassword = styled.input.attrs((props) => ({
  type: 'password',
}))`
  font-size: 1.2rem;
  width: 50%;
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
`;
const InputFirstName = styled.input.attrs((props) => ({
  type: 'text',
  name: 'firstName',
}))`
  font-size: 1.2rem;
  width: 50%;
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
`;
const InputCity = styled.input.attrs((props) => ({
  type: 'text',
  name: 'city',
}))`
  font-size: 1.2rem;
  width: 50%;
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
`;
const InputDays = styled.input.attrs((props) => ({
  type: 'number',
  name: 'days',
}))`
  font-size: 1.2rem;
  width: 10%;
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
  width: 15%;
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
  width: 25%;
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
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  padding-bottom: 1rem;
`;

export {
  Section,
  Wrapper,
  FormContainer,
  Flex,
  H1,
  Back,
  Button,
  InputEmail,
  InputPassword,
  InputFirstName,
  InputCity,
  InputDays,
  InputYears,
  SelectMonths,
  Label,
};
