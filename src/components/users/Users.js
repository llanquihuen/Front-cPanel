import React,{useState, useRef, useEffect} from 'react'

import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {pink} from '@material-ui/core/colors'
import {Paper,TextField, Button, Grid} from '@material-ui/core'
import { useMediaQuery } from 'react-responsive';

import HeroSwiper from '../HeroSwiper';
import Footer from '../Footer';
import DetalleCompra from '../products/product/DetalleCompra';

let testMail=true
let testRut=true


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent:'end',
        flexWrap: 'wrap',
        '& > *': {
        margin: 'auto',
        width:'90vw',
        // maxWidth: '1000px',
        // minWidth:'270px',
        height: '75vh',
        minHeight:'610px',
        },
    },
    rootMobile:{
        width:'95vw',
        margin:'auto',

    },
root2: {
    height:'65vh',
    // background:pink[50],
    display:'flex',
    flexDirection:'column',
    minHeight:'500px',

    
    '& > *': {
        margin: 'auto',
        width: '60vw',
        maxWidth:'600px',
        minWidth:'250px',
        minHeight:'13px',
        
        
    },
    //Letra de todos
    '& .MuiFormLabel-root': {
        color: pink[900],
    },
    //Outline
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: pink[200],
        },
        '&:hover fieldset': {
            borderColor: pink[100],
        },
        '&.Mui-focused fieldset': {
            borderColor: pink[200],
        },
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform:'translate(7px,-15px) scale(.85)'
    }
    
},
nonono:{
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'red',
            borderWidth:3
        },
        '&:hover fieldset': {
            borderColor: 'crimson',
            borderWidth:2
        },
        '&.Mui-focused fieldset': {
            borderColor: 'crimson',
            borderWidth:2
        },
    }
},
sisisi:{
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: pink[200],
        },
        '&:hover fieldset': {
            borderColor: pink[100],
        },
        '&.Mui-focused fieldset': {
            borderColor: pink[200],
        },
    },
},
scrollbar:{
    '&::-webkit-scrollbar':{
        width: '16px',
    },
    '&::-webkit-scrollbar-track': {
        boxShadow:' inset 4px 4px 5px rgb(88, 27, 27,.0)' ,
        borderRadius:' 10px',
        // background:'white',
        border:'1px solid rgb(153, 153, 153,.0)',
    },
    '&::-webkit-scrollbar-thumb': {
        background: 'rgba(254,198,202,.9)',
        border: '1px solid lightpink',
        boxShadow: 'inset 4px 4px 5px rgb(255, 255, 255,.8)',
        borderRadius: 10,
    
    } 
}

}));


