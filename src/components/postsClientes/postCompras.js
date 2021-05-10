import React, {useEffect, useState} from 'react';
import axios from 'axios';

const PostCliente = () => {
    let url = "http://localhost:5000/clientes";
    const getToken = {headers:{authorization: localStorage.getItem("token")} } //esto es para el middle (AuthToken)

    const [data, setData] = useState([])
    const getCliente = () => axios.get(url, getToken).then(
        resp =>{
            setData(resp.data)
        }
        )
        useEffect(() => {
            getCliente()
    }, [])


    return (
        <div>
            <h1>Clientes</h1>
                {data.map((dat)=>(<li key={dat._id}>Nombre: {dat.nombre} --  Email: {dat.email} </li>
                ))}
        </div>
    )
}

export default PostCliente
