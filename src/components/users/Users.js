import React from 'react'
import HeroSwiper from '../HeroSwiper';
import Footer from '../Footer';

import { makeStyles } from '@material-ui/core/styles';
import {pink} from '@material-ui/core/colors'
import {Paper,TextField} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: 'auto',
        width:'80vw',
        maxWidth: '1000px',
        minWidth:'270px',
        height: '80vh',
        minHeight:'450px',
      },
    },
    root2: {
        height:'70vh',
        // background:pink[50],
        display:'flex',
        flexDirection:'column',

        '& > *': {
          margin: ' 3rem auto',
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
                borderColor: pink[500],
              },
              '&.Mui-focused fieldset': {
                borderColor: pink[200],
            },
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform:'translate(7px,-15px) scale(.85)'
        }

    },
  }));
  

const Users = () => {
    const classes = useStyles();

    const puntosYGuion =(x)=> {
        if(!x.includes("-"||"‐")) x= x.slice(0,-1)+"-"+x.slice(-1);
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    const soloGuion = (x)=>{
        if(!x.includes("-"||"‐")) x= x.slice(0,-1)+"-"+x.slice(-1);
        return x.replace(/\./g,"")
    }
        
            
    let numero="16130337-2"
    console.log(soloGuion(numero))
    
    var Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X"
        validaRut : function (rutCompleto) {
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
                return false;
            var tmp 	= rutCompleto.split('-');
            var digv	= tmp[1]; 
            var rut 	= tmp[0];
            if ( digv == 'K' ) digv = 'k' ;
            return (Fn.dv(rut) == digv );
        },
        dv : function(T){
            var M=0,S=1;
            for(;T;T=Math.floor(T/10))
                S=(S+T%10*(9-M++%6))%11;
            return S?S-1:'k';
        }
    }
    console.log( Fn.validaRut(soloGuion(numero)) ? 'Valido' : 'inválido');
    return (
        <>
            <HeroSwiper/>
            <div style={{height:'120vh',minHeight:'600px', background:'linear-gradient(125deg, rgba(251,168,179,.6) 0%, rgba(254,228,232,.6) 100%)'}}>
                <h1 style={{textAlign:'center', margin:0, padding:'5rem'}}>Pagina para Ingresar Usuarios</h1>
                <div    className={classes.root}>
                    <Paper style={{background:'linear-gradient(180deg, rgba(255,243,247,1) 0%, rgba(255,230,241,1) 100%)', borderRadius:'19px'}}  elevation={9} >
                        <h3 style={{textAlign:'center', }}>Completa el formulario para el envio</h3>
                    <form className={classes.root2} noValidate autoComplete="off">
                        
                        <TextField inputProps={{style: {fontSize: 16}}}  InputLabelProps={{style: {fontSize: 15}}} required={true} label="Nombre" variant="outlined" />
                        <TextField inputProps={{style: {fontSize: 16}}}  InputLabelProps={{style: {fontSize: 15}}} required={true} label="RUT" variant="outlined" />
                        <TextField inputProps={{style: {fontSize: 16}}}  InputLabelProps={{style: {fontSize: 15}}} required={true} label="Email" variant="outlined" />
                        <TextField inputProps={{style: {fontSize: 16}}}  InputLabelProps={{style: {fontSize: 15}}} required={true} label="Dirección" variant="outlined" />
                        <TextField inputProps={{style: {fontSize: 16}}}  InputLabelProps={{style: {fontSize: 15}}} required={true} label="Teléfono" variant="outlined" />

                    </form>
                    </Paper>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Users







