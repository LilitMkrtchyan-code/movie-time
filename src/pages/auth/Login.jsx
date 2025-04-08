import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiAuth } from "../../api/api-auth";
import { useAuth } from "../../contexts/auth-context";
import { validateEmail, validatePassword } from "../../utils/auth-utils";
import { Button } from "../../components/ui/button/Button";
import "./Auth.css";

export const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formValues.email),
      password: validatePassword(formValues.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await apiAuth.login(formValues);
      if (response?.accessToken) {
        login(response.accessToken, response.user);
        navigate("/");
      } else {
        setServerError("Invalid email or password");
      }
    } catch (error) {
      setServerError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page login">
      <form className="auth-form" action="#" onSubmit={handleSubmit}>
        {serverError && <div className="auth-form__error">{serverError}</div>}
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
            value={formValues.password}
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
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
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
