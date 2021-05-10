import axios from "axios"


// const url ='https://sakuranboshodo.cl/test2/products';
const url ='http://localhost:5000/products';
const url2 ='http://localhost:5000/clientes';


const getToken = {headers:{authorization: localStorage.getItem("token")}  //esto es para el middle (AuthToken)
}

export const fetchPosts = () => axios.get(url, getToken);

export const createPost = (newProduct) => axios.post(url, newProduct,getToken);
export const updatePost = (id, updateProduct)=> axios.patch(`${url}/${id}`,updateProduct,getToken);
export const deletePost = (id) => axios.delete(`${url}/${id}`,getToken);


//CLIENTES
export const fetchClientes = () => axios.get(url2, getToken);

// export const createUser = (newProduct) => axios.post(url2, newProduct,getToken);
// export const updateUser = (id, updateProduct)=> axios.patch(`${url2}/${id}`,updateProduct,getToken);
// export const deleteUser = (id) => axios.delete(`${url2}/${id}`,getToken);
 
 


