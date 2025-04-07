import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Storage } from "../../utils/storage";
import { apiAuth } from "../../api/api-auth";

import { Button } from "../../components/ui/button/Button";
import "./Auth.css";

export const Login = () => {
  const [logValues, setLogValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setLogValues((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
    if (loginError) {
      setLoginError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!logValues.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }
    if (logValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;
    setIsSubmitting(true);
    setLoginError("");
    try {
      const response = await apiAuth.login({
        email: logValues.email,
        password: logValues.password,
      });
      if (response?.accessToken) {
        console.log(response);

        Storage.setItem("token", response.accessToken);
        Storage.setItem("user", response.user);
        navigate("/");
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      setLoginError(error.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page login">
      <form className="auth-form" action="#" onSubmit={handleSubmit}>
        {loginError && <div className="auth-form__error">{loginError}</div>}
        <div className="auth-form__field">
          <label htmlFor="email" className="auth-form__label">
            Email
          </label>
          <input
            className={`auth-form__input ${errors.email ? "input-error" : ""}`}
            type="email"
            id="email"
            value={logValues.email}
            onChange={handleChange}
            placeholder="Email"
            required
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
            value={logValues.password}
            onChange={handleChange}
            placeholder="Password"
            minLength={6}
            required
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
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        </div>
        <div className="auth-form__footer">
          Don't have an account?{" "}
          <Link to="/register" className="auth-form__link">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

// ella_edison@gmail.com
// 7777777
