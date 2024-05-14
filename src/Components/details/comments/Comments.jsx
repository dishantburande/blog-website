import React, { useEffect } from 'react'
import { Box,TextareaAutosize,Button,styled } from '@mui/material'
import { useState, useContext } from 'react'
import { API } from '../../../service/api.js';
import { DataContext } from '../../../context/DataProvider.jsx'

// copmonents
import Comment from './Comment.jsx';

const Container = styled(Box)`
margin-top: 100px;
display: flex;
`
const Image = styled('img')({
    height: 50,
    width:50,
    borderRadius: '50%'
})

const StyledTextArea = styled(TextareaAutosize)`
width: 100%;
height: 100%;
margin: 0 20px;
`

const initialValues = {
name: '',
postId: '',
comments: '',
date: new Date()
}
const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValues);
    const[comments, setComments] = useState([])
    const [ toggle, setToggle]= useState(false)

    const { account} = useContext(DataContext);

    useEffect(()=>{
      const getData = async ()=>{
        const response = await API.getAllComments(post._id);
        if(response.isSuccess){
          setComments(response.data)
        }
      }
      getData();
    }, [post,toggle])

    const handleChange = (e) =>{
   setComment({
    ...comment,
    name: account.username,
    postId: post._id,
    comments : e.target.value
   })
    }
    const addComment = async (e)=>{
   let response = await API.newComment(comment);
   if( response.isSuccess){
    setComment(initialValues);
   }
   setToggle(prev => !prev);
    }
  return (
    <Box>
        <Container>
       <Image src={url} alt='dp' />
       <StyledTextArea
       minRows={5}
       placeholder='whats in your mind?'
       value={comment.comments}
       onChange={(e)=> handleChange(e)}
       />
       <Button varient='contained' color='primary' size='medium' style={{height: 20}} onClick={(e)=> addComment(e)}>Posts</Button>
        </Container>

        <Box>
             {
              comments && comments.length > 0 && comments.map(comment =>{
                <Comment comment={comment} setToggle={setToggle}/>
              })
             }
        </Box>
    </Box>
  )
}

export default Comments