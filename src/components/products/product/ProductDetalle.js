//Este archivo va exportado directo a /Routes.js

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

const url = 'https://sakuranboshodo.cl/test4/products/'
const MyGallery = (routerProps) => {
  const [Product, setProduct] = useState([])
  const [Product2, setProduct2] = useState([])
  const [thisProduct, setThisProduct] = useState([])
  

  const isMobile = useMediaQuery({ query: '(max-width: 920px)' })

  useEffect(() => {
    axios.get(`${url}${routerProps.match.params._id}`)
    .then(res =>{
      setProduct(res.data[0])
      
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const posts = useSelector((state) => state.posts) //posts por .reducer/index.js
  
  const data = posts.filter(item=>{
    // console.log(item._id, routerProps.match.params._id )
    // eslint-disable-next-line eqeqeq
    return item._id != routerProps.match.params._id
  })

  useEffect(()=>{
    setProduct2(data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[posts])
  // console.log(Product2)

  const [listaPedido, setListaPedido] = useState(JSON.parse(window.localStorage.getItem('invitado')))

  if (!listaPedido){
    setListaPedido([])
  }

  let esteProduct=""
  if (listaPedido){
    esteProduct = listaPedido.find(item=>{
        return item._id === Product._id
    })
  }

  const addToCartHandler =()=>{
    const listaStorage = JSON.parse(window.localStorage.getItem('invitado'));
    if (listaStorage){
      let isThere=0
      listaStorage.map(i=>{
        // console.log(i._id, listaPedido[0]._id)
        if (Product._id === i._id){
          console.log('if', i)
          isThere=isThere+1
          i.cantidad=i.cantidad+1 
        
            console.log(thisProduct)
            setThisProduct({...thisProduct, cantidad:i.cantidad})
          
          console.log(listaStorage)
          window.localStorage.setItem('invitado', JSON.stringify(listaStorage));
        }
      })
      if (isThere===0){
        console.log('else')
        console.log(listaPedido)
          listaPedido.push({
            "_id": Product._id,
            "cantidad":1,
          })
          console.log(listaPedido)
          setThisProduct({...thisProduct, cantidad:listaPedido.cantidad})

          window.localStorage.setItem('invitado', JSON.stringify(listaPedido));
        }
        
    }else{
      console.log('else2')

      listaPedido.push({
        "_id": Product._id,
        "cantidad":1,
      })
      setThisProduct({...thisProduct, cantidad:listaPedido.cantidad})

      window.localStorage.setItem('invitado', JSON.stringify(listaPedido));

    }
    console.log('setlistapedido mas')

    setListaPedido(listaPedido)
  }
  //no usar filter desarma el JSON completo.

  // setThisProduct(esteProduct)

  const deleteFromCartHandler =()=>{
    const listaStorage = JSON.parse(window.localStorage.getItem('invitado'));
    if (listaStorage){
      let isThere=0
      listaStorage.map(i=>{
        // console.log(i._id, listaPedido[0]._id)
        if (Product._id === i._id){
          console.log('if menos')
          isThere=isThere-1
          i.cantidad=i.cantidad-1 
          setThisProduct({...thisProduct, cantidad:i.cantidad})

          if(i.cantidad===0){
            console.log('zero')

            let aZero = listaStorage.filter(item=>{return item.cantidad !== 0})
            
            console.log(listaPedido)
            window.localStorage.setItem('invitado', JSON.stringify(aZero));
            setListaPedido(aZero)
            setThisProduct(null)

          }else{
            console.log('else menos')
            console.log(listaStorage)
            window.localStorage.setItem('invitado', JSON.stringify(listaStorage));
          }
        }
      })
    }
  }

  useEffect(() => {
    
    setThisProduct(esteProduct)
    
    let aZero = listaPedido.filter(item=>{return item.cantidad !== 0})
    window.localStorage.setItem('invitado', JSON.stringify(aZero));

  }, [esteProduct])
  console.log('end render')

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
       
       {/* {esteProduct? <h2>Llevas {esteProduct.cantidad===1?`1 artículo`:`${esteProduct.cantidad} artículos`}</h2>:<></>} */}
      <div style={{display:'flex'}}>
      {thisProduct? <Button size="large" onClick={deleteFromCartHandler} style={{background:'pink',color:'black', fontSize:'16px'}}>Quitar</Button>:<></>}
       {thisProduct ? <h2>Llevas {thisProduct.cantidad}</h2>:<></>}
      <Button size="large" onClick={addToCartHandler} style={{background:'pink',color:'black', fontSize:'16px'}}>Agregar</Button>
      </div>
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