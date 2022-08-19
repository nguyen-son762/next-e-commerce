import { Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { memo } from "react";

interface Iprops {
  isFullScreen?: boolean;
}

const useStyles = makeStyles({
  loader: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function Loader({ isFullScreen }: Iprops) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      className={isFullScreen ? classes.loader : ""}
    >
      <CircularProgress />
    </Box>
  );
}

export default memo(Loader);
