import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = (name, value) => {
    if (name === "email")
      return emailRegex.test(value) ? "" : "Geçerli bir email giriniz.";
    if (name === "password")
      return passwordRegex.test(value)
        ? ""
        : "Şifre en az 8 karakter, büyük/küçük harf, rakam ve sembol içermelidir.";
    return "";
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: newValue });
    if (type !== "checkbox") {
      setErrors({ ...errors, [name]: validate(name, newValue) });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/success");
  };

  const isValid =
    emailRegex.test(form.email) &&
    passwordRegex.test(form.password) &&
    form.terms;

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-check">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={form.terms}
            onChange={handleChange}
          />
          <label htmlFor="terms">
            I agree to terms of service and privacy policy
          </label>
        </div>

        <div className="form-submit">
          <button type="submit" disabled={!isValid}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
