import React, { useContext } from 'react'
import { Box,Typography, styled } from '@mui/material'
import { Delete } from '@mui/icons-material';

import { DataContext } from '../../../context/DataProvider.jsx';
import { API } from '../../../service/api.js';
const Component = styled(Box)`
margin-top: 30px;
background: #F5F5F5;
padding: 10px;
`

const Container = styled(Box)`
display: flex;
margin-bottom: 5px; 
`

const Home = styled(Typography)`
font-weight: 600;
font-size: 18px;
margin-right: 20px;
`

const StyleDate = styled(Typography)`
color: #878787;
font-size: 14px;
`
const DeleteIcon = styled(Delete)`
margin-left: auto;
`
const Comment = ({comment, setToggle}) => {

    const { account } = useContext(DataContext); 

    const removeComment = async ()=>{
   let response = await API.deleteComment(comment._id);
   if(response.isSuccess){
   setToggle(prev = !prev);
   }
    }

  return (
    <Component>
        <Container>
             <Home>{comment.name}</Home>
             <StyleDate>{new Date(comment.date).toDateString()}</StyleDate>
             {comment.name === account.username && <DeleteIcon onClick={()=> removeComment()}/>}
        </Container>

        <Box>
         <Typography>{comment.comments}</Typography>
        </Box>
    </Component>
  )
}

export default Comment