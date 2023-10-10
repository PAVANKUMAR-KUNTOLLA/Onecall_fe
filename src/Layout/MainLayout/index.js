import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import AppBar from "./appBar";
import SideBar from "./sideBar";

const useStyles = makeStyles((theme) => ({}));

const AppLayout = () => {
  const customStyles = useStyles();
  const { initialAppLoading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <>
      {!initialAppLoading && (
        <div>
          <div style={{ position: "relative" }}>
            <AppBar />
            {/* <SideBar /> */}
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default AppLayout;