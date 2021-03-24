import React,{useEffect, useState} from 'react'
import ImageGallery from 'react-image-gallery';
import { useMediaQuery } from 'react-responsive';
import './detalle.css'

const url = 'http://localhost:5000/'

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
        <div className={isMobile? 'mobile':'long-screen'}>

            {props.Product.imageLocation? 
            <div>
                  <ImageGallery  showThumbnails={!isMobile} showBullets={isMobile} items={Images} useBrowserFullscreen={false} showPlayButton={false} /> 
            </div>
            : 'Sin Imagen'}
        </div>
    )
}

export default ImageGalerryDetalle
