import React from "react";
import LoginForm from "../pages/Login/LoginForm";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import user from "@testing-library/user-event";
import { LoginFormMock, LoginFormMockError } from "../_mocks_/LoginForm.mocks";
import axios from "axios";


jest.mock("axios");
jest.mock('../pages/Login/components/DisplayFormValues.tsx',() => ({
  __esModule: true,
  default: () => <div>Mocked DisplayFormValues</div>
}));
describe("LoginForm", () => {
  afterEach(cleanup);
  afterEach(jest.clearAllMocks);
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: LoginFormMock });
    render(<LoginForm />);
  });

  it("should two input and submit button exists at the screen", () => {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    const usernameField = screen.getByRole("textbox", { name: /username/i });
    const passwordField = screen.getByRole("textbox", { name: /password/i });
    const submitButton = screen.getByRole("button", { name: /Sign in/i });

    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it("should enable the submit button if the form values are valid", async () => {
    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByRole("textbox", { name: /password/i });
    const submitButton = screen.getByRole("button", { name: /Sign in/i });

    await userEvent.type(usernameInput, LoginFormMock.username);
    await userEvent.type(passwordInput, LoginFormMock.password);

    await waitFor(() => {
      expect(usernameInput).toHaveValue(LoginFormMock.username);
      expect(passwordInput).toHaveValue(LoginFormMock.password);
      expect(submitButton).not.toBeDisabled();
    });
  });

  test("should have errors message when the value of the fields are invalid", async () => {
    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByRole("textbox", { name: /password/i });
    const submitButton = screen.getByRole("button", { name: /Sign in/i });

    await user.type(usernameInput, LoginFormMockError.username);
    await user.type(passwordInput, LoginFormMockError.password);

    await waitFor(() => {
      expect(usernameInput).toHaveValue(LoginFormMockError.username);

      expect(
        screen.getByText("Username can not be more than 12 characters")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Password must be alphanumeric, and contain maximun 12 characters, one uppercase and one special character"
        )
      ).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    await waitFor(() => expect(submitButton).toBeDisabled());
  });

  it("should call the submit function when the submit button is clicked", async () => {
    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByRole("textbox", { name: /password/i });
    const submitButton = screen.getByRole("button", { name: /Sign in/i });

    await userEvent.type(usernameInput, LoginFormMock.username);
    await userEvent.type(passwordInput, LoginFormMock.password);

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  it('should mock DisplayFormValues', () => {
    screen.debug()
    expect(screen.getByText('Mocked DisplayFormValues')).toBeInTheDocument();

  })
});
