import React from "react";
import Hero from "../components/Hero";
import { useSelector } from "react-redux";
import Profile from "../components/Profile";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return <>{userInfo ? <Profile /> : <Hero />}</>;
};

export default HomeScreen;
