import React from 'react'
import './sidecarrito.css'

const url ="https://sakuranboshodo.cl/test4/"
const hereUrl="https://sakuranboshodo.cl/store2/"

const ProductSideCarrito =  ({post, storage, este}) => {

    function numberWithDots(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}

    //Entre los que estan guardado en storage, selecionar el que tiene la Id del post
    let intersection = storage.filter(el=> el._id==post._id)

    //REACER UNA FORMA QUE BORRE ACA  Y EN PRODUCT_DETALLE2
    
    const deleteElementHandler=()=>{
        const listaStorage = JSON.parse(window.localStorage.getItem('invitado'));
    if (listaStorage){
      listaStorage.map(i=>{
        console.log(i._id, post._id)
        if (post._id === i._id){
            
            let aZero = listaStorage.filter(item=>{return item._id !== i._id})
            window.localStorage.setItem('invitado', JSON.stringify(aZero));
            // console.log(este)
            if(este.updateLista){
                este.updateLista()
            }

        }
      })
     
    }
    }

    const addToCartHandler =()=>{
        const listaStorage = JSON.parse(window.localStorage.getItem('invitado'));
        if (listaStorage){
          let isThere=0
          listaStorage.map(i=>{
            // console.log(i._id, listaPedido[0]._id)
            if (post._id === i._id){
                console.log('if', i)
                isThere=isThere+1
                console.log(post.stock)
                i.cantidad= +i.cantidad+1 
            
                // listaStorage({...i, cantidad:i.cantidad})
              
                console.log(listaStorage)
                window.localStorage.setItem('invitado', JSON.stringify(listaStorage));
                if(este.updateLista){
                    este.updateLista()
                }
            }
          })
        }}
        const substrFromCartHandler =()=>{
            const listaStorage = JSON.parse(window.localStorage.getItem('invitado'));
            if (listaStorage){
              let isThere=0
              listaStorage.map(i=>{
                // console.log(i._id, listaPedido[0]._id)
                if (post._id === i._id){
                    console.log('if', i)
                    isThere=isThere+1
                    console.log(post.stock)
                    i.cantidad= +i.cantidad-1
                
                    // listaStorage({...i, cantidad:i.cantidad})
                  
                    console.log(listaStorage)
                    window.localStorage.setItem('invitado', JSON.stringify(listaStorage));
                    if(este.updateLista){
                        este.updateLista()
                    }
                }
              })
            }}
    //       if (isThere===0){
    //         console.log('else')
    //         // console.log(listaPedido)
    //         //   listaPedido.push({
    //         //     "_id": post._id,
    //         //     "cantidad":1,
    //         //   })
    //         //   console.log(listaPedido)
    //         //   setThisProduct({...thisProduct, cantidad:listaPedido.cantidad})
    
    //         //   window.localStorage.setItem('invitado', JSON.stringify(listaPedido));
    //         }
            
    //     }else{
    //       console.log('else2')
    
    //       listaPedido.push({
    //         "_id": post._id,
    //         "cantidad":1,
    //       })
    //       setThisProduct({...thisProduct, cantidad:listaPedido.cantidad})
    
    //       window.localStorage.setItem('invitado', JSON.stringify(listaPedido));
    
    //     }
    //     console.log('setlistapedido mas')
    
    //     setListaPedido(listaPedido)
    //   } 
        let thisStorage = storage.filter( x => {
            if(x._id == post._id){
                return x
            }
        })    
        console.log(thisStorage)       
        console.log(post.stock)
        console.log(intersection[0].cantidad)

    return (
    <div>
        <div style={{position:'relative'}} className="row-carrito">
            <div className="card-carrito">
                <div className="card-img-carrito">
                    <a href={`${hereUrl}products/`+post._id}>
                        <img className="medium" src={url+post.imageLocation[0]} alt="producto1" />
                    </a>
                </div>
                <div className="card-body-carrito">
                    <a href={`${hereUrl}products/`+post._id}>
                        <p style={{fontSize:'2.1rem'}}>{post.name}</p>
                    </a>
                    <div style={{display:'flex'}}>

                    <p>Cantidad: </p>
                    {(intersection[0].cantidad == 1)?<p style={{background:'#bbb', marginLeft:10, marginRight:10, padding:'0 6px', borderRadius:10}}>-</p>:<p style={{background:'pink', marginLeft:10, marginRight:10, padding:'0 6px', borderRadius:10,cursor:'pointer'}} onClick={(substrFromCartHandler)}>-</p>}
                    <p>{intersection[0].cantidad}</p>
                    {(post.stock> intersection[0].cantidad)?<p style={{background:'pink', marginLeft:10, padding:'0 6px', borderRadius:10,cursor:'pointer'}} onClick={(addToCartHandler)}>+</p>:<p style={{background:'#bbb', marginLeft:10, padding:'0 6px', borderRadius:10}}>+</p>}
                    </div>
                    <p className="price-carrito">Unidad ${numberWithDots(post.price)}</p>
                    <p style={{fontSize:'1.9rem', marginTop:'1rem'}}>${numberWithDots(post.price*intersection[0].cantidad)}</p>
                    <div style={{position:'absolute',display:'flex',flexDirection:'row-reverse',right:'5px', bottom:'5px'}}><button  style={{background:'transparent',border:'transparent', fontSize:'19px',cursor:'pointer'}} onClick={deleteElementHandler} >🗑️</button></div>

                </div>
            </div>
         </div>
    </div>
    )
}

export default ProductSideCarrito
