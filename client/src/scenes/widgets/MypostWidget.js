import React from "react";
import {setPosts} from '../../state/index'
import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";

  import Dropzone from "react-dropzone";
  import UserImage from "../../components/UserImage";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch,useSelector } from "react-redux";
 
  import { colorToken } from "../../theme";
 import FlexBetween from "../../components/Flexbetween";

export const MypostWidget=({picturePath})=>{

    const dispatch=useDispatch();
    const [isImage,setIsImage]=useState(false);
  const [image,setImage]=useState(null);
  const  [post,setPost]=useState("");
   const {_id}=useSelector((state)=>state.user);
   const token=useSelector((state)=>state.token);
   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");


   const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    
    dispatch(setPosts( posts ));
    setImage(null);
    setPost("");
    
  };


   
    return(
      <WidgetWrapper sx={{background:colorToken.background,    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',}}>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: colorToken.background,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${colorToken.black}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${colorToken.sky}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: colorToken.black }} />
          <Typography
            color={colorToken.black}
            sx={{ "&:hover": { cursor: "pointer", color: colorToken.black } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color:colorToken.black }} />
              <Typography color={colorToken.black}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color:colorToken.black }} />
              <Typography color={colorToken.black}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color:colorToken.black }} />
              <Typography color={colorToken.black}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: colorToken.black }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
           '&:hover':{
            backgroundColor: colorToken.sky,

           },
            color: colorToken.black, 
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
    )
}


