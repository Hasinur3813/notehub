import React from "react";
import bannerImg from "../assets/banner.svg";
const BannerIllustrasion = () => {
  return (
    <div className=" flex justify-end w-full md:w-1/2">
      <img className="w-full" src={bannerImg} alt="ilustration" />
    </div>
  );
};

export default BannerIllustrasion;
