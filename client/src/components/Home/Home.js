import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Grow, Grid} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import  Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';
const Home = () => {

    const [ currentId , setCurrentId ] = useState(0);
    const  dispatch  =useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

  return (
    <Grow in>
        <Container>
          <Grid
          container
          justifyContent='space-between' 
          alignItems='stretch'
          spacing={4}
          >
            {/* container for holding post */ }

            <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId}/>
            </Grid>
            
            {/* container for holding From to add post */}

            <Grid item xs={12} sm={4}>
                <Form 
                currentId={currentId} 
                setCurrentId={setCurrentId} />
            </Grid>

          </Grid>
        </Container>
      </Grow>
  )
}

export default Home