import { navList } from "@/types/navbar.type";
import { Box, createTheme, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

const theme = createTheme();
const useStyles = makeStyles({
  navItemActive: {
    "&::before": {
      position: "absolute",
      content: "close-quote",
      bottom: -4,
      left: 0,
      height: "2px",
      width: "100%",
      background: theme.palette.primary.main,
    },
  },
});

function Navbar() {
  const classess = useStyles();
  const router = useRouter();
  const renderNav = () => {
    return navList.map(navItem => {
      return (
        <Box
          sx={{
            cursor: "pointer",
          }}
          mx={2}
          position="relative"
          className={
            router.pathname === navItem.href ? classess.navItemActive : ""
          }
          key={navItem.name}
        >
          <Link href={navItem.href}>
            <Typography fontWeight={600}>{navItem.label}</Typography>
          </Link>
        </Box>
      );
    });
  };
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        {renderNav()}
      </Box>
      <Divider
        sx={{
          marginTop: 3,
        }}
      />
    </>
  );
}

export default memo(Navbar);
