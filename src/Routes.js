import React,{useState, useEffect} from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {getPosts} from './components/redux/actions'
import Login from './Login'
import App from './App'
import Tienda from './Tienda'
import NotFound from './NotFound'
import Users from './components/users/Users'
// import Products from './components/products/Products'
import Details from './components/products/product/ProductDetalle2'

const Routes = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts())  ////////2* action->UseEffect ->reducer 
    }, [currentId, dispatch])
    let direccion = Login

        if (!localStorage.getItem("token")){
            direccion=Login
        }else{
            direccion=App
        }

        if (window.location.host=== 'sakuranboshodo.cl'
        || window.location.host === 'www.sakuranboshodo.cl'){
            var theBaseName = '/store2'
        }else{
            theBaseName='/'
        }
    return (
    <BrowserRouter>
        <Switch>
            <Route exact path='/loginproductos' component={direccion}/>
            <Route path={theBaseName} component={Tienda}/>
            <Route component={NotFound}/>

        </Switch>
    </BrowserRouter>
    )
}

export default Routes
