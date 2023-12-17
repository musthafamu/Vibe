import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { colorToken } from "../../theme";
const LoginPage = () => {

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        height="50%"
        backgroundColor={colorToken.background}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography sx={{color:colorToken.sky}} fontWeight="bold" fontSize="50px" color="primary">
          SnapJoy
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={colorToken.background}
      >
        <Typography fontWeight="100" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to FunVibe 😊😊
        </Typography>
         <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;