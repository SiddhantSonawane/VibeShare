import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";

const Friend = ({friendId, name, subtitle, userPicturePath, showIcon}) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const friends = useSelector((state) => state.user.friends)
    
    const {palette} = useTheme()
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark 
    const medium = palette.neutral.medium
    const main = palette.neutral.main

    let isFriend = null
    
    if(friends.length > 0)
        isFriend = friends.find((friend) => friend._id === friendId)

    const patchFriend = async () => {
        if(_id === friendId){
            alert("Don't be this much Introvert! We know you are already your friend...😂")
        }
        const response = await fetch(`http://localhost:3001/user/${_id}/${friendId}`, 
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }
        )
        const data = await response.json()
        dispatch(setFriends({ friends: data}))
    }


    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`)
                        navigate(0)
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx = {{
                            "&:hover":{
                                color: primaryLight,
                                cursor: "pointer"
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            
            { showIcon &&
                <IconButton
                    onClick={() => patchFriend()}
                    sx = {{ backgroundColor: primaryLight, p: "0.6rem" }}
                >
                    {isFriend ? 
                        (<PersonRemoveOutlined sx = {{ color: primaryDark }} />) :
                        (<PersonAddOutlined sx = {{ color: primaryDark }} />)
                    }
                </IconButton>
            }
        </FlexBetween>
    )
}

export default Friend