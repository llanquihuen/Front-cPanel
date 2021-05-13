import {combineReducers} from 'redux';

import {posts} from './reducers';
import {clientes} from './reducers';
import {compras} from './reducers';



export default combineReducers({
    posts:posts,
    clientes:clientes,
    compras:compras
});
