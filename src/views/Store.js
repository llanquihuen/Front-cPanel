import React from 'react'
import { Swiper, SwiperSlide,  } from 'swiper/react';
import SwiperCore, {Autoplay} from 'swiper';
import 'swiper/swiper-bundle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen, faShoppingCart} from '@fortawesome/fontawesome-free-solid'


import slide1 from '../images/1.jpg'
import slide2 from '../images/2.jpg'
import slide3 from '../images/3.jpg'
import logo from '../images/logo.png'


SwiperCore.use([Autoplay]);



const HeroSwiper = () => {
    return (
        <div>
              <Swiper
      speed={1000}
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{delay:3500,disableOnInteraction:false}}
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
        <div className="barra">
            <div>
                <a href="index.html">Home</a>
            </div>
            <div className="barra-flex-der">
                <div className="iconos">
                <a href="carro.html"><FontAwesomeIcon icon={faShoppingCart} /> </a>
                <p>Carrito</p>
            </div>
            <div className="iconos">
                <a href="sign_in.html"><FontAwesomeIcon icon={faDoorOpen} /> </a>
                <p>Registrarse</p>
            </div>
            </div>
        </div>

            <img src={logo} alt="Logo" />

        </div>
        </div>
    )
}

export default HeroSwiper
