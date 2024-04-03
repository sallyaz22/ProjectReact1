import { useContext, useState } from "react";
// import '../component/Signin.css';
import axios from "axios";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import { useNavigate  , Link} from "react-router-dom";
import { UserContext } from "../../../context/User";
import { Container } from "react-bootstrap";

export default function SignIn() {
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);

  const [loader, setLoader] = useState(false);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validatData = async () => {
    const SignInSchema = object({
      email: string().min(0).max(20).email("plez Enter the email").required(),
      password: string().min(0).max(20).required(),
    });
    try {
      await SignInSchema.validate(user, {
        abortEarly: false,
      }); /** عشان يعرض كل الاخطاء */
      return true;
    } catch (err) {
      // console.log("Valdite is error",error.errors);
      setErrors(err.errors);
      setLoader(false);
      // const validatioinErrors = {}; لطباعة الخطأ تحت ال input
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    // const valdite = await validatData();
    if (await validatData()) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/auth/signin`,
          {

            email: user.email,
            password: user.password,
          }
        );
        setUser({
          email: "",
          password: "",
        });
        if (data.message == "success") {
          toast.success("Login Successfully", {
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
          localStorage.setItem("userToken", data.token);
          setUserToken(data.token);

          navigate("/");
        }
      } catch (err) {
        toast.error(err, {
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
      <h2>LOGIN</h2>
      {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : ""}
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
              onChange={handelChange}
            />
            <div className="invalid-feedback">Please choose a username.</div>
          </div>
        </div>
        <div className="col-md-4 row-label">
          <label htmlFor="validationCustom02" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="validationCustom02"
            value={user.password}
            name="password"
            onChange={handelChange}
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <div className="col-12 row-label">
          <button
            className="btn btn-outline-success"
            type="submit"
            disabled={loader}
          >
            {!loader ? "Login" : "wait..."}
          </button>
          <div className="btn btn-outline-successl">
            <Link to="/Sendcode">Forget Password</Link>
            
        </div>
        </div>
     
      </form>
    </Container>
  );
}
