import React,{useEffect, useState} from 'react';
import { useMediaQuery } from 'react-responsive';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Button, Grid} from '@material-ui/core'

import ProductPortada from './ProductPortada'
import ImageGalleryDetalle from './ImageGaleryDetalle';
import HeroSwiper from '../../HeroSwiper';
import Footer from '../../Footer';



import './detalle.css'
import "react-image-gallery/styles/css/image-gallery.css";

const url = 'http://localhost:5000/products/'
  const MyGallery = (routerProps) => {
  const [Product, setProduct] = useState([])
  const [Product2, setProduct2] = useState([])

  const isMobile = useMediaQuery({ query: '(max-width: 920px)' })

  useEffect(() => {
    axios.get(`${url}${routerProps.match.params._id}`)
    .then(res =>{
      setProduct(res.data[0])
      
    })
  }, [])
  const posts = useSelector((state) => state.posts) //posts por .reducer/index.js
  
  const data = posts.filter(item=>{
    console.log(item._id, routerProps.match.params._id )
    return item._id != routerProps.match.params._id
  })

  useEffect(()=>{
    setProduct2(data)
  },[posts])
  console.log(Product2)

  
  return (<>
      <HeroSwiper />
    <div className='body-detalle'>
    <div className={isMobile?'box-mobile-detalle':'box-detalle'} >
      <div className={isMobile?'mobile-flex1':'flex1'}>
        <ImageGalleryDetalle Product={Product}/>
      </div>
      <div className={isMobile?'mobile-flex2':'flex2'}>
        <h2>Nombre: {Product.name}</h2>
        <h2>Descripcion: {Product.descrip}</h2>
        <h2>Precio: ${Product.price}</h2>
      <Button outline="black"size="large" style={{background:'pink',color:'black', fontSize:'16px'}}>Agregar al carrito</Button>
      </div>
    </div>
    <h1>Otros Productos</h1>
    <div style={{display:'flex'}}>
      {Product2? 
        Product2.map((post)=>(
            <Grid key={post._id} item xs={6} sm={6} md={4} lg={3}>
            <ProductPortada style={{justifySelf:'center', width:'100%'}}  post={post}/>
            </Grid>
        )) :
        <></>} 
    </div>
    </div>
    <Footer />

    </>
  )
}
export default MyGallery;