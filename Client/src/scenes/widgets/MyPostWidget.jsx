import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

import {
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  InputBase,
  Button,
  IconButton,
} from "@mui/material";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import Dropzone from "react-dropzone";
import { setPosts } from "state";


const MyPostWidget = ({ picturePath}) => {

    const dispatch = useDispatch()
    const [isMedia, setIsMedia] = useState(false)
    const [media, setMedia] = useState(null)
    const [post, setPost] = useState("")
    const { palette } = useTheme()
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
    const mediumMain = palette.neutral.mediumMain
    const medium = palette.neutral.medium

    const handlePost = async() => {
        const formData = new FormData()
        formData.append("userId", _id)
        formData.append("description", post)
        if(media) {
            formData.append("media", media)
            formData.append("mediaPath", media.name);
            formData.append("mediaType", media.type.split('/')[0]);
        }

        const response = await fetch(`http://localhost:3001/posts`, 
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`},
                body: formData
            }
        )

        const posts = await response.json()
        dispatch(setPosts({posts}))
        setMedia(null)
        setPost("")
    }

    return (
        <WidgetWrapper>
            <FlexBetween>
                <UserImage image={picturePath} />
                <InputBase 
                    placeholder="Share your vibe with all..."
                    onChange={(e) => {setPost(e.target.value)}}
                    value={post}
                    sx ={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                        margin: "0 1rem"
                    }}
                />
            </FlexBetween>
            {isMedia && 
                (
                    <Box
                        border={`1px solid ${medium}`}
                        borderRadius="5px"
                        mt="1rem"
                        p="1rem"
                    >
                        <Dropzone
                            acceptedFiles = "image/*,video/*"
                            multiple = {false}
                            onDrop = {(acceptedFiles) => {setMedia(acceptedFiles[0])}}
                        >
                            {
                                ({ getRootProps, getInputProps }) => 
                                (
                                    <FlexBetween>
                                        <Box
                                            {...getRootProps()}
                                            border = {`2px dashed ${palette.primary.main}`}
                                            p = "1rem"
                                            width="100%"
                                            sx = {{ "&:hover": { cursor: "pointer"} }}
                                        >
                                            <input {...getInputProps()}/>
                                            {
                                                !media ? ( <p>Add Image/Video Here!</p>) :
                                                (
                                                    <FlexBetween>
                                                        <Typography>{media.name}</Typography>
                                                        <EditOutlined />
                                                    </FlexBetween>
                                                )
                                            }
                                        </Box>
                                        {
                                            media && 
                                            (
                                                <IconButton
                                                    onClick={() => setIsMedia(null)}
                                                    sx = {{ width: "15%"}}
                                                >
                                                    <DeleteOutlined />
                                                </IconButton>
                                            )
                                        }
                                    </FlexBetween>
                                )
                            }
                        </Dropzone>
                    </Box>
                )
            }

            <Divider sx={{ margin: "1.25rem 0"}} />

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsMedia(!isMedia)}>
                    <ImageOutlined sx={{ color: mediumMain}} />
                    <Typography
                        color={mediumMain}
                        sx = {{ "&:hover": {color: medium, cursor: "pointer"}}}
                    >
                        Image/Video
                    </Typography>
                </FlexBetween>

                {isNonMobileScreen ? (
                        <>
                            <FlexBetween gap="0.25rem">
                                <AttachFileOutlined sx={{ color: mediumMain}} />
                                <Typography color={mediumMain}>Attachment</Typography>
                            </FlexBetween>

                            <FlexBetween gap="0.25rem">
                                <MicOutlined sx={{ color: mediumMain}} />
                                <Typography color={mediumMain}>Audio</Typography>
                            </FlexBetween>
                        </>
                    ) : 
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx = {{ color: mediumMain}}/>
                    </FlexBetween>
                }

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default MyPostWidget