"use client";

import HomePage from "@/components/home/home";
import { BASE_URL, options } from "@/utils/fetchFromAPI";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <>
      <HomePage />
      {/* <Link href={"/test"}>test</Link> */}
    </>
  );
}
