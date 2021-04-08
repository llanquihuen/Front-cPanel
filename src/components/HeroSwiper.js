import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import { Swiper, SwiperSlide,  } from 'swiper/react';
import SwiperCore, {Autoplay} from 'swiper';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from 'react-responsive';



import 'swiper/swiper-bundle.css';
import { pink } from '@material-ui/core/colors';

import {ShoppingCart,ShoppingCartOutlined} from '@material-ui/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faDoorOpen, faShoppingCart} from '@fortawesome/fontawesome-free-solid'


import './swiper.css'
import slide1 from '../views/images/1.jpg'
import slide2 from '../views/images/2.jpg'
import slide3 from '../views/images/3.jpg'
import logo from '../views/images/logo.png'
// import Sidebar from './Sidebar.js';
import ProductSideCarrito from './products/product/ProductSideCarrito'

SwiperCore.use([Autoplay]);
const useStyles = makeStyles({
    list: {
      minWidth:250,
      width: '35vw',
      height:'100%',
      borderLeft:'2px solid #777',
      maxWidth:500,
      background:'rgb(252, 235, 235)',
      
    },
    fullList: {
      width: 'auto',
        
    },
  });

const HeroSwiper = (este) => {
    const isFold = useMediaQuery({ query: '(max-width: 320px)' })

    // const [storage, setStorage] = useState([])
    let storage=este.lista;
    // if (!storage){
    //     storage=[]
    // }
    // console.log(storage.length)

    const posts = useSelector((state) => state.posts) //posts por .reducer/index.js
    // console.log(posts)
    const nums = storage.map(item=>{return item._id}) // nums = [18,19,20]

    let intersection = posts.filter(el=> nums.includes(el._id))
    console.log(intersection)

    function numberWithDots(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}

    const classes = useStyles();
    const [state, setState] = useState({right: false});
    const anchor='right'
    const toggleDrawer = (anchor, open) => (event) => {
    //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //     return;
    //   }
  
      setState({ ...state, [anchor]: open });
    };
    // console.log(este)

    //QUE CALCULE EL PRECIO----------------------------
    const preciosCantidad = intersection.map((post)=>{ 
        // eslint-disable-next-line eqeqeq
        let store = storage.filter(el=> el._id==post._id)
        return post.price * store[0].cantidad})

    const sumaPrecios = preciosCantidad.reduce((a,b)=> a+b,0)
    console.log(sumaPrecios)


    const list = (anchor) => (
      <div
        className={clsx(classes.list)}
        role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        
      >
       <h1 style={{textAlign:'center', margin:0,paddingBlockStart:'0.9em',paddingBlockEnd:'0.67em', background:'black',color:'whitesmoke'}}>Carrito</h1>
            <Grid style={{width:'100%',display:'flex',flexDirection:'column',paddingTop:'1em', alignContent:'space-between', borderTop:'3px solid #777'}} container spacing={0}>
                {intersection.map((post)=>(
                    <Grid style={{ width:'100%'}}  key={post._id} item >
                    <ProductSideCarrito post={post} storage={storage} este={este}/>
                    </Grid>
                ))}
           
            </Grid>
            <div style={{display:'flex',flexDirection:'column', justifyContent:'space-between',margin:'1em'}}>
                <h1>Total: ${numberWithDots(sumaPrecios)} </h1>
                
                <Button href='/store2/invitado' style={{padding:'1em', background:'pink',fontSize:'1.3em',margin:'1em', textAlign:'center'}}>Finalizar compra</Button>
            </div>
            
      </div>
    );

    return (<>
        <Swiper 
            speed={2000}
            spaceBetween={0}
            centeredSlides={true}
            loop={true}
            autoplay={{delay:5000,disableOnInteraction:false}}
            // onInit={(swiper)=>{
                //   let activo = swiper.slides[swiper.activeIndex]
            //   activo.classList.add("sli-zoom")
            //   console.log(activo)
            // }}
            // onSlideChange={(swiper)=>{
                //   let activo = swiper.slides[swiper.activeIndex]
            //   let previo = swiper.slides[swiper.previousIndex]
            //   console.log(activo)
            //   activo.classList.add("sli-zoom")
            //   previo.classList.remove("sli-zoom")
            // }}
            >
            <SwiperSlide>
            <img src={slide1} alt="slide1" />
            </SwiperSlide>
    
            <SwiperSlide>
            <img src={slide2} alt="slide2" />
            </SwiperSlide>
    
            <SwiperSlide>
                <img src={slide3} alt="slide3" />
            </SwiperSlide>
        </Swiper>
            <div className="cover"></div>
        <div className="top-header">
            <img src={logo} alt="Logo" />


        </div>
        <div className="barra">
            <div>
                <a style={{fontStyle:'italic',color:'#ffdddd',fontSize:isFold?'12px':"16px"}}href="/store2/">sakuranbo.shodo_store </a>
            </div>
            <div className="barra-flex-der">
                <div className="iconos carroIcono">
            <React.Fragment key={anchor}>
            <SwipeableDrawer BackdropProps={{style: {backgroundColor: '#ffffff33'}}} style={{opacity:'98%',backdropFilter:'blur(1px)'}} anchor={anchor} open={state[anchor]} onOpen={toggleDrawer(anchor, true)} onClose={toggleDrawer(anchor, false)}>{list(anchor)}</SwipeableDrawer>
            <Button style={{border:'2px solid pink', width:'8rem'}} onClick={toggleDrawer(anchor, true)}>
                    {/* <FontAwesomeIcon style={{fontSize:'30px',color:'#ffdddd'}} icon={faShoppingCart} /> */}
                    {storage.length>0? <ShoppingCart style={{ color: pink[100],fontSize:40 }} />:<ShoppingCartOutlined style={{ color: pink[50],fontSize:40 }}/>}

                    {!storage.length>0?<p className="littleNumber" style={{background:'transparent'}}>{storage.length}</p>:<p className="littleNumber">{storage.length}</p>}
            </Button>
            </React.Fragment>
                </div>
            {/* <div className="iconos">
                <a href="sign_in.html"><FontAwesomeIcon icon={faDoorOpen} /> </a>
                <p>Registrarse</p>
            </div> */}
            </div>
        </div>
        </>
    )
}

export default HeroSwiper
