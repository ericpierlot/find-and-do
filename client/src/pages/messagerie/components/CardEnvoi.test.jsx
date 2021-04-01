import { render } from "@testing-library/react";
import { CardEnvoi } from "./CardEnvoi";
import AlertState from "../../../context/alert/AlertState";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const recipientFirstName = "Marc";
const createdAt = "25/10/2023";
const _id = 456;
const text = "Message du message";
const handleDelete = jest.fn();
const recipient = "Eric";

describe("CardEnvoi component", () => {
  test("Afficher que c'est un message LU", () => {
    const { getByText, queryByText } = render(
      <AlertContext.Provider value={{ setAlert: jest.fn() }}>
        <AuthContext.Provider value={{ user: "Eric" }}>
          <BrowserRouter>
            <CardEnvoi
              recipientFirstName={recipientFirstName}
              createdAt={createdAt}
              _id={_id}
              text={text}
              handleDelete={handleDelete}
              recipient={recipient}
              read
            />
          </BrowserRouter>
        </AuthContext.Provider>
      </AlertContext.Provider>
    );

    const lu = getByText("LU");
    const nl = queryByText("NL");

    expect(lu).toBeInTheDocument();
    expect(nl).not.toBeInTheDocument();
  });

  test("Afficher que c'est un message NL", () => {
    const { getByText, queryByText } = render(
      <AlertContext.Provider value={{ setAlert: jest.fn() }}>
        <AuthContext.Provider value={{ user: "Eric" }}>
          <BrowserRouter>
            <CardEnvoi
              recipientFirstName={recipientFirstName}
              createdAt={createdAt}
              _id={_id}
              text={text}
              handleDelete={handleDelete}
              recipient={recipient}
              read={false}
            />
          </BrowserRouter>
        </AuthContext.Provider>
      </AlertContext.Provider>
    );

    const lu = queryByText("LU");
    const nl = getByText("NL");

    expect(lu).not.toBeInTheDocument();
    expect(nl).toBeInTheDocument();
  });

  test("HandleDelete est appelé avec le bon ID", () => {
    const { getByText, queryByText } = render(
      <AlertContext.Provider value={{ setAlert: jest.fn() }}>
        <AuthContext.Provider value={{ user: "Eric" }}>
          <BrowserRouter>
            <CardEnvoi
              recipientFirstName={recipientFirstName}
              createdAt={createdAt}
              _id={_id}
              text={text}
              handleDelete={handleDelete}
              recipient={recipient}
              read={false}
            />
          </BrowserRouter>
        </AuthContext.Provider>
      </AlertContext.Provider>
    );

    const deleteButton = getByText(/x/i);
    userEvent.click(deleteButton);

    expect(handleDelete).toBeCalledWith(_id);
  });

  test("Le Button LU a le style bg-color : #a3fa7b", () => {
    const { getByText, queryByText } = render(
      <AlertContext.Provider value={{ setAlert: jest.fn() }}>
        <AuthContext.Provider value={{ user: "Eric" }}>
          <BrowserRouter>
            <CardEnvoi
              recipientFirstName={recipientFirstName}
              createdAt={createdAt}
              _id={_id}
              text={text}
              handleDelete={handleDelete}
              recipient={recipient}
              read={true}
            />
          </BrowserRouter>
        </AuthContext.Provider>
      </AlertContext.Provider>
    );

    const lu = getByText("LU");

    expect(lu.closest("button")).toHaveStyle({
      backgroundColor: "#a3fa7b",
    });
  });

  test("Le Button NL a le style bg-color : #fa7b7b", () => {
    const { getByText, queryByText } = render(
      <AlertContext.Provider value={{ setAlert: jest.fn() }}>
        <AuthContext.Provider value={{ user: "Eric" }}>
          <BrowserRouter>
            <CardEnvoi
              recipientFirstName={recipientFirstName}
              createdAt={createdAt}
              _id={_id}
              text={text}
              handleDelete={handleDelete}
              recipient={recipient}
              read={false}
            />
          </BrowserRouter>
        </AuthContext.Provider>
      </AlertContext.Provider>
    );

    const nl = getByText("NL");

    expect(nl.closest("button")).toHaveStyle({
      backgroundColor: "#fa7b7",
    });
  });
});
