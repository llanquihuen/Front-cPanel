import './styleApp.css';
import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {BrowserRouter,Switch,Route} from 'react-router-dom';


import {getPosts} from './components/redux/actions'
import HeroSwiper from './components/HeroSwiper'
import Welcome from './components/WelcomeBanner'
import Footer from './components/Footer'

import Login from './Login'
import App from './App'
import Products from './components/products/Products'
import NotFound from './NotFound'
import Users from './components/users/Users'
// import Products from './components/products/Products'
import Details from './components/products/product/ProductDetalle2'

function Tienda() {
  if (!window.localStorage.getItem('invitado')){
    window.localStorage.setItem('invitado','[]')
}
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts())  ////////2* action->UseEffect ->reducer 
    }, [currentId, dispatch])
    // eslint-disable-next-line no-unused-vars
    const [listaPedido, setListaPedido] = useState(JSON.parse(window.localStorage.getItem('invitado')))
    // if (listaPedido===null){
    //   setListaPedido((window.localStorage.setItem('invitado','[]')))
    // }
    const updateLista =()=>{
        setListaPedido(JSON.parse(window.localStorage.getItem('invitado')))
    } 
    
    
    let direccion = Login

        if (!localStorage.getItem("token")){
            direccion=Login
        }else{
            direccion=App
        }

    console.log(currentId)
  return (

    <div className="styleApp">
      <BrowserRouter basename="/store2">
      <Switch>
            <Route exact path='/' render={()=>
            <>
            <HeroSwiper updateLista={updateLista} lista={listaPedido}/>
            <Welcome />
            <Products />
            </>
            }/>

            <Route path='/products/:_id' render={(routerProps)=>
            <>
                <HeroSwiper updateLista={updateLista} lista={listaPedido}/>
                <Details {...routerProps} updateLista={updateLista} lista={listaPedido}/>
            </>
            }/>
            <Route path='/invitado' render={(routerProps)=>
            <>
                <HeroSwiper updateLista={updateLista} lista={listaPedido}/>
                <Users {...routerProps} updateLista={updateLista} lista={listaPedido}/>
            </>
            }/>
            
            <Route path='/loginproductos' component={direccion}/>
            {/* Not Found tiene que ir al ultimo */}
            <Route path="" component={NotFound}/>

        </Switch>
      </BrowserRouter>
      <Footer />

      {/* <Route component={NotFound}/> */}

    </div>
  );
}

export default Tienda;
