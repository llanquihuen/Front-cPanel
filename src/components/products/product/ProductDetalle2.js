/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React,{useEffect, useState} from 'react';
import { useMediaQuery } from 'react-responsive';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Button, Grid} from '@material-ui/core'
import {pink}from '@material-ui/core/colors'
import NotFound from '../../../NotFound'



import ProductPortada from './ProductPortada'
import ImageGalleryDetalle from './ImageGaleryDetalle';
import HeroSwiper from '../../HeroSwiper';
import Footer from '../../Footer';



import './detalle.css'
import "react-image-gallery/styles/css/image-gallery.css";

const url = 'https://sakuranboshodo.cl/test4/products/'
const MyGallery = (routerProps) => {
    //Productos
    const [Product, setProduct] = useState([])
    const [Redirect, setRedirect] = useState(false)


    useEffect(() => {
        axios.get(`${url}${routerProps.match.params._id}`)
        .then(res =>{
            if (res.data[0]!==undefined){
                setProduct(res.data[0])
            }else{
                setRedirect(true)
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [Product2, setProduct2] = useState([])
    const [listaPedido, setListaPedido] = useState(JSON.parse(window.localStorage.getItem('invitado')))
    const [numeroItem, setNumeroItem] = useState(1)
    const [thisProduct, setThisProduct] = useState([])

    if (listaPedido===null){
        setListaPedido((window.localStorage.setItem('invitado','[]')))
    }

    // const updateLista =()=>{
    //     setListaPedido(JSON.parse(window.localStorage.getItem('invitado')))
    // }


    let esteProduct=""
    if (listaPedido){
      esteProduct = listaPedido.find(item=>{
          return item._id === Product._id
      })
    }
    // useEffect(() => {
    //     setThisProduct(listaPedido.find(item=>{
    //         return item._id === Product._id}))
    // }, [esteProduct])




    const isMobile = useMediaQuery({ query: '(max-width: 920px)' })

    const posts = useSelector((state) => state.posts) //posts por .reducer/index.js


    //data es el producto que dice en la pagina
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



        if (!listaPedido){
            console.log('lala')
            setListaPedido([])
        }
    if (thisProduct){
        if (thisProduct.cantidad<=0){
            console.log('zer')
            console.log(listaPedido)
            listaPedido.map(i=>{
                console.log(i.cantidad)
                if (i.cantidad==0){
                    console.log('zero')

                    let aZero = listaPedido.filter(item=>{return item.cantidad != 0})

                    console.log(listaPedido)
                    console.log(aZero)
                    window.localStorage.setItem('invitado', JSON.stringify(aZero));
                    setListaPedido(aZero)
                    setThisProduct(null)
                }
            })

        }
    }




    const changeCartHandler=()=>{
        console.log('boton')
        const listaStorage = JSON.parse(window.localStorage.getItem('invitado'));
        if (listaStorage.length!==0){
            let isThere=0

            listaStorage.map(i=>{
                console.log('if')
                console.log(i._id, Product._id)
                if (Product._id === i._id){
                    isThere=isThere+1

                    setThisProduct({...thisProduct, cantidad:numeroItem})
                    i.cantidad=numeroItem
                    console.log(thisProduct)
                    console.log(listaStorage)
                    window.localStorage.setItem('invitado', JSON.stringify(listaStorage));
                }
            })
            if(isThere===0){
                console.log('else')
                console.log(listaPedido)
                listaPedido.push({
                    "_id": Product._id,
                    "cantidad":numeroItem,
                })
                console.log(listaPedido)
                setThisProduct({...thisProduct, cantidad:listaPedido.cantidad})

                window.localStorage.setItem('invitado', JSON.stringify(listaPedido));
            }
        }else{
            console.log('else2')
            listaPedido.push({
                "_id": Product._id,
                "cantidad":numeroItem,
              })
              setThisProduct({...thisProduct, cantidad:listaPedido.cantidad})

              window.localStorage.setItem('invitado', JSON.stringify(listaPedido));
        }
    }

    const deleteElementHandler=()=>{
        const listaStorage = JSON.parse(window.localStorage.getItem('invitado'));
    if (listaStorage){
      listaStorage.map(i=>{
        // console.log(i._id, listaPedido[0]._id)
        if (Product._id === i._id){
          console.log('if menos')
          i.cantidad=0
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
    console.log('0')
    let aZero = listaPedido.filter(item=>{return item.cantidad != 0})
    console.log(aZero)
    window.localStorage.setItem('invitado', JSON.stringify(aZero));
    routerProps.updateLista()

  }, [esteProduct,listaPedido])

//   console.log(esteProduct+'-------------------------')

    return (<>
        {/* <HeroSwiper updateLista={updateLista}/> */}
        {Redirect? <NotFound />: 

        <div className='body-detalle'>
            <div style={{position:'relative'}}className={isMobile?'box-mobile-detalle':'box-detalle'} >
                <div className={isMobile?'mobile-flex1':'flex1'}>
                    <ImageGalleryDetalle Product={Product}/>
                </div>
                <div className={isMobile?'mobile-flex2':'flex2'}>
                    <p style={{color:'#333', fontSize:'2.5em'}}>{Product.name}</p>
                    <p style={{color:'#333', fontSize:'calc(10px + 1.2vmin)', margin:'1em 0', lineHeight:'150%'}}>{Product.descrip}</p>
                    <p style={{color:'#333', fontSize:'0.9em', marginTop:'1em'}}>Stock: {Product.stock}</p>
                    {thisProduct ? <p style={{color:'#000', fontSize:'1.2em'}}>Cantidad en el carrito: {thisProduct.cantidad} </p>:<></>}
                    <br></br>
                    <p style={{color:'mediumvioletred', fontSize:'2.2em', fontWeight:'bold', margin:'1rem 0 2rem 0'}}>${Product.price}</p>

                <div>
                    <label htmlFor="cantidadP">Cantidad:</label><br/>
                    <div style={{display:'flex', gap:10}}>
                    <input min="0" style={{width:'5rem', height:'3rem', fontSize:'20px'}}  type="number" id="cantidadP" name="cantidadP"  placeholder={thisProduct ? thisProduct.cantidad:'1'} onChange={(e)=>  setNumeroItem(e.target.value)} /> <br/>
                    {numeroItem>0 && numeroItem<=Product.stock? <Button size="small" style={{background:'pink',color:'black', fontSize:'16px'}} onClick={changeCartHandler} >{esteProduct? "Editar" :"Agregar"}</Button>: numeroItem<=0 ? !esteProduct? <></>:<Button size="small" style={{background:'pink',color:'black', fontSize:'16px'}} onClick={deleteElementHandler} >Quitar </Button>: <p>No hay stock para su pedido</p>}
                    </div>
                </div>
                <br></br>
                {listaPedido.length>0? <Button href='/store2/invitado' style={{padding:'0.5em 1em', background:'pink',fontSize:'1.3em',margin:'1em 0', marginBottom:'3em', border:'2px solid', borderColor:pink[200]}}>Finalizar Compra</Button>:<p></p>}

                {esteProduct?<div style={{position:'absolute',display:'flex',flexDirection:'row-reverse',right:0, bottom:0}}><Button size="large" style={{background:'#ff6666',color:'black', fontSize:'14px', marginTop:20}} onClick={deleteElementHandler} >Quitar del carro🗑️</Button></div>:<></>}




            {/* {esteProduct? <h2>Llevas {esteProduct.cantidad===1?`1 artículo`:`${esteProduct.cantidad} artículos`}</h2>:<></>} */}
            {/* <div style={{display:'flex'}}>
            {thisProduct? <Button size="large" onClick={deleteFromCartHandler} style={{background:'pink',color:'black', fontSize:'16px'}}>Quitar</Button>:<></>}
            <Button size="large" onClick={addToCartHandler} style={{background:'pink',color:'black', fontSize:'16px'}}>Agregar</Button>
        </div> */}
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
        }
        </>
    )
}
export default MyGallery;