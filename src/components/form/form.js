import React,{useState, useEffect, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import {useDropzone} from 'react-dropzone'
import { createPost,updatePost } from '../redux/actions';
import './drag-form.css'


const url ='https://sakuranboshodo.cl/test4/';
const getToken = {headers:{authorization: localStorage.getItem("token")} }

const Form = ({currentId, setCurrentId}) => {
    console.log(currentId)
    const [postData, setPostData] = useState({
        name:"",
        price:"",
        stock:"",
        tag:"",
        descrip:"",
        imageLocation:[],
    })
    
    const [file, setFile] = useState(null)
    // const [uploadPercentage, setUploadPercentage] = useState(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDrop = useCallback (acceptedFiles => {
        // console.log(acceptedFiles)
        let formData = new FormData();
        for (const file of acceptedFiles) {
            formData.append('productImage', file)
          }
          
        // formData.append("productImage", acceptedFiles[0]);
        axios.post(`${url}images`, formData,  getToken
        //     {
        //     onUploadProgress: ProgressEvent =>{
        //         setUploadPercentage(parseInt(Math.round((ProgressEvent.loaded *100)/ProgressEvent.total)))
        //         setTimeout(()=>setUploadPercentage(0), 10000)
        //     }
        // }
        )
        .then(res=>{
            console.log(postData)
            let array0=res.data.createdProduct.photo.split(/\s*(?:,|$)\s*/)
            let array1=postData.imageLocation
            console.log(postData)
            array0.map((photo)=> array1.push(photo))
            console.log(array1)
            setPostData({...postData, imageLocation:array1})
                console.log(postData)

            currentId? dispatch(updatePost(currentId, postData)): console.log("new item")
            // axios.delete(`${url}images\\${res.data.createdProduct._id}`);
            // let array1=['uno','dos']
        
            
            // console.log
        })
    })
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    

          
    const post = useSelector((state)=> currentId ? state.posts.find((p)=>p._id === currentId): null)

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (file) setFile(file)
        
    }, [file])

    // useEffect(() => {
        //     console.log(uploadPercentage)
        // }, [uploadPercentage])
    

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, postData))
            // console.log(postData)
        }else{
            // console.log(postData)
            dispatch(createPost(postData))
        }
        clear();
    }
    const handleTags=(e)=>{
        e.preventDefault();
        let arrayTag = e.target.value.split(/[ ,]+/)
        // arrayTag = e.target.value.split((","))
        // console.log(arrayTag)
        setPostData({...postData, tag:arrayTag})
    }

    
    const clear=()=>{
        setCurrentId(null)
        setPostData({name:"", price:"", stock:"", tag:"", descrip:"", imageLocation:[]})
    }
    const clear2=(e)=>{
        e.preventDefault();
        setCurrentId(null)
        setPostData({name:"", price:"", stock:"", tag:"", descrip:"", imageLocation:[]})
    }
    
    const photos = postData.imageLocation
    
    const clickX=(e)=>{
        const index = photos.indexOf(e)
        if (index > -1){
            photos.splice(index, 1)
        }
        setPostData({imageLocation:photos})
              if(currentId){
            dispatch(updatePost(currentId, postData))
            console.log(postData)
        }else{
            console.log(postData)
            dispatch(createPost(postData))
        }
        // console.log(e, index)
        console.log(photos)
    }

    const clickF=(e)=>{
        const index = photos.indexOf(e)
        if (index > -1){
            photos.splice(index, 1)
            photos.unshift(e)
        }
        console.log(photos)
        setPostData({imageLocation:photos})
              if(currentId){
            dispatch(updatePost(currentId, postData))
            console.log(postData)
        }else{
            console.log(postData)
            dispatch(createPost(postData))
        }
        // console.log(e, index)
        console.log(photos)
    }
    if(postData.imageLocation === ""){setPostData({...postData,imageLocation:[]})}

    useEffect(() => {
        if (post) setPostData(post)
        
    }, [post,currentId])
    
    console.log(postData)

    // let strin1 = 'lolo'
    // console.log(strin1.split(" "))


    return (<>
        <form  autoComplete="off"  encType="multipart/form-data" noValidate onSubmit={handleSubmit}>
        <div className="formulario">
            <div className="form-name">
                <label htmlFor="nombreP" >Producto:</label><br/>
                <input type="text" id="nombreP" name="nombreP" value={postData.name} onChange={(e)=> setPostData({...postData, name:e.target.value})}/><br/>
            </div>
            <div>
                <label htmlFor="precioP">Precio:</label><br/>
                <input type="number" id="precioP" name="precioP" value={postData.price} onChange={(e)=> setPostData({...postData, price:e.target.value})} /> <br/>
            </div>
            <div>
                <label htmlFor="stockP">Stock:</label><br/>
                <input type="number" id="stockP" name="stockP" value={postData.stock} onChange={(e)=> setPostData({...postData, stock:e.target.value})} /> <br/>
            </div>
            <div>
                <label htmlFor="tagP">Grupo:</label><br/>
                <input type="text" id="tagP" name="tagP" value={postData.tag} onChange={(e)=> handleTags(e)} /> <br/>
            </div>
            <div className="form-descrip">
                <label htmlFor="descriP">Descripción:</label><br/>
                <textarea type="text" id="descriP" name="descriP" value={postData.descrip} onChange={(e)=> setPostData({...postData, descrip:e.target.value})} /> <br/>
            </div>
            { (photos.length!==0)? <></> :  <div className="drag-main"{...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Suelte los archivos acá...</p> :
                    <p>Arrastre y suelte los archivos acá, <br/> o haga click.</p>
                }
                </div>

            }
            {(photos.length!==0)? <div style={{display:'flex', flexDirection:'row', justifyContent:'center',width:'90%'}}>
                    {photos.map((imag,i)=> 
                        <div key={imag} className={`thumb-pic`} style={{position:'relative'}}>             
                        <img  
                        alt="imagen"
                        key={imag} 
                        className={`thumb-pic`}
                        // className={`thumb-pic ${cardClassname(i)}`} 
                        // onMouseOver={() => setHoverIndex(i)} 
                        // onMouseLeave={() => setHoverIndex(null)}
                        src={url+imag.replace(/\\/g, "/")}></img>
                            <p
                        className={'thumb-x'}
                        key={i} 
                        onClick={()=> clickX(imag)}>X</p>
                            <p
                        className={'thumb-f'}
                        key={i} 
                        onClick={()=> clickF(imag)}>F</p>
                        </div>
                    )}
                    <div style={{fontSize:16,height:100}} className="drag-main2 thumb-pic"{...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p style={{position:'absolute', top:-38}} >Agregue archivos acá...</p> :
                            <p style={{position:'absolute', top:-38}}>Arrastre y suelte</p>
                        }
                        <p style={{position:'absolute', top:0, fontSize:42}}>+</p>
                    </div>
                </div>:<></>}
            <div>
                <button  className={`btns ${currentId? 'cambios-btn': 'nuevo-btn'}`} type="submit" >{currentId? 'Aceptar cambios':'Crear Nuevo'}</button>
                <button  className={"btns cancelar-btn"} onClick={clear2}>Cancelar</button>
            </div>
        </div>
        </form>
  
    </>
    )
}
export default Form
