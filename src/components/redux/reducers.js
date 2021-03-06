//////3* action-UseEffect-reducer
import {FETCH_ALL, CREATE, UPDATE, DELETE} from './constants'

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {    //era una arrow function, pero al exportarla se hizo funcion anonima
    console.log("Reducer")
    switch (action.type){
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            console.log(posts)
            return [...posts, action.payload];
        case UPDATE:
            return posts.map((post)=> (post._id === action.payload._id ? action.payload : post))

        case DELETE:
            return posts.filter((post) => post._id !== action.payload)
        default:
            return posts
    }
}