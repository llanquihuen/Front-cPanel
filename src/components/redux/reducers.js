//////3* action-UseEffect-reducer
import {FETCH_ALL, CREATE, UPDATE, DELETE,FETCH_ALL_C,FETCH_ALL_CO} from './constants'

// eslint-disable-next-line import/no-anonymous-default-export
export const posts = (posts = [], action) => {    //era una arrow function, pero al exportarla se hizo funcion anonima
    console.log("Reducer")
    switch (action.type){
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
            return posts.map((post)=> (post._id === action.payload._id ? action.payload : post))
        case DELETE:
            return posts.filter((post) => post._id !== action.payload)
        default:
            return posts
    }
}

export const clientes = (clientes = [], action)=>{
    switch (action.type){

    case FETCH_ALL_C:
        // console.log(action.payloadCliente)
        return action.payloadCliente
        default:
                return clientes
    }
}

export const compras = (compras = [], action)=>{
    switch (action.type){

    case FETCH_ALL_CO:
        // console.log(action.payloadCompras)
        return action.payloadCompras
        default:
                return compras
    }
}
