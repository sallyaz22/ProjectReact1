import React, { useState } from "react";
 import axios from "axios";
 import { object, string } from "yup";
 import { Bounce, toast } from "react-toastify";
 import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
 
 function SendCode() {
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
   const [errors, setErrors] = useState([]);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
 
   const handleChange = (e) => {
     setEmail(e.target.value);
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault()
     setLoading(true);
 
     try {
       const logSchema = object({
         email: string().email().required(),
       });
 
       await logSchema.validate({ email }, { abortEarly: false });
 
       const { data } = await axios.patch(`${import.meta.env.VITE_API}/auth/sendcode`, { email });
       console.log(data)
       setMessage(data.message);
       toast.success("Reset code sent successfully!");
       navigate("/ForgetPassword");
     } catch (err) {
       setErrors(err.errors);
       setMessage('Error sending reset password email. Please try again.');
       toast.error('Please provide a valid email address.', {
         position: "bottom-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
         transition: Bounce,
       });
     } finally {
       setLoading(false);
     }
   };
 
   return (
    <Container>
    <div className="form-gap" />
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <h3><i className="fa fa-lock fa-4x" /></h3>
                <h2 className="text-center">Forgot Password?</h2>
                {message && <span>{message}</span>}
                <p>You can reset your password here.</p>
                <div className="panel-body">
                  <form onSubmit={handleSubmit} id="register-form" role="form" autoComplete="off" className="form" method="post">
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue" /></span>
                        <input id="email" name="email" placeholder="email address" className="form-control" type="email" onChange={handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <button name="recover-submit" className="btn btn-lg btn-primary btn-block" defaultValue="Reset Password" type="submit" disabled={loading}>
            
                      {loading ? "sending" : "wait...send Code"} 
                        </button>
                    </div>
                    <input type="hidden" className="hide" name="token" id="token" defaultValue /> 
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
   );
 }
 
 export default SendCode;





{/* <div>
  <div className="form-gap" />
  <div className="container">
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="text-center">
              <h3><i className="fa fa-lock fa-4x" /></h3>
              <h2 className="text-center">Forgot Password?</h2>
              {message && <span>{message}</span>}
              <p>You can reset your password here.</p>
              <div className="panel-body">
                <form onSubmit={handelSubmit} id="register-form" role="form" autoComplete="off" className="form" method="post">
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue" /></span>
                      <input id="email" name="email" placeholder="email address" className="form-control" type="email" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <button name="recover-submit" className="btn btn-lg btn-primary btn-block" defaultValue="Reset Password" type="submit" disabled={loader}>
          
                    {!loader ? "sending" : "wait...send Code"} 
                      </button>
                  </div>
                  <input type="hidden" className="hide" name="token" id="token" defaultValue /> 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}