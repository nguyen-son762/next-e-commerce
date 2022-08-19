import { memo, ReactNode } from "react";
import { Divider } from "@mui/material";

import Header from "@/components/layout/Header/Header";
import Navbar from "./Navbar/Navbar";

interface Iprops {
  children: ReactNode;
}

function DefaultLayout({ children }: Iprops) {
  return (
    <main>
      <Header />
      <Divider />
      <Navbar />
      {children}
    </main>
  );
}

export default memo(DefaultLayout);
