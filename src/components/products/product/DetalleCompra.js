import React from 'react'
import './sidecarrito.css'

import { useMediaQuery } from 'react-responsive';
import myConfig from '../../../config';


const url =myConfig.urlBack
const hereUrl=myConfig.urlFront

const DetalleCompra =  ({post, storage, este}) => {

    function numberWithDots(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
    const isMobile = useMediaQuery({ query: '(max-width: 360px)' })
    const isMediumLong = useMediaQuery({ query: '(max-width: 1300px)' })
    //Entre los que estan guardado en storage, selecionar el que tiene la Id del post
    let intersection = storage.filter(el=> el._id==post._id)

    //REACER UNA FORMA QUE BORRE ACA  Y EN PRODUCT_DETALLE2
    
    // const deleteElementHandler=()=>{
    //     const listaStorage = JSON.parse(window.localStorage.getItem('invitado'));
    // if (listaStorage){
    //   listaStorage.map(i=>{
    //     console.log(i._id, post._id)
    //     if (post._id === i._id){
            
    //         let aZero = listaStorage.filter(item=>{return item._id !== i._id})
    //         window.localStorage.setItem('invitado', JSON.stringify(aZero));
    //         console.log(este)
    //         if(este.updateLista){
    //             este.updateLista()
    //         }

    //     }
    //   })
     
    // }
    // }

                    // console.log(post)


    return (
    <div>
        <div style={{position:'relative', border:'2px solid pink', borderRadius:6}} className="row-carrito">
            <div  className="card-carrito">
                <div className="card-img-carrito">
                    <a href={`${hereUrl}products/`+post._id}>
                        <img className="medium" src={url+"thumb/thumbnails-"+post.imageLocation[0].slice(8)} alt="producto1" />
                    </a>
                </div>
                <div className="card-body-carrito">
                    <a href={`${hereUrl}products/`+post._id}>
                        <p style={{fontSize:'2.1rem'}}>{post.name}</p>
                    </a>
                    <p>Cantidad: {intersection[0].cantidad}</p>
                    <p>Detalles: {post.descrip}</p>
                    <p className="price-carrito">Unidad ${numberWithDots(post.price)}</p>
                    <p style={{fontSize:'1.9rem', marginTop:'1rem'}}>${numberWithDots(post.price*intersection[0].cantidad)}</p>
                    {/* <div style={{position:'absolute',display:'flex',flexDirection:'row-reverse',right:'5px', bottom:'5px'}}><button  style={{background:'transparent',border:'transparent', fontSize:'19px',cursor:'pointer'}} onClick={deleteElementHandler} >🗑️</button></div> */}

                </div>
            </div>
         </div>
    </div>
    )
}

export default DetalleCompra
