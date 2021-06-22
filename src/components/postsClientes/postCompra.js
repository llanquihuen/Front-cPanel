import React, {useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles} from '@material-ui/core/styles';

import {getClientes,getCompras} from '../redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent:'center',
        margin:'0px',
        background:'#bbb'
      },
      "& .MuiPaginationItem-sizeLarge": {
        fontSize:'1.6rem'
      },
     },
  }));

const PostCompra = () => {
    const dispatch = useDispatch();
    // const [currentIdCliente, setCurrentIdCliente] = useState(null)
    // const [currentIdCompra, setCurrentIdCompra] = useState(null)
    
    useEffect(() => {
        dispatch(getClientes())  ////////2* action->UseEffect ->reducer
    }, [])

    useEffect(() => {
        dispatch(getCompras())  
    }, [])

    const clientes = useSelector((state) => state.clientes) //posts por .reducer/index.js
    const compras = useSelector((state) => state.compras) 
    const posts = useSelector((state)=>state.posts)
    const classes = useStyles();

    // console.log(posts)
    // console.log(compras)
    // console.log(clientes)

    // const numsDetalle = compras.map(item=>{return item._id})
    // console.log(numsDetalle)

    
    //Paginador
    const [thisPage, setThisPage] = useState(1);
    const [postXpage] = useState(10)
    const indexLpost = thisPage * postXpage;
    const indexFpost = indexLpost - postXpage;
    const currentPost = compras.slice(indexFpost,indexLpost)
    const totalPosts = compras.length
    const totalPages = Math.ceil(totalPosts/postXpage);
    
    const handleChange = (event, value) => {
        setThisPage(value);
    };

    //Convertir JSON de compra, string a JSON
    const hacerJsonCompra =(x)=>{
       return JSON.parse(x.detalleCompra.replace(/'/g,'"'))
    }
    
    //retorna la cantidadde los productos dentro de la compra.
    const cantidad =(dat)=> JSON.parse(dat.detalleCompra.replace(/'/g,'"')).map((x)=>(x.cantidad))

    //Filtrar post con los numeros de la compra.
    let intersection =(dat)=> posts.filter(el=> dat.detalleCompra.includes(el._id))

    // console.log(compras)
    return (
        <div>
            <h1 className="comprasPost-title">Compras</h1>
            <div className="comprasPost-content">
                {currentPost.map((dat)=>(
                <div className="datosClientePost" key={dat._id}>
                  
                  <div>RutCompra: {dat.idCliente} --  Direccion: {dat.direccion}<br/>
                  compra: {intersection(dat).map((el,i)=>
                      <p key={el._id}>{cantidad(dat)[i]}-{el.name}</p>
                  )}
                  </div>
                </div>
                
                ))}
            </div>
              <div className={classes.root}> 
      <Pagination size='large' count={totalPages} page={thisPage} onChange={handleChange} color="secondary" />

    </div> 
        </div>
    )
}

export default PostCompra
