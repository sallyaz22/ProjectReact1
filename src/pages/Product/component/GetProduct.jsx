import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function GetProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItem,setCartItem] = useState([]);


  const setAddCart = async (productId) =>{
    const token = localStorage.getItem("userToken");
    const {data} = await axios.post(
      `${import.meta.env.VITE_API}/cart`,
      { productId },
      {
        headers: {
          Authorization: `Tariq__${token}`
        },
      }
    );
    setCartItem(data.Product);

    }

  const getProduct = async () => {
    try {
      setLoading(true);
      const { data: { product } } = await axios.get(`${import.meta.env.VITE_API}/products/${id}`);
      setProduct(product);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
  
      <h2>Product</h2>
      {product && (
        <div className='Product'>
          <h5 className='card-title'>{product?.name}</h5>
          <p>{product?.discription}</p>
          <img src={product?.secure_url} alt={product.name} />
          <button onClick={() => setAddCart(product._id)} className="btn btn-outline-dark">
            Add To Cart
          </button>
        </div>
      )}
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Select from "react-select";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardText,
//   MDBCardImage,
//   MDBBtn,
//   MDBRipple,
// } from "mdb-react-ui-kit";

// function GetProduct() {
//   const [loading, setLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchValue, setSearchValue] = useState("");
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [sortValue, setSortValue] = useState("");
//   const [productsPerPage, setProductsPerPage] = useState(3);

//   const totalNumberOfProducts = 8;
//   const totalNumberOfPages = Math.ceil(totalNumberOfProducts / productsPerPage);
//   const pages = Array.from({ length: totalNumberOfPages }, (_, i) => i + 1);
//   const getData = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(
//         `${
//           import.meta.env.VITE_API
//         }
// age=${currentPage}&limit=${productsPerPage}&sort=${sortValue}&search=${searchValue}&price[gte]=${minPrice}&price[lte]=${maxPrice}`
//       );
//       setProducts(data.products);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };
//   useEffect(() => {
//     getData();
//   }, [
//     currentPage,
//     sortValue,
//     searchValue,
//     minPrice,
//     maxPrice,
//     productsPerPage,
//   ]);
//   const handleSearchChange = (event) => {
//     setSearchValue(event.target.value);
//   };
//   const handleMinPriceChange = (event) => {
//     setMinPrice(event.target.value);
//   };

//   const handleMaxPriceChange = (event) => {
//     setMaxPrice(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//   };
//   const handleDisplayChange = (event) => {
//     setProductsPerPage(event.target.value);
//   };
//   const handleReset = () => {
//     setSortValue("");
//     setSearchValue("");
//     setMinPrice("");
//     setMaxPrice("");
//   };

//   return (
//     <div className="container">
//       <h1 className="text-center">Products</h1>
//       <div className="d-flex flex-wrap justify-content-between gap-3">
//         <div>
//           <form
//             className="d-flex w-75 mb-2"
//             role="number"
//             onSubmit={handleSubmit}
//           >
//             <input
//               className="form-control col-4"
//               style={{ width: "235px" }}
//               type="number"
//               placeholder="Enter the number of products"
//               aria-label="number"
//               min="1"
//               max="8"
//               onChange={handleDisplayChange}
//             />
//           </form>
//         </div>
//         <div className="mb-3 d-flex">
//           <Select
//             options={[
//               { value: "name", label: "Name" },
//               { value: "price", label: "Price" },
//               { value: "discount", label: "Discount" },
//               { value: "avgRating", label: "Stars" },
//             ]}
//             onChange={(selectedOption) => setSortValue(selectedOption.value)}
//             placeholder="Sort By"
//             className="outline-danger"
//           />
//         </div>

//         <div className="mb-3 d-flex gap-2">
//           <form className="d-flex gap-2">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-danger"
//               onChange={handleSearchChange}
//             />
//           </form>

//           <form className="d-flex gap-2" onSubmit={handleSubmit}>
//             <input
//               type="number"
//               placeholder="Min Price"
//               className="bg-danger col-4 text-light"
//               onChange={handleMinPriceChange}
//             />
//             <input
//               type="number"
//               placeholder="Max Price"
//               className="text-light bg-danger col-4"
//               onChange={handleMaxPriceChange}
//             />
//             <button className="btn btn-outline-primary shadow-sm" type="submit">
//               Apply
//             </button>
//           </form>

//           <button
//             type="reset"
//             className="btn btn-danger text-light custom-class mb-2"
//             onClick={handleReset}
//           >
//             Reset
//           </button>
//         </div>
//       </div>
//       <div className="row justify-content-center ">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           products.map((product) => (
//             <div
//               key={product.id}
//               className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4 d-flex align-items-stretch "
//               style={{ width: "22rem" }}
//             >
//               <MDBCard
//                 style={{ width: "100%" }}
//                 className="mb-4 align-items-center"
//               >
//                 <MDBRipple
//                   rippleColor="light"
//                   rippleTag="div"
//                   className="bg-image hover-overlay  "
//                 >
//                   <MDBCardImage
//                     src={product.mainImage.secure_url}
//                     fluid
//                     alt={product.name}
//                     style={{ width: "200px", height: "230px" }}
                    
//                   />
//                   <Link>
//                     <div
//                       className="mask"
//                       style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
//                     ></div>
//                   </Link>
//                 </MDBRipple>
//                 <MDBCardBody  className="d-flex flex-column flex-wrap" style={{width: '100%',gap: '10px'}}>
//                   <MDBCardTitle>{product.name}</MDBCardTitle>
//                   <div className="text-center">
//                     {[...Array(Math.round(product.avgRating))].map(
//                       (_, index) => (
//                         <a
//                           icon={solidStar}
//                           className="star"
//                           key={index}
//                           style={{ color: "red" }}
//                         />
//                       )
//                     )}
//                     {[...Array(5 - Math.round(product.avgRating))].map(
//                       (_, index) => (
//                         <a
//                           icon={regularStar}
//                           className="star"
//                           key={index}
//                         />
//                       )
//                     )}
//                   </div>
//                   <p className="card-text">Price: {product.price}$</p>
//                   <p className="card-text"> Discount :{product.discount}$</p>
//                   <MDBBtn className="bg-danger  ">
//                     <Link
//                       className=" text-decoration-none text-light  btn-outline-dark"
//                       to={`/Categories/${product._id}/product/${product._id}`}
//                     >
//                       Details
//                     </Link>
//                   </MDBBtn>
//                 </MDBCardBody>
//               </MDBCard>
//             </div>
//           ))
//         )}
//       </div>
//       <nav className="d-flex justify-content-center">
//         <ul className="pagination">
//           <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//             <button
//               className="page-link"
//               onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//           </li>
//           {pages.map((page) => (
//             <li key={page} className="page-item">
//               <button
//                 className={`page-link ${currentPage === page ? "active" : ""}`}
//                 onClick={() => setCurrentPage(page)}
//               >
//                 {page}
//               </button>
//             </li>
//           ))}
//           <li className="page-item">
//             <button
//               className="page-link"
//               onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
//               disabled={products.length < productsPerPage}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default GetProduct;