import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../component/Cart.css';

export default function Cart() {
  const [cartItem, setCartItem] = useState([]);

  const getDataCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`
        },
      });
      setCartItem(data.products);
    } catch (err) {
      console.error('Error fetching cart items: ', err);
    }
  };

  useEffect(() => {
    getDataCart();
  }, []);

  const handleIncrement = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(`${import.meta.env.VITE_API}/cart/increaseQuantity`, 
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`
          },
        }
      );
      const updatedCartItem = cartItem.map((item) =>
        item.details._id === productId ?
          {
            ...item,
            quantity: data.cart.products.find(
              (p) => p.productId === productId
            ).quantity,
          }
          : item
      );
      setCartItem(updatedCartItem);
    } catch (err) {
      console.error('Error incrementing quantity: ', err);
    }
  };

  const handleDecrement = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(`${import.meta.env.VITE_API}/cart/decreaseQuantity`, 
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`
          },
        }
      );

      const updatedCartItem = cartItem.map((item) => {
        if (item.details._id === productId) {
          const updatedQuantity = Math.max(
            1,
            data.cart.products.find((p) => p.productId === productId).quantity
          );
          return {
            ...item,
            quantity: updatedQuantity,
          };
        } else {
          return item;
        }
      });
      setCartItem(updatedCartItem);
    } catch (err) {
      console.error('Error decrementing quantity: ', err);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(`${import.meta.env.VITE_API}/cart/removeItem`, 
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`
          },
        }
      );

      const updatedCartItem = cartItem.filter(
        (item) => item.details._id !== productId
      );
      setCartItem(updatedCartItem);
    } catch (err) {
      console.error('Error removing item: ', err);
    }
  };

  const handleClear = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(`${import.meta.env.VITE_API}/cart/clear`, null, {
        headers: {
          Authorization: `Tariq__${token}`
        },
      });
      setCartItem([]);
    } catch (err) {
      console.error('Error clearing cart: ', err);
    }
  };

  const totalPrice = cartItem.reduce((total, item) => {
    return total + item.details.price * item.quantity;
  }, 0);

  return (
    <>
      <div className="card">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col"><h4><b>Shopping Cart</b></h4></div>
                {/* <div className="col align-self-center text-right text-muted">
                  {cartItem.length === 0 ? (
                    <p>Cart is empty</p>
                  ) : (
                    <p>{cartItem.length} items in cart</p>
                  )}
                </div> */}
              </div>
            </div>
            {cartItem.map((item) => (
              <div className="row border-top border-bottom" key={item.details._id}>
                <div className="row main align-items-center">
                  <div className="col-2">
                    <img className="img-fluid" src={item.details.mainImage.secure_url} alt={item.details.name} />
                  </div>
                  <div className="col">
                    <div className="row text-muted">{item.details.name}</div>
                    <div className="row">{item.details.price}</div>
                  </div>
                  <div className="col">
                    <button onClick={() => handleDecrement(item.details._id)}>-</button>
                    {item.quantity}
                    <button href="#" className="border">1</button>
                    <button onClick={() => handleIncrement(item.details._id)}>+</button>
                  </div>
                  <div className="col"> $ {item.details.price * item.quantity}
                    <button className="close" onClick={() => handleRemoveItem(item.details._id)}>✕</button></div>
                </div>
              </div>
            ))}
            <div className="row border-top border-bottom">
              <div className="back-to-shop"><Link to='/'>←</Link><span className="text-muted">Back to shop</span></div>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div className="row">
              <div className="col">Total items: {cartItem.length}</div>
            </div>
            <div className="row">
              <div className="col">Total price: ${totalPrice}</div>
            </div>
            <div className="row">
              <button className="btn" onClick={handleClear}>CLEAR IN CART</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


{/* <button className="btn" onClick={handelClear}>CLEAR IN CART</button>
    </div>
  </div>
</div>

  </>

)
} */}



