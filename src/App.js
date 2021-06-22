import React, {useState, useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux';

import Form from './components/form/form'
import {getPosts} from './components/redux/actions'

import './App.css';
import Posts from './components/posts/posts';
import PostCompra from './components/postsClientes/postCompra'

function App() {
  const [currentId, setCurrentId] = useState(null)

  const dispatch = useDispatch();
  const logOut = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("timeToken");

    window.location.href='./loginproductos'
}
  useEffect(() => {
      dispatch(getPosts())  ////////2* action->UseEffect ->reducer 
  }, [currentId, dispatch])
  // console.log(currentId)




  //Time-out Token

  const currentTime = Date.now() /1000

  if (localStorage.getItem("timeToken")){

  if ((localStorage.getItem("timeToken"))<(currentTime-3600*1)){
      localStorage.removeItem("timeToken")
      localStorage.removeItem("token")
      localStorage.removeItem("photo")

      window.location.href='./'
  }}

  // if (!localStorage.getItem("timeToken")){
  //     localStorage.setItem("timeToken", currentTime)
  // }


  //Log-Out Timer
  
  const timeLeft = (localStorage.getItem("timeToken")-currentTime+3600*1)
  if(localStorage.getItem("timeToken")){
    window.setTimeout(logOut, timeLeft*1000);
  }

   // Cuenta Regresiva useState + useRef + useEffect
  const [num, setNum] = useState(timeLeft);
  
  const decreaseNum = () => setNum((prev) => prev - 1);
  
  let intervalRef = useRef();
  
  
  useEffect(() => {
      intervalRef.current = setInterval(decreaseNum, 1000);
      return () => clearInterval(intervalRef.current);
  }, []);

  // Configuracion HH:MM:SS de cuenta regresiva  
  let hours = Math.floor(num/3600);
  let minutes = Math.floor(Math.floor(num) % 3600 /60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
  });
  let seconds = Math.floor(Math.floor(num) % 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
  })
  let countdown = `${hours}:${minutes}:${seconds}`

  return (
    <div className="App">
      <button className={'btns-post'} style={{height:40 ,paddingTop:'5px',position:'absolute',top:5,right:10,background:'pink',color:'black',fontSize:'calc(10px + 1.2vmin)'}} onClick={logOut}>Cerrar Sesion <p style={{marginTop:20}}>Tiempo restante:  {countdown}</p></button>
      
      <header className="App-header">
        <p style={{padding:'50px 0', fontWeight:'bolder', color:'#555'}}>Base de Datos de los Productos de la tienda </p>
        {/* Te amo mucho!  */}

       <br/>
       <br/>
       
       {/* <DragAndDrop id="FileUpload" /> */}
       
       <Form currentId={currentId} setCurrentId={setCurrentId}/>
       <br></br>
       <hr />
        <Posts setCurrentId={setCurrentId}/>
        <hr />
       </header>
       <PostCompra></PostCompra>
    </div>
  );
}

export default App;
