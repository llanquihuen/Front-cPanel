import axios from "axios"


// const url ='https://sakuranboshodo.cl/test2/products';
const url ='http://localhost:5000/products';

export const fetchPosts = () => axios.get(url);

export const createPost = (newProduct) => axios.post(url, newProduct);
export const updatePost = (id, updateProduct)=> axios.patch(`${url}/${id}`,updateProduct);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
 