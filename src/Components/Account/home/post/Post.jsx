import React from 'react'
import { Box, Typography, styled } from '@mui/material';
 import { addElipsis } from '../../../../utils/common-utils.js';


const Container = styled(Box)`
border: 1px solid #d3cede;
border-radius: 10px;
margin-top: 10px;
height: 350px;
display: flex;
align-items : center;
flex-direction: column;
& > p {
    padding: 0 5px 5px 5px;
}
`;

const Image= styled('img')({
    width: '100%',
    borderRadius: '10px 10px 0 0',

})

const Text = styled(Typography)`
color: #878787;
font-size: 12px;
`

const Heading = styled(Typography)`
font-size: 18px;
font-weight: 600;
`

const Details = styled(Typography)`
font-size: 14px;
`
const Post = ({post}) => {

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
  return (
    <Container>
    <Image src={url} alt="post" />
    <Text>{post.categories}</Text>
    <Heading>{addElipsis(post.title, 20)}</Heading>
    <Text>Author: {post.username}</Text>
    <Details>{addElipsis(post.description,100)}</Details>
    </Container>
  )
}

export default Post