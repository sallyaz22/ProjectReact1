import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { Container } from "react-bootstrap";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateData = async () => {
    const logSchema = Yup.object().shape({
      email: Yup.string().min(0).max(20).email("Please enter a valid email").required(),
      password: Yup.string().min(0).max(20).required(),
      code: Yup.string().min(4).max(4),
    });

    try {
      await logSchema.validate(user, { abortEarly: false });
      setErrors([]);
      return true;
    } catch (err) {
      setErrors(err.errors);
      err.errors.forEach((err) => {
        toast.error(err, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (await validateData()) {
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_API}/auth/forgotPassword`,
          { ...user }
        );
        setUser({
          email: "",
          password: "",
          code: "",
        });

        toast.success("Password reset email sent successfully");
        navigate("/signin");
      } catch (err) {
        setLoading(false);
        setErrors(err.errors);
        toast.error("Error sending reset password email");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="row g-3 needs-validation">
        <div className="col-md-4 row-label">
          <label htmlFor="validationCustomUsername" className="form-label">
            Email
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              @
            </span>
            <input
              type="email"
              className="form-control"
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              value={user.email}
              name="email"
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please enter a valid email</div>
          </div>
        </div>
        <div className="col-md-4 row-label">
          <label htmlFor="validationCustom02" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="validationCustom02"
            value={user.password}
            name="password"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4 row-label">
          <label htmlFor="validationCustom03" className="form-label">
            Code
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            value={user.code}
            name="code"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <div className="col-12 row-label">
          <button
            className="btn btn-outline-success"
            type="submit"
            disabled={loading}
          >
            {!loading ? "Reset Password" : "Please wait..."}
          </button>
        </div>
      </form>
    </Container>
  );
}