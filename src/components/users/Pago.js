import React from 'react'
import {useSelector} from 'react-redux';
const url ="http://localhost:5000/"


const Pago = () => {
  const posts = useSelector((state) => state.posts) //posts por .reducer/index.js
  const compra = (JSON.parse(sessionStorage.getItem("detalleCompra")));
  // const jsonCompra = JSON.parse(compra)
  // console.log(posts)
  const numsDetalle = compra.detalleCompra.map(item=>{return item._id})
  let intersection = posts.filter(el=> numsDetalle.includes(el._id))
  // console.log(numsDetalle)
  // console.log(compra)
  // console.log(intersection)
    return (
      <div style={{minHeight:'70vh', display:'flex', flexDirection:'column', alignItems:'center'}} >
        <h3 style={{textAlign:'center', margin:'4rem auto', background:'#bbb', width:'100vw', padding:'3rem 0', margin:0}}>Reserva realizada</h3>
        <div style={{display:'flex', justifyContent:'center '}}>
          <div style={{minWidth:400,alignContent:'center', display:'flex', flexDirection:'column'}}>
            <h4 style={{textAlign:'center'}} >Productos Reservados</h4>
            {intersection.map((post)=>(
              <div style={{ width:'80%', margin:'2rem auto', alignItems:'center',justifyContent:'center', display:'flex', flexDirection:'column'}}  key={post._id} item >
                <img src={url+post.imageLocation[0]} alt="imagen" style={{maxHeight:150, maxWidth:150}}/>
                <h4>{post.name}</h4>
                {/* <h4>${post.p  rice}</h4> */}
              </div>
            ))}  
          </div>

          <div style={{ width:'100%', margin:'0 auto', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
            <div>
              <h4>Datos Comprador</h4>
              <p>{compra.nombre}</p>
              <p>{compra.direccion}</p>
            </div>
            <div style={{height:40}}></div>              
              <h4>Recibirá una confirmación de estos datos en su correo {compra.email},<br></br> junto con los datos para hacer el deposito</h4>

              <h4>Gracias por su compra</h4>
            <div style={{height:100}}></div>
          </div>
        </div>
            {/* <div>{compra}</div> */}

      </div>
    )
}

export default Pago
