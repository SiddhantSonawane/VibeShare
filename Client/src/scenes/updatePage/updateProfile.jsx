import React from "react";
import { Box, Button, TextField, useTheme, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const profileSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().required("Last name is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
  twitterProfile: yup.string().optional(),
  linkedInProfile: yup.string().optional(),
  instagramProfile: yup.string().optional(),
});

const ProfileForm = () => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const currentUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const updateUserProfile = async (userId, token, userData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/${userId}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Error updating profile: ${error.message}`);
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const updatedUser = await updateUserProfile(
        currentUser._id,
        token,
        values
      );
      navigate("/home");
      console.log("Updated user:", updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        location: currentUser.location || "",
        occupation: currentUser.occupation || "",
        twitterProfile: currentUser.socialProfiles?.twitterProfile || "",
        linkedInProfile: currentUser.socialProfiles?.linkedInProfile || "",
        instagramProfile: currentUser.socialProfiles?.instagramProfile || "",
      }}
      validationSchema={profileSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Email Id"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Location"
              name="location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.location && Boolean(errors.location)}
              helperText={touched.location && errors.location}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Occupation"
              name="occupation"
              value={values.occupation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.occupation && Boolean(errors.occupation)}
              helperText={touched.occupation && errors.occupation}
              sx={{ gridColumn: "span 4" }}
            />
            {/* Social profiles */}
            <TextField
              label="Twitter Profile"
              name="twitterProfile"
              value={values.twitterProfile}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="LinkedIn Profile"
              name="linkedInProfile"
              value={values.linkedInProfile}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Instagram Profile"
              name="instagramProfile"
              value={values.instagramProfile}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTON */}
          <Box>
            <Button
              type="submit"
              disabled={isSubmitting}
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Update Profile
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ProfileForm;
