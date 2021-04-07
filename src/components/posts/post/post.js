import React,{useState, useRef, useEffect} from 'react'
import {useDispatch} from 'react-redux'

import {deletePost} from '../../redux/actions'
import  "./post-style.css"

// const getToken = {headers:{authorization: localStorage.getItem("token")} }
// import Gallery from '../post/gallery'

const url ='https://sakuranboshodo.cl/test4/';

const Post = ({post, setCurrentId}) => {
    // console.log(post)
    // console.log(post.selectedFile)
    // console.log(setCurrentId)

        const refImagenes = useRef(null);

        const [hoverIndex, setHoverIndex] = useState(0);

        useEffect(()=>{
                setHoverIndex(0)
        },[post])
        
        const prevCountRef = useRef();
        
        useEffect(() => {
            prevCountRef.current = hoverIndex;
        });
        const prevCount = prevCountRef.current;
        
        useEffect(()=>{
            const prevCount = prevCountRef.current;
            if (hoverIndex===null){
                setHoverIndex(prevCount)
            }
        },[hoverIndex])

        const cardClassname = (index) => {
            if (!prevCount && index === hoverIndex){
                return "card text-center";
            }
            if (index === hoverIndex) {
                return "card text-center";
            }
            if (hoverIndex===null && index === prevCount){
                    return "card text-center";
            }else return "card text-center inactive";
        }
        
            let photos = post.imageLocation
        
        // console.log(photos)
        // if (photos === undefined){
        //      photos = post.createdProduct.imageLocation
        // }
        // console.log(hoverIndex)
        let mainPic = photos[hoverIndex];
        const leaveMouse = (hover, past)=>{
            if (hover === past){
                // console.log('hover===past',hover)
                return hover
            }else{
                // console.log('hover!=past',hover)
                return hover
            }
        }
        // console.log(mainPic)

        const [zoomPhoto, setzoomPhoto] = useState('normal')

        const clickPhoto=()=>{
            if (zoomPhoto==='normal'){
                setzoomPhoto("zoom")
            }
            else if (zoomPhoto==='zoom'){
                setzoomPhoto("normal")
            }
        }
        const clickEditar = ()=>{
            setCurrentId(post._id)
            
            window.scrollTo(0, 0)
              
        }

        const dispatch = useDispatch();
        
    return (
        <div className='post-complete'>
            {/* three dots button */}
            <div>
                <div className='info-post'>
                    <div>
                        <p className='p-name'>{post.name?  `${post.name}` : "Sin Nombre"}</p>
                    </div>
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'center', gap:'7%'}}>
                        <p>{post.price?  `Precio:$${post.price}` : "Sin Precio"}</p>
                        <p>{post.stock?  `Stock:${post.stock}` : "Sin stock"}</p>
                    </div>
                    <div>
                        <p>{post.tag?  `Etiquetas:${post.tag}` : "Sin Etiquetas"}</p>
                    </div>
                </div>
                <textarea className='descr' readOnly value={post.price?  `${post.descrip}` : "Sin Descripción"}></textarea>


                {photos[0]===undefined? <p>Sin Imagen</p> :
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <img className={`main-pic`} alt="imagen" 
                    src={`${url}${mainPic ? mainPic.replace(/\\/g, "/") : photos[prevCount]}`}></img>

                    <img style={{position:'absolute'}} className={`${zoomPhoto}`} onClick={clickPhoto} alt="imagen" 
                    src={`${url}${mainPic ? mainPic.replace(/\\/g, "/") : photos[prevCount]}`}></img>
                    <div>
                        {photos.map((imag,i)=> 
                        //   <div                         style={{position:'relative'}}>             
                            <img  

                            alt="imagen"
                            ref={refImagenes}
                            key={imag} 
                            className={`thumb-pic ${cardClassname(i)}`} 
                            onMouseOver={() => setHoverIndex(i)} 
                            onMouseLeave={() => setHoverIndex(leaveMouse(hoverIndex, prevCount))}
                            src={`${url}${imag.replace(/uploads\\/g, "thumb/thumbnails-")}`}></img>
                        
                            // <p
                            // style={{position:'absolute', top:-38, right:2, color:'grey', cursor:'pointer'}}
                            // key={i} 
                            // onClick={()=> clickX(imag)}>X</p>
                            // </div>
                        )} 
                    </div>
                </div>}
                {/* <>{post.imageLocation ? post.imageLocation.map((imag)=> <img style={{height:200, width:200}}alt="imagen" key={imag} src={`${url}${imag.replace(/\\/g, "/")}`}></img>) : console.log(post)} </> */}
            </div>

            
            <div style={{display:'flex', justifyContent:'center', gap:30}}>
                <button  className={'btns-post'} style={{color:'black', background:"pink"}} onClick={clickEditar}>Editar</button>
                <button  className={'btns-post'} onClick={()=>{dispatch(deletePost(post._id))}}>Borrar</button>
            </div>
        </div>
    )
}
export default Post