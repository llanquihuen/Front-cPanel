import axios from "axios"
import myConfig from "../../config";


// const url ='https://sakuranboshodo.cl/test2/products';
const url =`${myConfig.urlBack}products`;
const url2 =`${myConfig.urlBack}clientes`;
const url3 =`${myConfig.urlBack}compras`;



const getToken = {headers:{authorization: localStorage.getItem("token")}  //esto es para el middle (AuthToken)
}

export const fetchPosts = () => axios.get(url, getToken);

export const createPost = (newProduct) => axios.post(url, newProduct,getToken);
export const updatePost = (id, updateProduct)=> axios.patch(`${url}/${id}`,updateProduct,getToken);
export const deletePost = (id) => axios.delete(`${url}/${id}`,getToken);


//CLIENTES
export const fetchClientes = () => axios.get(url2, getToken);
//COMPRAS
export const fetchCompras = ()=> axios.get(url3, getToken)


// export const createUser = (newProduct) => axios.post(url2, newProduct,getToken);
// export const updateUser = (id, updateProduct)=> axios.patch(`${url2}/${id}`,updateProduct,getToken);
// export const deleteUser = (id) => axios.delete(`${url2}/${id}`,getToken);
 
 


