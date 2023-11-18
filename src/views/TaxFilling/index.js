import React, { useEffect, useState } from "react";
import Page from "../../components/Page";

import { useSelector, useDispatch } from "react-redux";

import AdminTaxFillingPage from "./AdminTaxFilingpage";
import ClientTaxFillingPage from "./ClientTaxFilingPage";

const HomePage = () => {
  const state = useSelector((state) => state.app);

  return (
    <Page title={"Home"}>
      {state.role === "ADMIN" ? (
        <AdminTaxFillingPage />
      ) : state.role === "CLIENT" ? (
        <ClientTaxFillingPage />
      ) : null}
    </Page>
  );
};

export default HomePage;
