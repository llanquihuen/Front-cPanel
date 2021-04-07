import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux';

import Form from './components/form/form'
import {getPosts} from './components/redux/actions'

import './App.css';
import Posts from './components/posts/posts';

function App() {

  const [currentId, setCurrentId] = useState(null)

  const dispatch = useDispatch();
  const logOut = () =>{
    localStorage.removeItem("token");
    window.location.href='./loginproductos'
}
  useEffect(() => {
      dispatch(getPosts())  ////////2* action->UseEffect ->reducer 
  }, [currentId, dispatch])
  // console.log(currentId)
  return (
    <div className="App">
      <button className={'btns-post'} style={{position:'absolute',top:5,right:10,background:'pink',color:'black',fontSize:'calc(10px + 1.2vmin)'}} onClick={logOut}>Cerrar Sesion</button>
      <header className="App-header">
        <p style={{paddingTop:50}}>Base de Datos de los Productos de la tienda </p>
        Te amo mucho! 

       <br/>
       <br/>
       
       {/* <DragAndDrop id="FileUpload" /> */}
       
       <Form currentId={currentId} setCurrentId={setCurrentId}/>
       <br></br>
       <hr />
        <Posts setCurrentId={setCurrentId}/>
        <hr />
       </header>
    </div>
  );
}

export default App;
