import React, {useEffect, useState} from 'react';
import axios from 'axios';

const PostCompra = () => {
    let url = "http://localhost:5000/clientes";
    let url2 = "http://localhost:5000/compras";
    const getToken = {headers:{authorization: localStorage.getItem("token")} } //esto es para el middle (AuthToken)

    const [dataCliente, setDataCliente] = useState([])
    const [dataCompra, setDataCompra] = useState([])
    const getCliente = () => axios.get(url, getToken).then(
        resp =>{setDataCliente(resp.data)}
    )
        useEffect(() => {
            getCliente()
    }, [])

    const getCompra = () => axios.get(url2, getToken).then(
        resp =>{setDataCompra(resp.data)}
    )
        useEffect(() => {
            getCompra()
    }, [])

    console.log(dataCompra)
    console.log(dataCliente)

    // dataCompra.map((x)=>(console.log(x.detalleCompra )))

    return (
        <div>
            <h1>Compras</h1>
                {dataCompra.map((dat)=>(<li key={dat._id}>RutCompra: {dat.idCliente} --  Direccion: {dat.direccion}<br/>  compra{dat.detalleCompra}<hr/></li>
                ))}
        </div>
    )
}

export default PostCompra
