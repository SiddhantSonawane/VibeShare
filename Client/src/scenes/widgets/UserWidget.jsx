import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Instagram,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath, editProfileIcon }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  const profileViewsCount = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/profileviews/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await response.json();
  };

  const impressionsCount = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/impressions/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await response.json();
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    profileViews,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" pb="1.1rem">
        {/* First Row */}
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                navigate(`/profile/${userId}`);
                profileViewsCount();
                impressionsCount();
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        {editProfileIcon && (
          <ManageAccountsOutlined
            onClick={() => navigate(`/update`)}
            sx={{
              cursor: "pointer",
            }}
          ></ManageAccountsOutlined>
        )}
      </FlexBetween>

      <Divider />

      {/* Second Row */}

      <Box>
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          mb="0.5rem"
          mt="0.5rem"
        >
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* third row */}

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Total Views on your profile</Typography>
          <Typography color={main} fontWeight="500">
            {profileViews}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>
            Total Impressions of your Posts
          </Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* Fourth Row */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="1rem">
          <FlexBetween gap="1rem">
            <Twitter />
            <Box>
              <Typography color={main} fontWeight="500">
                {" "}
                Twitter{" "}
              </Typography>
              <Typography color={medium}>
                {" "}
                {user.socialProfiles[0].twitterProfile}{" "}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem" mb="1rem">
          <FlexBetween gap="1rem">
            <LinkedIn />
            <Box>
              <Typography color={main} fontWeight="500">
                {" "}
                Linkedin{" "}
              </Typography>
              <Typography color={medium}>
                {" "}
                {user.socialProfiles[0].linkedInProfile}{" "}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <Instagram />
            <Box>
              <Typography color={main} fontWeight="500">
                {" "}
                Instagram{" "}
              </Typography>
              <Typography color={medium}>
                {" "}
                {user.socialProfiles[0].instagramProfile}{" "}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
