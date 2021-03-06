import React,{useState,useEffect} from 'react'
import { TextField, Button, Typography, Container} from '@material-ui/core'
import axios from 'axios'
import { createMuiTheme,ThemeProvider} from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';


import imagenCamila from './views/images/logo.png'
import myConfig from './config';



const baseUrl=`${myConfig.urlBack}auth/login`;
// const baseUrl="https://organizarclientes-github.herokuapp.com/auth/login";


const Login = () => {

    // React.useEffect(() => {
    // if (localStorage.getItem("token")){
    //     window.location.href='./app'
    // }
    // }, [])
    const [datos, setDatos] = useState({
            username:"",
            password:""

    })
    const [unerror, setUnerror] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        document.title = "Login - Lorem Ipsum "

    }, [])


    // useEffect(() => {
    //     console.log(datos)
    //     }, [datos])

    const currentTime = Date.now() /1000

    const iniciarSesion= async(dat)=>{
        setLoading(true)
        await axios.post(baseUrl,{username:dat.username, password: dat.password})
        .then(res=>{
            setLoading(false)
            console.log(res.data.data)
            window.location.href="./loginproductos"
            if(res.data.data.token){
            localStorage.setItem("token", "Bearer "+ res.data.data.token )
            localStorage.setItem("timeToken", currentTime)
            
            // localStorage.setItem("photo", res.data.data.photo )
            // localStorage.setItem("id",res.data.id)

            }

        }).catch(error=>{
            setLoading(false)
            setUnerror(true)
            console.log(error);
        })
    }


    if(document.getElementById("inputPass")){
        const input = document.getElementById("inputPass");
        input.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("botonLogin").click();
            }
        });
    }
   const theme = createMuiTheme({
  palette: {
    primary: pink,
  },
});

if (window.location.host=== 'sakuranboshodo.cl'
|| window.location.host === 'www.sakuranboshodo.cl'){
    var isLocal = false
}else{
    isLocal = true;
}
    return (
        <div style={{padding:'0',margin:0,background:'#ecc',height:'100vh',display:'flex', alignItems:'center'}} >
               <Container style={{position:'relative',background:'rgba(255,255,255,.8)',height:'80vh',borderRadius:20, boxShadow:'10px 10px 5px #9D5C5C66'}}  maxWidth="sm">
            <div style={{position:'relative',height:'80vh',minHeight:400,display:'flex', flexDirection:'column',justifyContent:'space-around',alignItems:'center'}} >
                <img src={imagenCamila} style={{height:'30%'}} alt="logo"/>
                <Typography style={{marginBottom:20,color:'darkred'}} variant="h6">Inicia Sesi??n</Typography>
                      <ThemeProvider theme={theme}>



                <TextField style={{marginBottom:20}} name="username" variant="outlined" label="Nombre" fullWidth  onClick={(e)=> setDatos ({...datos, username:e.target.value}) }    onChange={(e)=> setDatos ({...datos, username:e.target.value})}/>
                <TextField id="inputPass" style={{marginBottom:20}} name="password" variant="outlined" type='password' label="Password" fullWidth  onChange={(e)=> setDatos ({...datos, password:e.target.value })}/>
                      </ThemeProvider>
                            <div>{!loading&&isLocal? "Usuario: luis1 - Contrase??a: lalala": ""}</div>
                            <div>{loading? "Espere un momento...": " "}</div>
                            <div>{unerror? "Contrase??a o usuario incorrecto": " "}</div>
                <Button id="botonLogin" style={{background:'crimson', color:'snow'}} variant="contained" color="primary" size="large"  onClick={()=>iniciarSesion(datos)} fullWidth>Aceptar</Button>

           </div>
           </Container>

        </div>
    )
}

export default Login