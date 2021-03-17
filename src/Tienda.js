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

    
  return (

    <div className="styleApp">
        <HeroSwiper />
        <Products setCurrentId={setCurrentId}/>
        <Footer />
        
    </div>
  );
}

export default Tienda;
