import React from 'react'
import sad from './views/images/sad.jpg'


const NotFound = () => {
    return (
        <div style={{display:'flex', justifyContent:'center', background:'#ffa6ab'}}>
            <h1 style={{position:'absolute', fontSize:"calc(16px + 16 * (100vw  / 680))",color:'#00000077'}}>Oops... la pagina no existe.</h1>
            <img style={{height:'90vh', width:'auto'}}src={sad} alt="Logo" />
        </div>
            )
}

export default NotFound
