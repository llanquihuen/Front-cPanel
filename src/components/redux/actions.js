import {FETCH_ALL, CREATE, UPDATE, DELETE} from './constants'
import * as api from '../api/api_index';

//Action Creators ////////////1* ACCION-USE_EFFECT-REDUCER sigue en App.js
export const getPosts = () => async (dispatch) => {     //async thunk porque fetch se demora :)
    try {
        console.log("action-Fetch")
        const {data} = await api.fetchPosts();
        console.log(data)
        dispatch({                      //dispatch en vez de return por lo asincrono
            type:FETCH_ALL,
            payload: data});            //el payload se lleva a reducers para que ejecute la acción
    } catch (error) {
        console.log(error.message)
    }
    

}

export const createPost = (post) => async (dispatch) => {
    try {
        console.log("action-create")
        console.log(post)
        let data = await api.createPost(post)
        let id = data.data.data.insertId;
        data=JSON.parse(data.config.data)
        data._id=id
        console.log(data)
        dispatch({type:CREATE, payload: data})
    } catch (error) {
        console.log(error.message)

    }

}

export const updatePost = (id,post) => async (dispatch) => {
    try {
        console.log("action-update")
        // console.log(post)
        let data = await api.updatePost(id, post);
        console.log(data)
        data=JSON.parse(data.config.data)
        console.log(data)
        dispatch ({type: UPDATE, payload:data})
    } catch (error) {
        console.log(error+" action-update")
        
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch ({type: DELETE, payload:id})

    } catch (error) {
        console.log(error)

    }
}