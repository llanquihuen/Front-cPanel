import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

// const url = 'http://localhost:5000/'
// const Gallery = ({post, setCurrentId}) => {

const images =  ({post, setCurrentId}) => [
{
  original: 'https://picsum.photos/id/1018/1000/600/',
  thumbnail: 'https://picsum.photos/id/1018/250/150/',
},
{
  original: 'https://picsum.photos/id/1015/1000/600/',
  thumbnail: 'https://picsum.photos/id/1015/250/150/',
},
{
  original: 'https://picsum.photos/id/1019/1000/600/',
  thumbnail: 'https://picsum.photos/id/1019/250/150/',
},
];


class MyGallery extends React.Component {
render() {
  return (
    <div style={{justifySelf:'center', background:'red', border:'2px black solid'}} >
      <ImageGallery items={images} showPlayButton={false} />
    </div>
  )}
}
export default MyGallery;