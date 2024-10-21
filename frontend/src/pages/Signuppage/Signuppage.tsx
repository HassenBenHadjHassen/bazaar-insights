import React, { useState } from "react";
import "./Signuppage.css";
import { handleRedirect } from "../../utils/handleRedirect";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/validations";
import { useAuth } from "../../hooks/AuthHook";

const Signuppage = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
    agreement: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    global: "",
  });

  const [disabled, setDisabled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = { email: "", password: "", repeatPassword: "", global: "" };

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

    //Password Match Validation
    if (formData.password !== formData.repeatPassword) {
      errors.repeatPassword = "Passwords do not match!";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setDisabled(true); // Disable the form during submission

      const response = await register(
        formData.fullName,
        formData.email,
        formData.password
      );

      if (response?.success) {
        setErrors({ email: "", password: "", repeatPassword: "", global: "" });
        setFormData({
          fullName: "",
          email: "",
          password: "",
          repeatPassword: "",
          agreement: true,
        });

        navigate("/login");
      } else {
        setErrors({
          email: "",
          password: "",
          repeatPassword: "",
          global: response?.data ?? "",
        });
      }

      setDisabled(false); // Re-enable the form after submission
    }
  };

  return (
    <section className="signup_section">
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
      <div className="signup">
        <div className="signup_content">
          <h2 className="signup_title">signup</h2>

          <form className="signup_form" onSubmit={handleSubmit}>
            <div className="signup_form_container">
              <div className="signup_inputBox">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <i>Full Name</i>
              </div>

              <div className="signup_inputBox">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <i>Email</i>
                {errors.email && <p className="signup_error">{errors.email}</p>}
              </div>
            </div>

            <div className="signup_form_container">
              <div className="signup_inputBox">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <i>Password</i>
                {errors.password && (
                  <p className="signup_error">{errors.password}</p>
                )}
              </div>

              <div className="signup_inputBox">
                <input
                  type="password"
                  name="repeatPassword"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  required
                />
                <i>Repeat Password</i>
                {errors.repeatPassword && (
                  <p className="signup_error">{errors.repeatPassword}</p>
                )}
              </div>
            </div>

            <div className="signup_terms">
              <input
                type="checkbox"
                name="agreement"
                required
                checked={formData.agreement}
                onChange={handleChange}
              />
              <span>
                I agree to the{" "}
                <a
                  href="#"
                  onClick={(e) => handleRedirect(e, navigate, "terms")}
                >
                  Terms Of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  onClick={(e) => handleRedirect(e, navigate, "privacy")}
                >
                  Privacy Policy
                </a>
                .
              </span>
            </div>

            <div className="signup_inputBox">
              <button disabled={disabled} type="submit">
                Submit
              </button>
            </div>

            {errors.global && (
              <p className="signup_error" style={{ textAlign: "center" }}>
                {errors.global}
              </p>
            )}
          </form>

          <div className="benefits_section">
            <h3 className="benefits_title">Benefits of Joining</h3>
            <ul className="benefits_list">
              <li>Access More Products</li>
              <li>Real-Time Updates</li>
              <li>Customizable Filters</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signuppage;
