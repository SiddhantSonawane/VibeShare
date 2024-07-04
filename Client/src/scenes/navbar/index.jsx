// import { useState } from "react"
// import { 
//     Box,
//     IconButton,
//     InputBase,
//     Typography,
//     Select,
//     MenuItem,
//     FormControl,
//     useTheme,
//     useMediaQuery
// } from "@mui/material"
// import {
//     Search, 
//     Message,
//     DarkMode,
//     LightMode,
//     Help,
//     Menu,
//     Close,
//     Notifications
// } from "@mui/icons-material"

// import { useSelector, useDispatch } from "react-redux"
// import { setMode, setLogout } from "../../state"
// import { useNavigate } from "react-router-dom"
// import FlexBetween from "components/FlexBetween"

// const Navbar = () => {

//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const[isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const user = useSelector((state) => state.user)
//     const token = useSelector((state) => state.token)
//     const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

//     const theme = useTheme()
//     const neutralLight = theme.palette.neutral.light;
//     const dark = theme.palette.neutral.dark
//     const background = theme.palette.background.default
//     const primaryLight = theme.palette.primary.light
//     const alt = theme.palette.background.alt

//     const fullName = user === null ? "Default User" : `${user.firstName} ${user.lastName}`;

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(`http://localhost:3001/user/search?query=${searchQuery}`, {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             const data = await response.json();
//             setSearchResults(data.users);
//         } catch (error) {
//             console.error("Error searching users:", error);
//         }
//     };


//     const profileViewsCount = async() => {
//         const userId = user._id
//         const response = await fetch(`http://localhost:3001/user/profileviews/${userId}`, 
//             {
//                 method: "PATCH",
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         )
//     }


//     return(
//         // the ultimate parent Flex 
//         <FlexBetween padding="1rem 6%" backgroundColor = {alt}>
            
//             {/* this is the flex which contains the name of the platform and search box */}
//             <FlexBetween gap="1.75rem">
//                 <Typography
//                     fontWeight = "bold"
//                     fontSize = "clamp(1rem, 2rem, 2.25rem)" 
//                     color= "primary"
//                     onClick = {() => navigate("/home")}     
//                     sx = 
//                     {
//                         {
//                             "&:hover": { color: primaryLight, cursor: "pointer"}
//                         }
//                     } 
//                 >
//                     VibeShare
//                 </Typography>
//                 {
//                     isNonMobileScreen && 
//                     (
//                         <FlexBetween
//                             backgroundColor = {neutralLight}
//                             borderRadius= "9px"
//                             gap= "3rem" 
//                             padding= "0.1rem 1.5rem"
//                         >
//                             <InputBase 
//                                 placeholder="Search here..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)} 
//                             />
//                             <IconButton onClick={handleSearch}>
//                                 <Search />
//                             </IconButton>
//                         </FlexBetween>
//                     )
//                 }
//             </FlexBetween>

//             {/* This is the flex which contains another butons such as for mode change notifications etc */}
//             {
//                 isNonMobileScreen ?
//                 (
//                     <FlexBetween gap="2rem">
//                         <IconButton onClick={() => dispatch(setMode())}>
//                             { 
//                                 theme.palette.mode === "dark" ? 
//                                 ( <DarkMode sx = {{ fontSize: "25px"}}/>) :
//                                 ( <LightMode sx={{ color: dark, fontSize: "25px" }} />)
//                             }
//                         </IconButton>
//                         <Message sx = {{ fontSize: "25px"}} />
//                         <Notifications sx = {{ fontSize: "25px"}} />
//                         <Help sx = {{ fontSize: "25px"}} />
//                         <FormControl variant="standard" value={fullName || "Default_User"}>
//                             <Select
//                                 value={fullName || "Default_User"}
//                                 renderValue={() => "Your Profile"}
//                                 sx = 
//                                     {{
//                                         backgroundColor: neutralLight,
//                                         width: "150px",
//                                         borderRadius: "0.25rem",
//                                         p: "0.25rem 1rem",
//                                         "& .MuiSvgIcon-root": 
//                                         {
//                                             pr: "0.25 rem",
//                                             width: "3 rem"
//                                         },
//                                         "& .MuiSelect-select:focus": 
//                                         {
//                                             backgroundColor: neutralLight,
//                                         },
//                                     }}
//                                 input={<InputBase />}
//                             >
//                                 <MenuItem value={fullName} onClick={() => navigate(`/profile/${user._id}`)}>
//                                     <Typography onClick={() => {profileViewsCount()}}>Dashboard</Typography>
//                                 </MenuItem>
//                                 <MenuItem onClick={() => dispatch(setLogout())}>
//                                     Log Out
//                                 </MenuItem>
//                             </Select>
//                         </FormControl>
//                     </FlexBetween>
//                 ) :
//                 (
//                     <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
//                         <Menu />
//                     </IconButton>
//                 )
//             }   

//             {/* Navbar for mobile */}

//             {
//                 !isNonMobileScreen && isMobileMenuToggled &&
//                 (
//                     <Box
//                         position="fixed"
//                         right="0"
//                         bottom="0"
//                         height="100%"
//                         zIndex="10"
//                         maxWidth="500px"
//                         minWidth="300px"
//                         backgroundColor={background}
//                     >
//                         <Box display="flex" justifyContent="flex-end" p="1rem">
//                             <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
//                                 <Close />
//                             </IconButton>
//                         </Box>

//                         <FlexBetween
//                             display="flex"
//                             flexDirection="column"
//                             justifyContent="center"
//                             alignItems="center"
//                             gap="3rem"
//                         >
//                             <IconButton onClick={() => dispatch(setMode())}>
//                             { 
//                                 theme.palette.mode === "dark" ? 
//                                 ( <DarkMode sx = {{ fontSize: "25px"}}/>) :
//                                 ( <LightMode sx={{ color: dark, fontSize: "25px" }} />)
//                             }
//                             </IconButton>
//                             <Message sx = {{ fontSize: "25px"}} />
//                             <Notifications sx = {{ fontSize: "25px"}} />
//                             <Help sx = {{ fontSize: "25px"}} />
//                             <FormControl variant="standard" value={fullName || "Default_User"}>
//                                 <Select
//                                     value={fullName || "Default_User"}
//                                     sx = 
//                                         {{
//                                             backgroundColor: neutralLight,
//                                             width: "150px",
//                                             borderRadius: "0.25rem",
//                                             p: "0.25rem 1rem",
//                                             "& .MuiSvgIcon-root": 
//                                             {
//                                                 pr: "0.25 rem",
//                                                 width: "3 rem"
//                                             },
//                                             "& .MuiSelect-select:focus": 
//                                             {
//                                                 backgroundColor: neutralLight,
//                                             },
//                                         }}
//                                     input={<InputBase />}
//                                 >
//                                     <MenuItem value={fullName}>
//                                         <Typography>{fullName}</Typography>
//                                     </MenuItem>
//                                     <MenuItem onClick={() => dispatch(setLogout())}>
//                                         Log Out
//                                     </MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </FlexBetween>
//                     </Box>
//                 )
//             }

//         </FlexBetween>
//     )
// }

// export default Navbar

import React, { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Help,
    Menu,
    Close,
    Notifications
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { setSearchresults } from "../../state";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");


    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3001/user/search?query=${searchQuery}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            
            const data = await response.json();
            console.log('data type is ', data[0])
    
            if (Array.isArray(data) && data.length > 0) {
                console.log("dispatching")
                dispatch(setSearchresults(data))
                navigate("/searches")
            } else {
                dispatch(setSearchresults([]))
            }
        } catch (error) {
            console.error("Error searching:", error);
        }
    };
    

    const profileViewsCount = async () => {
        const userId = user._id;
        const response = await fetch(`http://localhost:3001/user/profileviews/${userId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": { color: primaryLight, cursor: "pointer" }
                    }}
                >
                    VibeShare
                </Typography>
                {isNonMobileScreen && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Search Any User Here..." onChange={handleSearchChange} />
                        <IconButton onClick={() => {
                            handleSearchSubmit()
                        }}>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {isNonMobileScreen ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? <DarkMode sx={{ fontSize: "25px" }} /> : <LightMode sx={{ color: dark, fontSize: "25px" }} />}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" value={user ? `${user.firstName} ${user.lastName}` : "Default User"}>
                        <Select
                            value={user ? `${user.firstName} ${user.lastName}` : "Default User"}
                            renderValue={() => "Your Profile"}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25 rem",
                                    width: "3 rem"
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={user ? `${user.firstName} ${user.lastName}` : "Default User"} onClick={() => navigate(`/profile/${user._id}`)}>
                                <Typography onClick={profileViewsCount}>Dashboard</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu />
                </IconButton>
            )}

            {!isNonMobileScreen && isMobileMenuToggled && (
                <Box position="fixed" right="0" bottom="0" height="100%" zIndex="10" maxWidth="500px" minWidth="300px" backgroundColor={background}>
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close />
                        </IconButton>
                    </Box>

                    <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? <DarkMode sx={{ fontSize: "25px" }} /> : <LightMode sx={{ color: dark, fontSize: "25px" }} />}
                        </IconButton>
                        <Message sx={{ fontSize: "25px" }} />
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl variant="standard" value={user ? `${user.firstName} ${user.lastName}` : "Default User"}>
                            <Select
                                value={user ? `${user.firstName} ${user.lastName}` : "Default User"}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25 rem",
                                        width: "3 rem"
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight
                                    }
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={user ? `${user.firstName} ${user.lastName}` : "Default User"}>
                                    <Typography>{user ? `${user.firstName} ${user.lastName}` : "Default User"}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};

export default Navbar;
