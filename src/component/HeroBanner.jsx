import React from 'react'
import Slider from 'react-slick'
import '../component/HeroBannar1.css'



export default function HeroBanner() {
  const data = [{
    id:1,
    img:'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title:'Online Shop Its Amazing',
    description:'You can order now',
    button:'Shop Now'
  },
  {
    id:2,
    img:'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title:'Online Shop Its Amazing',
    description:'You can order now',
    button:'Shop Now'
  },
  {
    id:3,
    img:'https://plus.unsplash.com/premium_photo-1683758342885-7acf321f5d53?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title:'Online Shop Its Amazing',
    description:'You can order now',
    button:'Shop Now'
  }
]
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
  return (
    <div className='bannarslider'>
      <Slider className='bannarslider' {...settings}>
        {
          data.map(item=>{
            return(
              <div className='imagecont' key={item.id}>
                <img src={item.img} alt="noimg" />
                <div className='content'>
                  <h1>{item.title}</h1>
                  <span>{item.description}</span>
                  <button>Shop More</button>
                </div>
              </div>
            )
          })
        }
      </Slider>
      
      
      HeroBanner
      </div>
  )
}
