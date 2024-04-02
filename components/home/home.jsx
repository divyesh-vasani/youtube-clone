import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { drawerStateValue } from "./selector";
import axios from "axios";
import { BASE_URL, options } from "@/utils/fetchFromAPI";
import Card from "../card/card";
import HomeSuggestions from "./homeSuggestions";
import { homeSuggestionsAtom } from "../recoil/atom";

const HomePage = () => {
  const isOpen = useRecoilValue(drawerStateValue);
  const [homePageData, setHomePageData] = useState([]);
  const [query, setQuery] = useRecoilState(homeSuggestionsAtom);
  const fetchData = async () => {
    const { data } = await axios.get(
      `${BASE_URL}/search?q=${query}&part=snippet`,
      options
    );
    setHomePageData(data);
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <>
      {isOpen ? (
        <div className="fixed w-[240px] left-0 h-full">
          <div>SideBar</div>
        </div>
      ) : null}
      <div className="max-w-home mx-auto px-[15px]">
        <div className={`${isOpen ? `ml-[250px]` : `ml-0`}  `}>
          <HomeSuggestions />
          {homePageData.length === 0 ? (
            "loading......"
          ) : (
            <Card item={homePageData} />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
