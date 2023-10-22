import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import AppBar from "./appBar";
import DrawerAppBar from "./appBarMaterialUI";
import Api from "../../components/Api";
import { privateApiGET } from "../../components/PrivateRoute";
import { Box, CircularProgress } from "@mui/material";
import { setUserInfo } from "../../redux/app/appSlice";

const useStyles = makeStyles((theme) => ({}));

const AppLayout = () => {
  const customStyles = useStyles();
  const { initialAppLoading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoadingSpin, setIsLoadingSpin] = useState(true);

  const handleFetchProfileData = () => {
    setIsLoadingSpin(true);
    privateApiGET(Api.profile)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setUserInfo(data?.data));
          setIsLoadingSpin(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsLoadingSpin(false);
      });
  };

  useEffect(() => {
    handleFetchProfileData();
  }, []);

  return (
    <>
      {!initialAppLoading && (
        <div>
          {isLoadingSpin ? (
            <Box
              display="flex"
              height="100%"
              width="100%"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: "absolute",
                zIndex: "10",
                left: 0,
                top: 0,
              }}
            >
              <CircularProgress size={30} />
            </Box>
          ) : (
            <div style={{ position: "relative" }}>
              <DrawerAppBar />
              <Outlet />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AppLayout;
