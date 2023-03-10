import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { likePost, deletePost } from '../../../actions/posts';
import Styles from './Poststyle';
     
const Post = ({ post, setCurrentId }) => {

  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const classes = Styles();
    
  const user = JSON.parse(localStorage.getItem('profile'));
    
  const Likes = () => {
      if (post.likes.length > 0) {
        return post.likes.find((like) => like ===  user?.result?._id)

          ? (
            <>
            <ThumbUpAltIcon fontSize="small" />
            &nbsp;&nbsp;
            { post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ?'s' : ''}` 
            }
            </>

          ) : (
            <>
            <ThumbUpAltOutlined fontSize="small" />
            &nbsp;
            {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
            </>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }; 

    // openpost function block
    const openPost = () => {
      navigate(`/posts/${post._id}`);
    };


  return (
    <Card  className={classes.card} raised elevation={6}>
      
      <ButtonBase
        className={classes.cardAction}
        onClick={openPost}
      >

        <CardMedia 
          className={classes.media}
          image={post.selectedFile }
          title={post.title}
        />

        <div className={classes.overlay}>
          <Typography variant='h6'>
            {post.name}
          </Typography>

          <Typography variant='body2'>{moment(post.createdAt).fromNow()
          }</Typography>
        </div>
        
        <div className={classes.details}>
          <Typography 
            variant='body2'
            color="textSecondary">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
        </div>

        <Typography 
            className={classes.title}
            variant='h5'
            gutterBottom >
              {post.title}
          </Typography>

        <CardContent className={classes.CardContent}>
          <Typography 
            
            variant='body2'
            color='textSecondary'
            component="p"
            >
              {post.message}
          </Typography>
        </CardContent>

      </ButtonBase>

      {/* logic to implimenting that created user can only edit the post */}
      {(user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{color: 'white'}}
            size='small'
            onClick={() => setCurrentId(post._id)} >
              <MoreHorizIcon fontSize='medium'/>
            </Button>
        </div>
        )}

      <CardActions className={classes.cardActions}>

        {/* like button */}
        <Button size="small" color='primary' 
        disabled={!user?.result}
        onClick={() => dispatch(likePost(post._id))} >
          <Likes/>
        </Button>

        {/* delete button */}

        {/* logic for implimenting that created user only can delete the post */}

        {(user?.result?._id === post?.creator) && (
          <Button size="small" color='primary' 
          onClick={() => dispatch(deletePost(post._id ))} >
  
            <DeleteIcon fontSize="small"/>
             Delete
            
          </Button>
        )}
      </CardActions>

    </Card>
  )
}

export default Post;