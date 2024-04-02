"use client";

import MenuIcon from "@/public/asset/icon/menuIcon";
import React, { useEffect, useState } from "react";
import Logo from "@/public/asset/icon/logo";
import SearchIcon from "@/public/asset/icon/searchIcon";
import MoonIcon from "@/public/asset/icon/moonIcon";
import Link from "next/link";
import axios from "axios";
import { BASE_URL, options } from "@/utils/fetchFromAPI";
import { useRecoilState } from "recoil";
import { drawerState } from "../recoil/atom";

const Header = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [sideBar, setSideBar] = useRecoilState(drawerState);
  const fetchData = async () => {
    // const { data } = await axios.get(
    //   `${BASE_URL}/search?q=${inputSearch}&part=snippet`,
    //   options
    // );
    // console.log(data, "data");
  };
  useEffect(() => {
    fetchData();
  }, [inputSearch]);
  return (
    <div className="flex items-center px-[20px] py-[10px]">
      <div className="flex shrink-0 gap-5 items-center">
        <button onClick={() => setSideBar(!sideBar)}>
          <MenuIcon />
        </button>
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="grow flex justify-center">
        <div className="max-w-[600px] w-full h-10 relative">
          <input
            onChange={(e) => setInputSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="outline-none border border-[#ccc] border-solid rounded-full w-full h-full pl-4 pr-1"
          />
          <button className="rounded-r-full absolute top-0 right-0 border border-[#ccc] border-solid bg-[#f8f8f8] h-full w-[60px] flex justify-center items-center ">
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className="shrink-0">
        <button>
          <MoonIcon />
        </button>
      </div>
    </div>
  );
};

export default Header;
