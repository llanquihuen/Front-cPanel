import React,{useEffect, useState} from 'react'
import ImageGallery from 'react-image-gallery';
import { useMediaQuery } from 'react-responsive';
import './detalle.css'

const url = 'https://sakuranboshodo.cl/test4/'

const ImageGalerryDetalle = (props) => {
    // console.log(props.Product.imageLocation)
    const isMobile = useMediaQuery({ query: '(max-width: 920px)' })
    // console.log(isMobile)

    const [Images, setImages] = useState([])

  useEffect(() => {
        if(props.Product.imageLocation && props.Product.imageLocation.length > 0){
            let images = [];
            // eslint-disable-next-line array-callback-return
            props.Product.imageLocation && props.Product.imageLocation.map(item =>{
                images.push({
                    original:`${url}${item}`,
                    thumbnail:`${url}thumb/thumbnails-${item.substring(8)}`,
                })
            })
            setImages(images)
        }
    }, [props])
    // console.log(Images)
    return (
        <div style={{height:'90%'}}className={isMobile? 'mobile':'long-screen'}>

            {props.Product.imageLocation? 
            <div style={{height:'100%', display:'flex', alignItems:'center'}} >
                  <ImageGallery   showThumbnails={!isMobile} showBullets={isMobile} items={Images} useBrowserFullscreen={false} showPlayButton={false} /> 
            </div>
            : <div style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center', margin:'auto'}}>Cargando...</div>}
        </div>
    )
}

export default ImageGalerryDetalle
