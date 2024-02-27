import { screen, within } from "@testing-library/react";
import { renderWithRouter } from "../utils/renderWithRouter";

import App from "../App";
import { userEvent } from "@testing-library/user-event";

describe('Tests New Profile Page', () => {
  it('Testing navigation to the new profile page', async () => {
    renderWithRouter(<App />);

    const btnNewProfile = screen.getByRole('button', { name: 'Criar conta' });
    expect(btnNewProfile).toBeInTheDocument();

    await userEvent.click(btnNewProfile);

    expect(screen.getByRole('heading', {
      name: /new profile/i
    })).toBeInTheDocument();
  });

  it('Testing that elements are being rendered correctly', () => {
    renderWithRouter(<App />, { route: '/new-profile' });

    expect(screen.getByRole('heading', {
      name: /new profile/i
    })).toBeInTheDocument();

    expect(screen.getByTestId('name-new-profile')).toBeInTheDocument();
    expect(screen.getByTestId('lastName-new-profile')).toBeInTheDocument();
    expect(screen.getByTestId('email-new-profile')).toBeInTheDocument();
    expect(screen.getByTestId('phone-new-profile')).toBeInTheDocument();
    expect(screen.getByTestId('password-new-profile')).toBeInTheDocument();
    expect(screen.getByTestId('confirmPassword-new-profile')).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /criar conta/i
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /voltar/i
    })).toBeInTheDocument();
  });

  it('Testing back button navigation', async () => {
    renderWithRouter(<App />, { route: '/new-profile' });

    const backButton = screen.getByRole('button', {
      name: /voltar/i
    });

    expect(backButton).toBeInTheDocument();

    await userEvent.click(backButton);

    const email = screen.getByTestId('email-login');
    const password = screen.getByTestId('password-login');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' }));
    expect(screen.getByRole('button', { name: 'Criar conta' }));
  });

  it('Testing whether it is possible to create an account', async () => {
    renderWithRouter(<App />, { route: '/new-profile' });

    const newUser = {
      name: 'User',
      lastName: 'Faker',
      email: 'user.faker123@gmail.com',
      phone: '388449448',
      password: 'fakerUser123'
    }
    
    const view = screen.getByTestId('name-new-profile');

    const name = within(view).getByRole('textbox', {
      name: /name/i
    });

    const lastName = screen.getByRole('textbox', {
      name: /last name/i
    });

    const email = screen.getByRole('textbox', {
      name: /email/i
    });

    const phone = screen.getByRole('textbox', {
      name: /phone/i
    });

    const password = screen.getByLabelText('Password');

    const confirmPassword = screen.getByLabelText(/confirm password/i);

    const btnNewCount = screen.getByRole('button', {
      name: /criar conta/i
    })

    expect(name).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(btnNewCount).toBeInTheDocument();

    await userEvent.type(name, newUser.name);
    await userEvent.type(lastName, newUser.lastName);
    await userEvent.type(email, newUser.email);
    await userEvent.type(phone, newUser.phone);
    await userEvent.type(password, newUser.password);
    await userEvent.type(confirmPassword, newUser.password);

    expect(name).toHaveValue(newUser.name);
    expect(lastName).toHaveValue(newUser.lastName);
    expect(email).toHaveValue(newUser.email);
    expect(phone).toHaveValue(newUser.phone);
    expect(password).toHaveValue(newUser.password);
    expect(confirmPassword).toHaveValue(newUser.password);

    await userEvent.click(btnNewCount);
    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});