import React from 'react'
import CategorySideBar from './CategorySideBar'
import AllProduct from './AllProduct'
import { Container } from 'react-bootstrap'
import '../ProductTest/Product-sidebar.css'

export default function ProductSideBar() {
  return (
    <Container>
        <div className='product-sidebar'>
     <CategorySideBar/>
     <AllProduct/>
     </div>
     </Container>
  )
}
