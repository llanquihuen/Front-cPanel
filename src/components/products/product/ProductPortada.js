import React from 'react'

const url ="http://localhost:5000/"
const hereUrl="http://localhost:3000/"

const ProductPortada =  ({post}) => {
    return (
        <div>
        <div style={{width:'100%'}}>
         <div  className="card">
             <div  style={{width:'100%'}} className="card-img">
                 <a href={`${hereUrl}products/`+post._id}>
                     <img className="medium" src={url+post.imageLocation[0]} alt="producto1" />
                 </a>
             </div>
             <div className="card-body">
             <a href={`${hereUrl}products/`+post._id}>
                     <h3>{post.name}</h3>
                </a>
                   <div className="price">${post.price}</div>
             </div>
         </div>
         </div>
 </div>
    )
}

export default ProductPortada
