import React, { useEffect, useState } from "react";
 import axios from "axios";
 import { Link } from "react-router-dom";
 import GetProduct from '../component/GetProduct';
 
 function Product() {
   const [loading, setLoading] = useState(true);
   const [products, setProducts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const productsPerPage = 3;
   const getdata = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API }/products?page=${currentPage}&limit=${productsPerPage}`,{
        }

      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
   useEffect(() => {
     getdata();
   }, [currentPage]);
 
   const nextPage = () => {
     setCurrentPage((prevPage) => prevPage + 1);
   };
 
   const prevPage = () => {
     setCurrentPage((prevPage) => prevPage - 1);
   };
 
   return (
    <>
     <div className="container">
       <h1 className="text-center">Products</h1>
       <div className="row">
         {loading ? (
           <p>Loading...</p>
         ) : (
           products.map((product) => (
             <div key={product.id} className="col-md-4 mb-4">
               <div className="card" style={{ width: "380px" }}>
                 <img
                   src={product.mainImage.secure_url}
                   className="card-img-top"
                   alt={product.name}
                   style={{ width: "100%", height: "200px" }}
                   loading="lazy"
                 />
                 <div className="card-body">
                   <h5 className="card-title">{product.name}</h5>
                   <p className="card-text" style={{ width: "100%" }}>
                     {product.description}
                   </p>
                   <p className="card-text">Price: ${product.price}</p>
                   <Link to={`/GetProduct/:id/${product._id}`}>
                     {" "}
                     Details
                   </Link>
                 </div>
               </div>
             </div>
           ))
         )}
       </div>
       <nav className="d-flex justify-content-center">
         <ul className="pagination">
           <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
             <button
               className="page-link"
               onClick={prevPage}
               disabled={currentPage === 1}
             >
               Previous
             </button>
           </li>
           <li className="page-item">
             <button
               className={`page-link ${currentPage === 1 ? "active" : ""}`}
               onClick={() => setCurrentPage(1)}
               disabled={currentPage === 1}
             >
               1
             </button>
           </li>
           <li className="page-item">
             <button
               className={`page-link ${currentPage === 2 ? "active" : ""}`}
               onClick={() => setCurrentPage(2)}
               disabled={currentPage === 2}
             >
               2
             </button>
           </li>
           <li className="page-item">
             <button
               className={`page-link ${currentPage === 3 ? "active" : ""}`}
               onClick={() => setCurrentPage(3)}
               disabled={currentPage === 3}
             >
               3
             </button>
           </li>
           <li className="page-item">
             <button
               className="page-link"
               onClick={nextPage}
               disabled={products.length < productsPerPage}
             >
               Next
             </button>
           </li>
         </ul>
       </nav>
     </div>
     </>
   );
 }
 
 export default Product;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";
// import { Bounce, toast } from "react-toastify";

// function Produtc() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const setAddCart = async (productId) => {
//     const token = localStorage.getItem("userToken");
//     const { data } = await axios.post(
//       `${import.meta.env.VITE_API}/cart`,
//       {
//         productId,
//       },
//       {
//         headers: {
//           Authorization: `Tariq__${token}`,
//         },
//       }
//     );
//     if (data) {
//       toast.success("تم الاضافة بنجاح ", {
//         position: "bottom-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//       });
//     }
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API}/products/${id}`
//         );
//         setProduct(data.product);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   return (
//     <>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <div className="row row-cols-1 row-cols-md-2 g-4">
//             <div className="col">
//               <div className="mb-3">
//                 <div className="row g-0">
//                   <div className="col-md-4 p-2">
//                     {product && product.mainImage && (
//                       <>
//                         <img
//                           src={product.mainImage.secure_url}
//                           style={{ width: "100%", height: "auto",  }}
//                           className="img-fluid rounded-start"
//                           alt={product.name}
//                         />
//                       </>
//                     )}
//                   </div>
//                   <div className="col-md-8">
//                     <div className="card-body">
//                       <h5 className="card-title">{product?.name}</h5>
//                       <p className="card-text" style={{ width: "150%" }}
//  >{product?.description}</p>
//                       <p className="card-text">{product?.slug}</p>
//                       <p className="card-text">{product?.price}$</p>
//                       <p className="card-text">{product?.status}</p>
//                       <div className="d-flex mb-3">
//                         {product.subImages.map((image, index) => (
//                           <img
//                             key={index}
//                             src={image.secure_url}
//                             alt={`Product Image ${index + 1}`}
//                             style={{
//                               width: "100px",
//                               height: "auto",
//                               marginRight: "10px",
//                             }}
//                           />
//                         ))}
//                       </div>
//                       <div
//                         className="d-flex justify-content-center align-items-center p-2"
//                       >
//                         <button
//                           onClick={() => setAddCart(product._id)}
//                           className="btn btn-outline-primary"
//                         >
//                           Add to Cart
//                         </button>
//                         <Link to={`/products/${product._id}/review`} className="btn btn-outline-info">
//                           Add Review
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default Produtc;