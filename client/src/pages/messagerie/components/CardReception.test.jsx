import { render } from "@testing-library/react";
import { CardReception } from "./CardReception";
import userEvent from "@testing-library/user-event";
import React from "react";
import AlertState from "../../../context/alert/AlertState";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";
import { BrowserRouter } from "react-router-dom";

describe("CardReception component", () => {
  const data = {
    id: 123,
    senderFirstName: "Eric",
    text: "Je suis un test",
    recipientID: 2,
    handleDelete: jest.fn(),
    createdAt: "25/01/2021",
  };

  test("Clique sur le button Supprimer, supprime le message avec ID", () => {
    const { getByText } = render(
      <AlertContext.Provider value={{ setAlert: jest.fn() }}>
        <AuthContext.Provider value={{ user: "Eric" }}>
          <BrowserRouter>
            <CardReception
              _id={data.id}
              senderFirstName={data.senderFirstName}
              text={data.text}
              recipientID={data.recipientID}
              handleDelete={data.handleDelete}
              createdAt={data.createdAt}
            />
          </BrowserRouter>
        </AuthContext.Provider>
      </AlertContext.Provider>
    );

    const deleteButton = getByText(/supprimer/i);
    userEvent.click(deleteButton);

    expect(data.handleDelete).toBeCalledWith(data.id);
  });

  test("Clique sur le button Supprimer, ne supprime pas le mauvais ID", () => {
    const createdAt = "01/04/2021";
    const { getByText } = render(
      <AlertContext.Provider value={{ setAlert: jest.fn() }}>
        <AuthContext.Provider value={{ user: "Eric" }}>
          <BrowserRouter>
            <CardReception
              _id={data.id}
              senderFirstName={data.senderFirstName}
              text={data.text}
              recipientID={data.recipientID}
              handleDelete={data.handleDelete}
              createdAt={data.createdAt}
            />
          </BrowserRouter>
        </AuthContext.Provider>
      </AlertContext.Provider>
    );

    const deleteButton = getByText(/supprimer/i);
    userEvent.click(deleteButton);

    expect(data.handleDelete).not.toBeCalledWith(12);
  });

  test("Affiche le nom de l'envoyeur", () => {
    const { getByText } = render(
      <AlertContext.Provider value={{ setAlert: jest.fn() }}>
        <AuthContext.Provider value={{ user: "Eric" }}>
          <BrowserRouter>
            <CardReception
              _id={data.id}
              senderFirstName={data.senderFirstName}
              text={data.text}
              recipientID={data.recipientID}
              handleDelete={data.handleDelete}
              createdAt={data.createdAt}
            />
          </BrowserRouter>
        </AuthContext.Provider>
      </AlertContext.Provider>
    );

    const senderFirstName = getByText(data.senderFirstName);
    expect(senderFirstName).toBeInTheDocument();
  });

  test("N'affiche pas un autre nom que l'envoyeur", () => {
    const { queryByText } = render(
      <AlertContext.Provider value={{ setAlert: jest.fn() }}>
        <AuthContext.Provider value={{ user: "Eric" }}>
          <BrowserRouter>
            <CardReception
              _id={data.id}
              senderFirstName={data.senderFirstName}
              text={data.text}
              recipientID={data.recipientID}
              handleDelete={data.handleDelete}
              createdAt={data.createdAt}
            />
          </BrowserRouter>
        </AuthContext.Provider>
      </AlertContext.Provider>
    );

    const senderFirstName = queryByText(/jean/i);
    expect(senderFirstName).toBeNull();
  });

  test("Affiche le texte du message", () => {
    const { getByText } = render(
      <AlertContext.Provider value={{ setAlert: jest.fn() }}>
        <AuthContext.Provider value={{ user: "Eric" }}>
          <BrowserRouter>
            <CardReception
              _id={data.id}
              senderFirstName={data.senderFirstName}
              text={data.text}
              recipientID={data.recipientID}
              handleDelete={data.handleDelete}
              createdAt={data.createdAt}
            />
          </BrowserRouter>
        </AuthContext.Provider>
      </AlertContext.Provider>
    );

    const textMessage = getByText(data.text);
    expect(textMessage).toBeInTheDocument();
  });
});
