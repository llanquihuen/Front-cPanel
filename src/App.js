import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux';

import Form from './components/form/form'
import {getPosts} from './components/redux/actions'

import './App.css';
import Posts from './components/posts/posts';

function App() {
  const [currentId, setCurrentId] = useState(null)

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getPosts())  ////////2* action->UseEffect ->reducer 
  }, [currentId, dispatch])
  // console.log(currentId)
  return (
    <div className="App">
      <header className="App-header">
        <br/>
       Base de Datos de los Productos de la tienda <br/>Te amo mucho!
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
