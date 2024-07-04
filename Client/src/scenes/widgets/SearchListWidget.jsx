import React from 'react';
import Navbar from 'scenes/navbar';
import Friend from 'components/Friend';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';

const SearchListWidget = () => {
    const searchResults = useSelector((state)=> state.searchResults)
    const theme = useTheme()
    console.log('search result in widget are ', searchResults)
    
    return (
        <Box>
            <Navbar />
            <WidgetWrapper
                sx={{
                    width: "500px",
                    m: "5rem 5rem"
                }}
            >
                <Typography
                    color={theme.palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                    sx = {{ mb: "1.5rem" }}
                >
                    Search List
                </Typography>

                <Box
                    display="flex"
                    flexDirection="column"
                    gap="1.5rem"
                >
                    {searchResults.length > 0 ? (searchResults.map((user) => (
                        <Friend 
                            key={user._id}
                            friendId={user._id}
                            name={`${user.firstName} ${user.lastName}`}
                            subtitle={user.occupation}
                            userPicturePath={user.picturePath}
                            showIcon={true}
                        />
                    ))): null}
                </Box>
            </WidgetWrapper>
        </Box>
    );
};

export default SearchListWidget;
