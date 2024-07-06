import {
  ChatBubbleOutlineOutlined,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  ShareOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  useTheme,
  TextField,
  Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  location,
  description,
  mediaPath,
  userPicturePath,
  likes,
  comments,
  showIcon,
  isHomePage,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;

  const [isComments, setIsComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const bothPersonsSame = loggedInUserId === postUserId ? true : false;

  const impressionsCount = async () => {
    const userId = user._id;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}user/impressions/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await response.json();
  };

  const patchLike = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );

    impressionsCount();
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleAddComment = async () => {
    if (commentText.trim() === "") return;

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}posts/${postId}/comment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          comment: commentText,
          fullName: user.firstName,
        }),
      }
    );

    impressionsCount();
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setCommentText("");
  };

  const handlePostDelete = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await response.json();
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        showIcon={showIcon}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {mediaPath && (
        <>
          {mediaPath.endsWith(".mp4") ? (
            <video
              width="100%"
              height="auto"
              controls
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            >
              <source
                src={`${process.env.REACT_APP_API_URL}assets/${mediaPath}`}
                type="video/mp4"
              />
            </video>
          ) : (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={`${process.env.REACT_APP_API_URL}assets/${mediaPath}`}
            />
          )}
        </>
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {isHomePage ? (
          <IconButton>
            <ShareOutlined />
          </IconButton>
        ) : bothPersonsSame ? (
          <IconButton onClick={handlePostDelete}>
            <DeleteOutline />
          </IconButton>
        ) : (
          <IconButton>
            <ShareOutlined />
          </IconButton>
        )}
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment.comment}
                <Typography sx={{ color: palette.neutral.medium }}>
                  {comment.commentTime}
                  <br></br>
                  {comment.fullName}
                </Typography>
              </Typography>
            </Box>
          ))}
          <Divider />
          <Box display="flex" mt="0.5rem">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              sx={{ ml: "0.5rem" }}
            >
              Post
            </Button>
          </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
