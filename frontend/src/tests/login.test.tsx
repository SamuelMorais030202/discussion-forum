import { screen } from "@testing-library/react";
import { renderWithRouter } from "../utils/renderWithRouter";

import App from "../App";
import { userEvent } from "@testing-library/user-event";

describe('Tests login page', () => {
  it('Testing whether login page elements are rendering', async () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId('email-login');
    const password = screen.getByTestId('password-login');
    const togglePasswordVisible = screen.getByTestId('VisibilityIcon');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' }));
    expect(screen.getByRole('button', { name: 'Criar conta' }));
    expect(togglePasswordVisible).toBeInTheDocument();

    await userEvent.click(togglePasswordVisible);

    const togglePasswordVisibleOff = screen.getByTestId('VisibilityOffIcon');
    expect(togglePasswordVisibleOff).toBeInTheDocument();
    expect(togglePasswordVisible).not.toBeInTheDocument();
  });

  it('Testing input filling events', async () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByLabelText('Email');
    const inputPassword = screen.getByLabelText('Password');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    const emailUser = 'email@email.com';
    const passwordUser = 'password123'

    await userEvent.type(inputEmail, emailUser);
    await userEvent.type(inputPassword, passwordUser);

    expect(inputEmail).toHaveValue(emailUser);
    expect(inputPassword).toHaveValue(passwordUser);
  });
});