import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../component/Category.css';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import PaginationComponenmt from '../../../component/Pagination';
import CategoriesProduct from './CategoriesProduct';



export default function Categories() {
  const[categories,setCategories] = useState([])

  const getCategories = async() =>{
    console.log(getCategories)
    const{data} = await axios.get(`${import.meta.env.VITE_API}/categories/active?limit=10`);
    setCategories(data.categories)
  };
  
  const getPage = async (page) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API}/categories/?page=${page}`);
    setProducts(data.products);
}
  useEffect(() =>{
    getCategories()
  }, [])

    // const {id} = useParams();
    // const navigate= useNavigate();
    // navigate('/home');

  return (
    <>
    <Container>
      <Row>
    <CategoriesProduct/>
      <h2>Categories</h2>
      <div className='row'>
      {categories.map(categorie=>
      <div className='category' key={categorie._id}> 
        <div className='category-list'>
          <img src={categorie.image.secure_url}  />
          <div> 
        <Link to={`/CategoriesProduct/:id/${categorie._id}`}>Detils</Link>

</div>
          </div>
        
      </div>
        
        )}
     </div>
     </Row>
     </Container>
    </>
   
  )
}
