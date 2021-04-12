import React,{useState, useRef, useEffect} from 'react'

import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {pink} from '@material-ui/core/colors'
import {Paper,TextField, Button, Grid, MenuItem, NativeSelect, InputLabel} from '@material-ui/core'
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
    },
    '& .MuiInputBase-root': {
        fontSize:'1.7rem',
        color: pink[900],
    },
    '& .MuiInput-underline:before':{
        borderRadius:5,
        border:'1px solid blue',
        paddingBottom:30,
        borderColor: pink[200],
        
    },
    '& .MuiInput-underline:after':{
        borderColor: pink[300],
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderColor: pink[100],
      },
    '& .MuiNativeSelect-select:focus':{
        backgroundColor: 'transparent'
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
    const isSmall = useMediaQuery({query:'(max-width:567px)'})
    const isMediumLong = useMediaQuery({ query: '(max-width: 1300px)' })


    const [userData, setUserData] = useState({
        nombre:"",
        email:"",
        rut:"",
        telefono:"",
        region:"",
        comuna:"",
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

    // useEffect(() => {
    //     setListaPedido(JSON.parse(window.localStorage.getItem('invitado')))
    //     props.updateLista()
    // }, [listaPedido])
    
    // const updateLista =()=>{
    //     setListaPedido(JSON.parse(window.localStorage.getItem('invitado')))
    // } 
    
    // let storage=JSON.parse(window.localStorage.getItem('invitado'));
    // if (!storage){
    //     storage=[]
    // }
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

    const RegionesYcomunas = {

        "regiones": [{
                "NombreRegion": "Arica y Parinacota",
                "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
        },
            {
                "NombreRegion": "Tarapacá",
                "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
        },
            {
                "NombreRegion": "Antofagasta",
                "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
        },
            {
                "NombreRegion": "Atacama",
                "comunas": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
        },
            {
                "NombreRegion": "Coquimbo",
                "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
        },
            {
                "NombreRegion": "Valparaíso",
                "comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
        },
            {
                "NombreRegion": "Región del Libertador Gral. Bernardo O’Higgins",
                "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
        },
            {
                "NombreRegion": "Región del Maule",
                "comunas": ["Talca", "Consitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
        },
            {
                "NombreRegion": "Región del Biobío",
                "comunas": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]
        },
            {
                "NombreRegion": "Región de la Araucanía",
                "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria", ]
        },
            {
                "NombreRegion": "Región de Los Ríos",
                "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
        },
            {
                "NombreRegion": "Región de Los Lagos",
                "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
        },
            {
                "NombreRegion": "Región Aisén del Gral. Carlos Ibáñez del Campo",
                "comunas": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
        },
            {
                "NombreRegion": "Región de Magallanes y de la Antártica Chilena",
                "comunas": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
        },
            {
                "NombreRegion": "Región Metropolitana de Santiago",
                "comunas": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltíl", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
        }]
    }
    const lookUp =(name)=>{
        for(let i=0;i<RegionesYcomunas.regiones.length;i++){
            if (RegionesYcomunas.regiones[i].NombreRegion===name){
                return RegionesYcomunas.regiones[i].comunas.sort(Intl.Collator().compare)
            }
        }
    }

    let cm=(lookUp(userData.region))
    let envio = 0 

      if (userData.region==='Región Metropolitana de Santiago'){
          if (userData.comuna=== ""||userData.comuna === cm[0]||userData.comuna === cm[1]||userData.comuna === cm[2]||userData.comuna === cm[5]||userData.comuna === cm[7]||userData.comuna ===cm[9]||userData.comuna ===cm[13]||userData.comuna === cm[19]||userData.comuna === cm[26]||userData.comuna === cm[27]||userData.comuna === cm[29]||userData.comuna === cm[30]||userData.comuna === cm[32]||userData.comuna === cm[34]||userData.comuna === cm[42]||userData.comuna === cm[44]||userData.comuna === cm[46]||userData.comuna === cm[48]||userData.comuna === cm[49]){
              console.log('demasiado lejos')
          }else{
              envio=3000
          }
      }
    //   console.log(RegionesYcomunas.regiones[2].NombreRegion)

        return (
        <div style={{display:'flex', flexDirection:'column'}}>
            {/* <HeroSwiper updateLista={updateLista}/> */}
            <div style={{height:'100%',paddingBottom:'6rem',minHeight:'800px', background:'linear-gradient(125deg, rgba(251,168,179,.6) 0%, rgba(254,228,232,.6) 100%)'}}>
                <h1 style={{textAlign:'center', margin:0, padding:'5rem'}}>DATOS PARA LA ENTREGA</h1>
                <div    className={isMediumLong?classes.rootMobile:classes.root}>
                    <Paper style={{ display:'flex', flexDirection:isMediumLong?'column':'row',minHeight:750,justifyContent:'space-between',background:'linear-gradient(180deg, rgba(255,247,250,1) 0%, rgba(255,235,241,1) 100%)', borderRadius:'19px', }}  elevation={9} >
                    <div style={{width:isMediumLong?'95%':'50%',margin:'27px auto', padding:isSmall?'0 0':'0 3rem'}}>
                        <h2 style={{textAlign:'center'}}>Completa el formulario para el envío</h2>
                    <form style={{display:'flex',flexDirection:'column',gap:17,height:'100%'}}className={classes.root2} noValidate autoComplete="off">
                        
                        <TextField inputProps={{style: {fontSize: 16}}}  InputLabelProps={{style: {fontSize: 15}}}  required={true} label="Nombre" variant="outlined" value={userData.name} onChange={(e)=> setUserData({...userData, nombre:e.target.value})}/>
                        <div>
                        <TextField inputProps={{style: {fontSize: 16}}}  style={{width:isSmall?'100%':'35ch'}} InputLabelProps={{style: {fontSize: 15}}} className={testMail? classes.sisisi:classes.nonono} required={true} label="Email" variant="outlined" value={userData.email} onChange={(e)=>validateEmail(e.target.value)} />
                        {!testMail?<p style={{height:0,padding:'0 5', marginBottom:17, color:'crimson'}}>Escriba un mail válido</p>:<></>}
                        </div>
                        <div style={{display:'flex',flexDirection:isSmall?'column':'row',justifyContent:'space-between', gap:isSmall?20:10, marginBottom:25}}>

                            <div>
                            <TextField inputProps={{maxLength: 12, style: {fontSize:isMobile?15:16, paddingLeft:isMobile?8:'auto', paddingRight:8,}}}  className={testRut? classes.sisisi:classes.nonono} InputLabelProps={{style: {fontSize: 15}}} style={{width:isSmall?'100%':'25ch'}} ref={inputRut}  onBlur={(e)=>puntosYGuion(e.target.value)} required={true} label="RUT" variant="outlined" value={userData.rut} onChange={(e)=>validateRut(e.target.value)}  />
                            {!testRut?<p style={{height:0,padding:'0 5', marginBottom:17,color:'crimson'}}>Escriba un RUT válido</p>:<></>}
                            </div>
                            <TextField inputProps={{style: {fontSize:isMobile?15:16}}}  InputLabelProps={{style: {fontSize: 15}}} style={{width:isSmall?'100%':'25ch'}} required={true} label="Teléfono" variant="outlined" onChange={(e)=> setUserData({...userData, telefono:e.target.value})} />
                        </div>
                        
                        <NativeSelect required={true} style={{marginBottom:15}}inputProps={{style:{fontSize:15, paddingBottom:18, paddingLeft:16}, /*MenuProps: {disableScrollLock: true}*/}} id="select" label="Región" value={userData.region} onChange={(e)=> setUserData({...userData, region:e.target.value})}>
                        <option disabled value="">Región</option>
                        {RegionesYcomunas.regiones.map((name) => (
                        <option key={name.NombreRegion} value={name.NombreRegion}>
                        {name.NombreRegion}
                        </option>
                        ))}
                        </NativeSelect>
                        {userData.region? 
                        <NativeSelect inputProps={{style:{fontSize:15, paddingBottom:18, paddingLeft:16}, /*MenuProps: {disableScrollLock: true}*/}} id="select" label="Región" value={userData.comuna} onChange={(e)=> setUserData({...userData, comuna:e.target.value})}>
                        <option disabled value="">Comuna</option>
                        {lookUp(userData.region).map((name) => (
                        <option key={name} value={name}>
                        {name}
                        </option>
                        ))}
                        </NativeSelect>:<></>}
            
                        <TextField inputProps={{style: {fontSize: 16}}}  InputLabelProps={{style: {fontSize: 15, paddingBottom:10}}} required={true} label="Dirección" variant="outlined" onChange={(e)=> setUserData({...userData, direccion:e.target.value})} />
                        {envio!==0?<p></p>: userData.region==='Región Metropolitana de Santiago'?<p style={{ width:'80%', margin:'1rem auto', fontSize:'1em'}}>Envíos fuera de santiago urbano por pagar en Starken</p>:<p style={{ width:'80%', margin:'1rem auto', fontSize:'1em'}}>Envíos fuera de santiago por pagar en Starken</p>}

                        <Button style={{padding:'1em', background:'pink',fontSize:'1.3em',margin:'auto', textAlign:'center'}}>Pagar ${numberWithDots(sumaPrecios+envio)}</Button>
                        <div style={{height:'50px'}}></div>

                    </form>
                    </div>
                    {isMediumLong?  <hr style={{background:'white', width:'90%', borderColor:'pink'}}></hr>:<hr style={{background:pink[50],height:'80%', width:'4px', borderRadius:'5px',borderColor:pink[50], margin:'auto'}}></hr>}
                  
                    <div className={classes.scrollbar} style={{background:'transparent',height:'100%',overflowY:'scroll', width:isMediumLong?'80%':'50%', margin:'auto'}}>
                        <h2 style={{textAlign:'center',paddingTop:27}}>Detalle Compra</h2>
                {intersection.map((post)=>(
                    <Grid style={{ width:'80%', margin:'2rem auto'}}  key={post._id} item >
                    <DetalleCompra post={post} storage={listaPedido}/>
                    </Grid>
                ))}  
                <p style={{ width:'80%', margin:'1rem auto', fontSize:envio!==0?'1.5em':'2em'}} >Total: {numberWithDots(sumaPrecios)}</p>    
                {envio!==0?<p style={{ width:'80%', margin:'1rem auto', fontSize:'1.5em'}} >Envío: {numberWithDots(envio)}</p>: userData.region==='Región Metropolitana de Santiago'?<p style={{ width:'80%', margin:'1rem auto', fontSize:'1em'}}>Envíos fuera de santiago urbano por pagar en Starken</p>:<p style={{ width:'80%', margin:'1rem auto', fontSize:'1em'}}>Envíos fuera de santiago por pagar en Starken</p>}
                {envio!==0?<p style={{ width:'80%', margin:'2rem auto', fontSize:'2em'}} >Total: {numberWithDots(sumaPrecios+envio)}</p>:<></>}
                <div style={{height:'50px'}}></div>

                </div> 
                    </Paper>
                </div>
           
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Users







