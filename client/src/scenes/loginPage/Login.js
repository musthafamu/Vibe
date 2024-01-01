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
         <Typography
          fontWeight="bold"
          fontSize="clamp(3rem, 3rem, 3.25rem)"
          color="primary"
         
          sx={{
              textShadow:"0px 0px 1px  black ",
              color:colorToken.sky,
              cursor: "pointer"
          }}
        >
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
        
         <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;