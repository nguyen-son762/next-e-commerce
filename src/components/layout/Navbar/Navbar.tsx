import { navList } from "@/types/navbar.type";
import { Box, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import theme from "@/themes/theme";
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
            Number(router.query.type || 1) === navItem.type
              ? classess.navItemActive
              : ""
          }
          key={navItem.name}
        >
          <Typography
            onClick={() =>
              router.push(navItem.href, undefined, { shallow: true })
            }
            fontWeight={600}
          >
            {navItem.label}
          </Typography>
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
