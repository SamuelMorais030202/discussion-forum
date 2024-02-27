import { screen, waitFor } from "@testing-library/react";
import { renderWithRouter } from "../utils/renderWithRouter";

import App from "../App";
import { userEvent } from "@testing-library/user-event";
import { newUser } from "./mock/user";
import { newTopic } from "./mock/topic";

describe('Tests home page', () => {
  it('Testing whether after login the user is redirected to the home page and the home elements are being rendered', async () => {
    const { user } = renderWithRouter(<App />, { route: '/login' });

    const inputEmail = screen.getByLabelText('Email');
    const inputPassword = screen.getByLabelText('Password');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    await userEvent.type(inputEmail, newUser.email);
    await userEvent.type(inputPassword, newUser.password);

    const btnLogin = screen.getByTestId('btn-login');

    expect(btnLogin).toBeInTheDocument();

    await user.click(btnLogin);

    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/discussion forum/i)).toBeInTheDocument();

      const iconProfile = screen.getByTestId('AccountCircleIcon');
      expect(iconProfile).toBeInTheDocument();

      const exitIcon = screen.getByTestId('ExitToAppIcon');
      expect(exitIcon).toBeInTheDocument();

      expect(screen.getByRole('heading', {
        name: /tópicos/i
      })).toBeInTheDocument();
    });
  });

  it('Testing whether it is possible to create a topic', async () => {
    const { user } = renderWithRouter(<App />, { route: '/login' });

    const inputEmail = screen.getByLabelText('Email');
    const inputPassword = screen.getByLabelText('Password');
    await userEvent.type(inputEmail, newUser.email);
    await userEvent.type(inputPassword, newUser.password);

    const btnLogin = screen.getByTestId('btn-login');

    expect(btnLogin).toBeInTheDocument();

    await user.click(btnLogin);
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(screen.getByText(/discussion forum/i)).toBeInTheDocument();

    const createTopic = screen.getByTestId('AddCircleOutlineIcon');
    expect(createTopic).toBeInTheDocument();

    await user.click(createTopic);

    expect(screen.getByRole('heading', {
      name: /criar tópico/i
    })).toBeInTheDocument();

    const nameTopic = screen.getByRole('textbox', {
      name: /nome/i
    });

    const typeTopic = screen.getByRole('textbox', {
      name: /type/i
    });

    const btnCreateTopic = screen.getByRole('button', {
      name: /criar/i
    })

    expect(nameTopic).toBeInTheDocument();
    expect(typeTopic).toBeInTheDocument();
    expect(btnCreateTopic).toBeInTheDocument();

    await user.type(nameTopic, newTopic.name);
    await user.type(typeTopic, newTopic.type);

    expect(nameTopic).toHaveValue(newTopic.name);
    expect(typeTopic).toHaveValue(newTopic.type);

    await user.click(btnCreateTopic);
  });
});