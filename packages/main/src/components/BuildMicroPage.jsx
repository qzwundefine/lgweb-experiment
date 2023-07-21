import React from "react";
import packageConfig from "@/../../config/config.json";
import devConfig from "../config/index";

const config = JSON.parse(JSON.stringify(packageConfig));

const BuildPage = ({ name }) => {
  const url = `${devConfig[name]}/child/${name}`;

  return (
    <>
      <micro-app name={name} url={url} />
    </>
  );
};

export default BuildPage;
