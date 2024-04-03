import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoriesProduct from "../../catogry/component/CategoriesProduct";
import Categories from "../../catogry/component/Categories";
import SendCode from "../../Forgetpass/SendCode";
import Slider from "../Component/Slider";
import { Container } from "react-bootstrap";
import HomeCategory from "./HomeCategory";
import HeroBanner from "../../../component/HeroBanner";
import PaginationComponenmt from "../../../component/Pagination";
import getPage from "../../../component/Pagination";
import ProductSideBar from "../../../component/ProductTest/ProductSideBar";

export default function App() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const categoryPerPage = 3;

  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const getCategories = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API
      }categories/?page=${currentPage}&limit=${productsPerPage}`
    );

    setCategories(data.categories);
    console.log(data);
  };

  useEffect(() => {
    getCategories();
  }, [currentPage]);
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Container>
      <div className="row">
        <div className="products-heading">
          <br />
          <HeroBanner />
          <br></br>
        </div>
      </div>
      <Categories />

      {categories.map((categorie) => (
        // <div className='prodect-text'>

        <div className="prodect" key={categories.id}>
          <img src={categorie.image.secure_url} className="prodect-img"></img>
          <h2 className="prodect-h2">{categorie.name}</h2>
          <Link to={`/CategoriesProduct/${categorie._id}`}>Detils</Link>
        </div>
      ))}
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
              disabled={categories.length < categoryPerPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
