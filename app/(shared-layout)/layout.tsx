import React from "react";
import Navbar from "@/components/web/navbar";
import { ReactNode } from "react";

const Sharedlayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children} 
    </>
  );
};

export default Sharedlayout;
