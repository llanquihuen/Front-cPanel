import React from 'react'
import {useSelector} from 'react-redux'
import {Route} from 'react-router-dom'

import Products from './Products'
import Details from './product/ProductDetalle'


const SeccionProductos = () => {
   
    return (
        <div>
            <Route path='/products' component={Products}></Route>
            <Route path='/products/:_id' component={Details}></Route>
        </div>
    )
}

export default SeccionProductos
