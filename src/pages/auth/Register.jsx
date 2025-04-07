import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button/Button";
import { apiAuth } from "../../api/api-auth";
import "./Auth.css";

export const Register = () => {
  const [regValues, setRegValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;

    setRegValues((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!regValues.firstName.trim()) {
      newErrors.firstName = "Enter your name";
    }

    if (!regValues.lastName.trim()) {
      newErrors.lastName = "Enter your last name";
    }
    if (regValues.userName.trim().length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
    }
    if (!regValues.email.includes("@")) {
      newErrors.email = "Enter your email";
    }
    if (regValues.password.length < 6) {
      newErrors.password = "Passwords must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const newUser = {
        firstName: regValues.firstName,
        lastName: regValues.lastName,
        userName: regValues.userName,
        email: regValues.email,
        password: regValues.password,
      };
      const response = await apiAuth.register(newUser);

      if (response?.id) {
        console.log("User registered successfully!");
        navigate("/login");
      } else {
        setServerError("Registration failed. Please check your details.");
      }
    } catch (error) {
      setServerError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            value={regValues.firstName}
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
            value={regValues.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
          {errors.lastName && (
            <span className="field-error">{errors.lastName}</span>
          )}
        </div>
        <div className="auth-form__field">
          <label htmlFor="userName" className="auth-form__label">
            User name
          </label>
          <input
            className={`auth-form__input ${
              errors.userName ? "input-error" : ""
            }`}
            type="text"
            id="userName"
            value={regValues.userName}
            onChange={handleChange}
            minLength={3}
            placeholder="at least 3 characters."
          />
          {errors.userName && (
            <span className="field-error">{errors.userName}</span>
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
            value={regValues.email}
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
            value={regValues.password}
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
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
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
