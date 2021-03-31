import './styleApp.css';
import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux';

import {getPosts} from './components/redux/actions'
import HeroSwiper from './components/HeroSwiper'
import Footer from './components/Footer'

import Products from './components/products/Products'

function Tienda() {

    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts())  ////////2* action->UseEffect ->reducer 
    }, [currentId, dispatch])
    // eslint-disable-next-line no-unused-vars
    const [listaPedido, setListaPedido] = useState(JSON.parse(window.localStorage.getItem('invitado')))

    const updateLista =()=>{
        setListaPedido(JSON.parse(window.localStorage.getItem('invitado')))
    } 

    console.log(currentId)
  return (

    <div className="styleApp">
        <HeroSwiper updateLista={updateLista}/>
        <Products setCurrentId={setCurrentId}/>
        <Footer />
        
    </div>
  );
}

export default Tienda;
