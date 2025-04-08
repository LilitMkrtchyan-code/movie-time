import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiAuth } from "../../api/api-auth";
import { Button } from "../../components/ui/button/Button";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/auth-utils";
import "./Auth.css";

export const Register = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormValues((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
    if (serverError) {
      setServerError("");
    }
  };

  const validate = () => {
    const newErrors = {
      firstName: validateName(formValues.firstName.trim(), "first name"),
      lastName: validateName(formValues.lastName.trim(), "last name"),
      email: validateEmail(formValues.email),
      password: validatePassword(formValues.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await apiAuth.register(formValues);

      if (response?.id) {
        console.log("User registered successfully!");
        navigate("/login");
      } else {
        setServerError("Registration failed. Please check your details.");
      }
    } catch (error) {
      setServerError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page register">
      <form className="auth-form" action="#" onSubmit={handleSubmit}>
        {serverError && <div className="auth-form__error">{serverError}</div>}
        <div className="auth-form__field">
          <label htmlFor="firstName" className="auth-form__label">
            Your name
          </label>
          <input
            className={`auth-form__input ${
              errors.firstName ? "input-error" : ""
            }`}
            type="text"
            id="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
          {errors.firstName && (
            <span className="field-error">{errors.firstName}</span>
          )}
        </div>
        <div className="auth-form__field">
          <label htmlFor="lastName" className="auth-form__label">
            Your surname
          </label>
          <input
            className={`auth-form__input ${
              errors.lastName ? "input-error" : ""
            }`}
            type="text"
            id="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
          {errors.lastName && (
            <span className="field-error">{errors.lastName}</span>
          )}
        </div>
        <div className="auth-form__field">
          <label htmlFor="email" className="auth-form__label">
            Email
          </label>
          <input
            className={`auth-form__input ${errors.email ? "input-error" : ""}`}
            type="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="email"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div className="auth-form__field">
          <label htmlFor="password" className="auth-form__label">
            Password
          </label>
          <input
            className={`auth-form__input ${
              errors.password ? "input-error" : ""
            }`}
            type="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="at least 6 characters."
            minLength={6}
          />
          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>
        <div className="auth-form__submit">
          <Button
            className="auth-form__button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </div>
        <div className="auth-form__footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-form__link">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};
