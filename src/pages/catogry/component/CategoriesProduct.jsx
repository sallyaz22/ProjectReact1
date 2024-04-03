// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// export default function CategoriesProduct() {
//   const { id } = useParams();
//   const [products, setProducts] = useState([]);
//   const [cartItem, setCartItem] = useState([]);

//   const getProducts = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_API}/products/category/${id}`);
//       setProducts(data.products);
//     } catch (err) {
//       console.log('Error fetching products:', err);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, [id]);

//   const addToCart = async (productId) => {
//     try {
//       const token = localStorage.getItem('userToken');
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API}/cart`,
//         { productId },
//         {
//           headers: {
//             Authorization: `Tariq__${token}`
//           }
//         }
//       );
//       setCartItem([...cartItem, data.Product]); // Update cart items with new item

//       console.log(data);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   return (
//     <div>
//       {products.map((product) => (
//         <div className="productgat" key={product._id}>
//           <h2>{product.name}</h2>
//           <img src={product.mainImage.secure_url} alt="" />
//           <button onClick={() => addToCart(product._id)} className="btn btn-outline-dark">
//             Add To Cart
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function CategoriesProduct()  {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const controller =new AbortController();

    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/products/category/${id}`,{
            signal:controller.signal,
          }
        );
        setCategories(data.products);
        setLoading(false);
      } catch (error) {
        toast.success(error, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
    };
  
    useEffect(() => {
      getData();
      return ()=> {
      }
    }, []);
  
    return (
      <>
        {loading ? (
          <p>Loading...</p>
        ) : categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {categories.map((category, index) => (
              <div key={index} className="col">
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={category.mainImage.secure_url}
                        style={{ width: "200px", height: "220px" }}
                        className="img-fluid rounded-start"
                        alt={category.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{category.name}</h5>
                        <p className="card-text " style={{ width: "100%"}}>{category.description}</p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            Last updated 3 mins ago
                          </small>
                        </p>
                        <Link
                          to={`products/${category._id}`}
                          className="btn btn-danger text-white"
                        >
                          Go Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
}

export default CategoriesProduct