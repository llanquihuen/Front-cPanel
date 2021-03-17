import axios from "axios"


// const url ='https://sakuranboshodo.cl/test2/products';
const url ='http://localhost:5000/products';
const getToken = {headers:{authorization: localStorage.getItem("token")}  //esto es para el middle (AuthToken)
}
export const fetchPosts = () => axios.get(url, getToken);

export const createPost = (newProduct) => axios.post(url, newProduct,getToken);
export const updatePost = (id, updateProduct)=> axios.patch(`${url}/${id}`,updateProduct,getToken);
export const deletePost = (id) => axios.delete(`${url}/${id}`,getToken);
 