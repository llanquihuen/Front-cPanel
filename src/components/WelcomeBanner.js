import React from 'react'

const WelcomeBanner = () => {


    return (
        <div style={{textAlign:'center' ,background:'pink', height:'100px', color:'#555', display:'flex', alignItems:'center', justifyContent:'center',fontSize:"calc(16px + 6 * ((100vw - 320px) / 680))", textTransform:'uppercase', fontWeight:'bolder', fontFamily:'sans-serif'}}>
            Bienvenido a sakuranbo.shodo_store
        </div>
    )
}

export default WelcomeBanner
