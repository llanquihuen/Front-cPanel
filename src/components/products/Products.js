import React from 'react'
import {useSelector} from 'react-redux'
import {Grid, CircularProgress} from '@material-ui/core'


// import ProductDetalle from './product/ProductDetalle'
import ProductPortada from './product/ProductPortada'

const Products = ({setCurrentId}) => {
    
    const posts = useSelector((state) => state.posts) //posts por .reducer/index.js
    console.log("posts")
    console.log(posts)
    // console.log(setCurrentId)
   
    return (

        !posts.length ? <CircularProgress /> :(
            <div style={{paddingTop:30}}>
            <Grid style={{width:'100%', boxShadow:'10 10 10 black'}} container justify='space-around' alignItems="center" spacing={0}>
                {posts.map((post)=>(
                    <Grid  key={post._id} item xs={6} sm={6} md={4} lg={3}>
                    <ProductPortada style={{justifySelf:'center', width:'100%'}}  post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
           
            </Grid>
            </div>
        )
    );
};
export default Products
