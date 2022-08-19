import { makeStyles } from "@mui/styles";

import theme from "./theme";

export const useStyles = makeStyles({
  container: {
    padding: "0 40px",
    marginTop: 30,
    [theme.breakpoints.down("md")]: {
      padding: "0 20px",
    },
  },
});