const Users = (props) => {
    const inputRut = useRef(null);
    const classes = useStyles();
    const isMobile = useMediaQuery({ query: '(max-width: 360px)' })
    const isMediumLong = useMediaQuery({ query: '(max-width: 1300px)' })


    const [userData, setUserData] = useState({
        nombre:"",
        email:"",
        rut:"",
        telefono:"",
        direccion:"",
    })
    

    const puntosYGuion =(x)=> {
        if (x.length>=6){
        if(!x.includes("-"||"‐")) x= x.slice(0,-1)+"-"+x.slice(-1);
        x=x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        setUserData({...userData, rut:x})
        }
    }
    const soloGuion = (x)=>{
        if(!x.includes("-"||"‐")) x= x.slice(0,-1)+"-"+x.slice(-1);
        return x.replace(/\./g,"")
    }
    
    // let numeroRut="1613033"
    // console.log(puntosYGuion(numeroRut))
    
    var Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X"
        validaRut : function (rutCompleto) {
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
            return false;
            var tmp 	= rutCompleto.split('-');
            var digv	= tmp[1]; 
            var rut 	= tmp[0];
            // eslint-disable-next-line eqeqeq
            if ( digv == 'K' ) digv = 'k' ;
            // eslint-disable-next-line eqeqeq
            return (Fn.dv(rut) == digv );
        },
        dv : function(T){
            var M=0,S=1;
            for(;T;T=Math.floor(T/10))
            S=(S+T%10*(9-M++%6))%11;
            return S?S-1:'k';
        }
    }
    const validateEmail=(e)=> {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        testMail = re.test(String(e).toLowerCase());
        setUserData({...userData, email:e})
    }
    const validateRut=(e)=>{
        testRut = Fn.validaRut(soloGuion(e));
        setUserData({...userData, rut:e})
    }
    // const formatoPuntosYGuion =(x)=> {
    //     x=x.replace(/\.|-/g,"");
    //     if (x.length>=7){
    //     if (!x.includes("-"||"‐")) x= x.slice(0,-1)+"-"+x.slice(-1);
    //     x=x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    //     return x
    //     }
    // }
     const listaPedido = props.lista
    // const [listaPedido, setListaPedido] = useState(JSON.parse(window.localStorage.getItem('invitado')))
    // console.log(listaPedido)
    // console.log(props.lista)

    // useEffect(() => {
    //     setListaPedido(JSON.parse(window.localStorage.getItem('invitado')))
    //     props.updateLista()
    // }, [listaPedido])
     
    
    
    // let storage=JSON.parse(window.localStorage.getItem('invitado'));
    // if (!storage){
    //     storage=[]
    // }
    // console.log(storage)
    //Todos los Productos
    const posts = useSelector((state) => state.posts) //posts por .reducer/index.js

    //Los que estan en localStorage
    const nums = listaPedido.map(item=>{return item._id}) // nums = [18,19,20]
    let intersection = posts.filter(el=> nums.includes(el._id))

    const preciosCantidad = intersection.map((post)=>{ 
        // eslint-disable-next-line eqeqeq
        let store = listaPedido.filter(el=> el._id==post._id)
        return post.price * store[0].cantidad})

    const sumaPrecios = preciosCantidad.reduce((a,b)=> a+b,0)

    function numberWithDots(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}

    

        return (
        <div style={{display:'flex', flexDirection:'column'}}>
            {/* <HeroSwiper updateLista={updateLista}/> */}
            <div style={{height:'100%',paddingBottom:'6rem',minHeight:'800px', background:'linear-gradient(125deg, rgba(251,168,179,.6) 0%, rgba(254,228,232,.6) 100%)'}}>
                <h1 style={{textAlign:'center', margin:0, padding:'5rem'}}>DATOS PARA LA ENTREGA</h1>
                <div    className={isMediumLong?classes.rootMobile:classes.root}>
                    <Paper style={{ display:'flex', flexDirection:isMediumLong?'column':'row',justifyContent:'space-around',background:'linear-gradient(180deg, rgba(255,247,250,1) 0%, rgba(255,235,241,1) 100%)', borderRadius:'19px', }}  elevation={9} >
                    <div style={{width:isMediumLong?'95%':'50%',margin:'auto', padding:isMobile?'0 0':'0 3rem'}}>
                        <h2 style={{textAlign:'center', paddingTop:'3rem'}}>Completa el formulario para el envío</h2>
                    <form className={classes.root2} noValidate autoComplete="off">
                        
                        <TextField inputProps={{style: {fontSize: 16}}}  InputLabelProps={{style: {fontSize: 15}}}  required={true} label="Nombre" variant="outlined" value={userData.name} onChange={(e)=> setUserData({...userData, nombre:e.target.value})}/>
                        <div>
                        <TextField inputProps={{style: {fontSize: 16}}}  InputLabelProps={{style: {fontSize: 15}}} className={testMail? classes.sisisi:classes.nonono} required={true} label="Email" variant="outlined" value={userData.email} onChange={(e)=>validateEmail(e.target.value)} />
                        {!testMail?<p style={{height:0,padding:'0 5', color:'crimson'}}>Escriba un mail válido</p>:<></>}
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between', gap:isMobile?5:10}}>
                            
                            <div>
                            <TextField inputProps={{maxLength: 12, style: {fontSize:isMobile?15:16, paddingLeft:isMobile?8:'auto', paddingRight:8,}}}  className={testRut? classes.sisisi:classes.nonono} InputLabelProps={{style: {fontSize: 15}}} style={{width:isMobile?'60%':'25ch'}} ref={inputRut}  onBlur={(e)=>puntosYGuion(e.target.value)} required={true} label="RUT" variant="outlined" value={userData.rut} onChange={(e)=>validateRut(e.target.value)}  />
                            {!testRut?<p style={{height:0,padding:'0 5', color:'crimson'}}>Escriba un RUT válido</p>:<></>}
                            </div>
                            <TextField inputProps={{style: {fontSize:isMobile?15:16}}}  InputLabelProps={{style: {fontSize: 15}}} style={{width:'25ch'}} required={true} label="Teléfono" variant="outlined" />
                        </div>
                        <TextField inputProps={{style: {fontSize: 16}}}  InputLabelProps={{style: {fontSize: 15}}} required={true} label="Dirección para la entrega" variant="outlined" />
                        <Button style={{padding:'1em', background:'pink',fontSize:'1.3em',margin:'auto', textAlign:'center'}}>Pagar</Button>
                    </form>
                    </div>
                    {isMediumLong?  <hr style={{background:'white', width:'90%', borderColor:'pink'}}></hr>:<hr style={{background:pink[50],height:'80%', width:'4px', borderRadius:'5px',borderColor:pink[50], margin:'auto'}}></hr>}
                  
                    <div className={classes.scrollbar} style={{background:'transparent',height:'100%',overflowY:'scroll', width:isMediumLong?'80%':'50%', margin:'auto'}}>
                        <h2 style={{textAlign:'center'}}>Detalle Compra</h2>
                {intersection.map((post)=>(
                    <Grid style={{ width:'80%', margin:'4rem auto'}}  key={post._id} item >
                    <DetalleCompra post={post} storage={listaPedido} este={props.updateLista}/>
                    </Grid>
                ))}  
                <p style={{ width:'80%', margin:'4rem auto', fontSize:'2em'}} >Total: {numberWithDots(sumaPrecios)}</p>    
                </div> 
                    </Paper>
                </div>
           
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Users







