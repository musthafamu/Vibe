import { IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/Flexbetween"
import WidgetWrapper from "../../components/WidgetWrapper"
import { colorToken } from "../../theme";
const AdvertWidget = () => {
  const { palette } = useTheme();


  return (
    <WidgetWrapper sx={{    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)'}}>
      <FlexBetween>
        <Typography color={colorToken.black} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={colorToken.black}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/apple.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={colorToken.black}>Apple.com</Typography>
        <IconButton sx={{ fontSize: 'small', fontWeight: 50 }}>Remove Ads</IconButton>

      </FlexBetween>
      <Typography color={colorToken.black} m="0.5rem 0">
       Buy new Iphone with Discount
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;