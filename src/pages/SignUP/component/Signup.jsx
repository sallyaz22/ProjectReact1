import { useState } from "react";
import axios from "axios";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "../component/Signup.css";
import { Container } from "react-bootstrap";

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });

  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };

  const validateData = async () => {
    const RegisterSchema = object({
      userName: string().required(),
      email: string().email("Please enter a valid email").required(),
      password: string().required(),
      image: string(),
    });

    try {
      await RegisterSchema.validate(user, { abortEarly: false });
      return true;
    } catch (err) {
      setLoader(false);
      errors.map((err) => {
        return toast.error(err, {
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
      return false; // Validation failed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (await validateData()) {
      const formData = new FormData();
      formData.append("userName", user.userName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("image", user.image);

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/auth/signup`,
          formData
        );

        setUser({
          userName: "",
          email: "",
          password: "",
          image: "",
        });

        if (data.message === "success") {
          toast.success("Account created successfully", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

          navigate("/signin");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="row g-3 needs-validation">
        <div className="col-md-4 row-label">
          <label htmlFor="validationCustom01" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            value={user.userName}
            name="userName"
            onChange={handleChange}
          />
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
          />
        </div>
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
            />
          </div>
        </div>
        <div className="col-md-4 row-label">
          <label htmlFor="validationCustom03" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="validationCustom03"
            name="image"
            onChange={handleImageChange}
          />
        </div>

        <div className="col-12 row-label">
          <button
            className="btn btn-outline-success"
            type="submit"
            disabled={loader}
          >
            {loader ? "Wait..." : "Register"}
          </button>
        </div>
      </form>
    </Container>
  );
}
