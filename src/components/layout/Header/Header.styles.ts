import theme from "@/themes/theme";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  logo: {
    display: "flex",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      display: "none !important",
    },
  },
  iconSearch: {
    position: "absolute!important" as "absolute",
    bottom: 0,
    right: 0,
  },
});
