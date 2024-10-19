import React, { useState } from "react";
import "./Loginpage.css";
import { useNavigate } from "react-router-dom";
import { handleRedirect } from "../../utils/handleRedirect";
import { validateEmail, validatePassword } from "../../utils/validations";
import { useAuth } from "../../hooks/AuthHook";

const Loginpage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    let errors = { email: "", password: "" };

    // Email validation
    if (!formData.email || !validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    const passwordVerification = validatePassword(formData.password);

    // Password validation (minimum 8 characters, at least one uppercase, one symbol, one number)
    if (!formData.password || passwordVerification.error) {
      errors.password = passwordVerification.errorText;
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({ email: "", password: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await login(formData.email, formData.password);

      if (response?.success) {
        setErrors({
          email: "",
          password: "",
        });

        setFormData({
          email: "",
          password: "",
        });
      } else {
        setErrors({
          email: "",
          password: response?.data ?? "",
        });
      }
    }
  };

  return (
    <section className="login_section">
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <div className="login">
        <div className="login_content">
          <h2 className="login_title">Login</h2>

          <form className="login_form" onSubmit={handleSubmit}>
            <div className="login_inputBox">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <i>Email</i>
              {errors.email && <p className="login_error">{errors.email}</p>}
            </div>

            <div className="login_inputBox">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i>Password</i>
              {errors.password && (
                <p className="login_error">{errors.password}</p>
              )}
            </div>

            <div className="login_links">
              <a
                href="#"
                onClick={(e) => handleRedirect(e, navigate, "forgot-password")}
              >
                Forgot Password
              </a>
              <a
                href="#"
                onClick={(e) => handleRedirect(e, navigate, "sign-up")}
              >
                Signup
              </a>
            </div>

            <div className="login_inputBox">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Loginpage;
