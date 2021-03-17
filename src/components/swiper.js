

export const swiperStyle = {
  
 swiperContainer :{
    width: '100%',
    height: '45vh',
  },
  swiperSlide: {
    textAlign: 'center',
    fontSize: '18px',
    background: '#fff',
    
    /* Center slide text vertically */
    
    display: 'flex',
    justifyContent: 'center',
    WebkitBoxAlign: 'center',
    MsFlexAlign: 'center',
    WebkitAlignItems: 'center',
    alignItems: 'center',
  },
  swiperSlideImg:{
    width: '100%',
    minHeight:'100%',
    objectFit: 'cover',
  },
  swiperSlideActive:{
        animation: 'slidezoom 6s ease-out',
    
    }
  }
  
  // @keyframes slidezoom {
  //     from {transform:(1,1)}
  //     to {transform:scale(1.1,1.1);}
  //     0% {filter: saturate(50%);}
  //     25%{filter:saturate(75%);}
  //     50% {filter: saturate(100%);}
  
  
  
  