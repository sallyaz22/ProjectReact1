import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { object, string, number } from "yup";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "./Order.css";
import { UserContext } from "../../Context/User";

function Order() {
  const { state } = useLocation();
  console.log(state)
  const cartItems = state.cartItems;
  const navigate = useNavigate();
  const { setUserToken } = useContext(UserContext);

  const [order, setOrder] = useState({
    Coupon: "",
    Address: "",
    PhoneNumber: "",
  });
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.details.price * item.quantity;
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const validateData = async () => {
    const logSchema = object({
      Coupon: string(),
      Address: string().required(),
      PhoneNumber: string().required().min(5).max(20),
    });

    try {
      await logSchema.validate(order, { abortEarly: false });
      setErrors([]);
      return true; // Validation succeeded
    } catch (err) {
      setErrors(err.errors);
      setLoader(false);
      err.errors.forEach((error) => {
        toast.error(error, {
          position: "bottom-center",
          autoClose: 5018,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      });
      return false; // Validation failed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");

    setLoader(true);
    if (await validateData()) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API}/order`,
          {
            couponName: order.Coupon,
            address: order.Address,
            phone: order.PhoneNumber,
          },
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        console.log(data)
        setOrder({
          Coupon: "",
          Address: "",
          PhoneNumber: "",
        });
       // setUserToken(data.token);
        toast.success("Order successful!");
        navigate("/Profile");
      } catch (err) {
        setLoader(false);
        setErrors(err.errors);
        toast.error(err.errors);
      } finally {
        setLoader(false);
      }
    }
  };
//



  return (
    <div className="d-flex flex-wrap">
      <div className="order-table-container">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.details._id}>
                <td>{item.details.name}</td>
                <td>
                  <img
                    src={item.details.mainImage.secure_url}
                    alt={item.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>{item.quantity}</td>
                <td>${item.quantity * item.details.price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="text-right">
                Total price: ${totalPrice}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="order-form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="coupon">Coupon:</label>
            <input
              type="text"
              name="Coupon"
              value={order.Coupon}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="Address"
              value={order.Address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              name="PhoneNumber"
              value={order.PhoneNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-outline-success">
              {!loader ? "Order" : "Please wait..."}
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default Order;


// import React, { useContext, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { UserContext } from './../../../context/User';
// import { object, string } from 'yup';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export default function Order() {
// const {state} = useLocation();
// const cartItems = state.cartItems;
// const navigate = useNavigate();
// const {setUserToken} = useContext(UserContext)

// const [order, setOrder] =useState({
//     Coupon:"",
//     Address:"",
//     PhoneNumber:""
// })
// const [loader, setLoader] = useState(false);
// const [errors,setErrors] =useState([]);

// const totalPrice = cartItems.reduce((total, item) => {
//   return total + item.details.price * item.quanttity;
// }, 0);

// const handleChange = (e) =>{
//   const {name, Value} = e.target;
//   setOrder({
//     ...Order,
//     [name]:Value,
//   });
//   const validetData = async () =>{
//     const logSchema = object({
//       Coupon: string(),
//       Address: string().required(),
//       PhoneNumber:string().required().min(5).max(20),
//     });
//     try{
//       await logSchema.validate(order, {abortEarly:false})
//       setErrors([]);
//       return true;

//     }catch(err){
//       setErrors(err.errors);
//       setLoader(false);
//       err.errors.forEach((error) =>{
//         toast.error(error, {
//           position: "top-left",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           transition: Bounce,
//         });
      
//       })
//     }
//   };
//   const handleSubmit = async (e) =>{
//    e.preventDefault();
//    const token = localStorage.getItem("userToken");

//    setLoader(true);
//    if (await validetData()) {
//     try {
//       const data =await axios.post(`${import.meta.env.VITE_API}/order`,
      
//         {
//           couponName:order.Coupon,
//           address:order.Address,
//           phone:order.PhoneNumber,   
//       },
//       {
//         headers:{
//           Authorization: `Tariq__${token}`
//         },
//       }
//       );
//       setOrder({
//         Coupon:"",
//         Address:"",
//         PhoneNumber:""
//       });
//       setUserToken(data.token);
//       toast.success('Order Successfull !');
//       navigate("/profile");
//     }catch(err){
//       setLoader(false);
//       setErrors(err.errors);
//       toast.error(err.errors);
//     } finally{
//       setLoader(false)
//     }
//    }
//   }
// }
//   return (
//     <div className='d-flex flex-wrap'>
//       <table class="table">
//   <thead>
//     <tr>
//       <th scope="col">Product</th>
//       <th scope="col">Img</th>
//       <th scope="col">Quantity</th>
//       <th scope="col">Price</th>
//     </tr>
//   </thead>
//   <tbody>
//     {cartItems.map((item) => (
//       <tr key={item.details._id}>
//         <td>{item.details.name}</td>
//         <td>
//           <img src={item.details.mainImage.securce_url}
//           alt={item.name}
//           style={{width:"100px", height:"100px"}}
//           />
//         </td>
//         <td>{item.quanttity}</td>
//         <td>${item.quanttity * item.details.price}</td>
//       </tr>
//     ))}
//     </tbody>
//     <tfoot>
//       <tr>
//         <td colSpan="4" className="text-right">
//         total Price: ${totalPrice}
//         </td>
//       </tr>
//     </tfoot>
//     </table>
//     <div>
//       <label htmlFor="coupon">Copupon:</label>
//       <input type="text" name='Coupon' value={order.Coupon}  onChange={handleChange}/>
//     </div>
//     <div>
//       <label htmlFor="address">Address:</label>
//       <input type="text" name='Address' value={order.Address}  onChange={handleChange}/>
//     </div>
//     <div>
//       <label htmlFor="phoneNumber">PhoneNumber:</label>
//       <input type="text" name='PhoneNumber' value={order.PhoneNumber}  onChange={handleChange}/>
//     </div>
//     </div>

//   )
// }
