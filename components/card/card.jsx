"use client";
import formatRelativeTime from "@/utils/formatRelativeTime";
import { useRouter } from "next/navigation";
import React from "react";

const Card = ({ item }) => {
  const router = useRouter();
  const pushRouter = (id) => {
    router.push(`/watch/${id}`);
  };
  return (
    <div className="flex flex-wrap pt-[24px]">
      {item?.items?.map((item, index) => {
        const decodedName = (() => {
          const textarea = document.createElement("textarea");
          textarea.innerHTML = item?.snippet?.title;
          return textarea.value;
        })();
        const relativeTime = formatRelativeTime(item?.snippet?.publishedAt);
        return (
          <div
            key={index}
            className="xl:w-[calc((100%-8%)/5)] mb-[2%] ml-[2%] first:ml-0 [&:nth-child(5n+1)]:ml-0 flex flex-col"
          >
            <div
              className="cursor-pointer flex h-[194px] justify-center items-center rounded-xl overflow-hidden "
              onClick={() => pushRouter(item?.id?.videoId)}
            >
              {/* <Link href={item?.id?.videoId}> */}
              <img
                src={item?.snippet?.thumbnails?.high?.url}
                alt={item?.snippet?.title}
                className="rounded-xl"
              />
              {/* </Link> */}
            </div>
            <div className="flex mt-[12px] flex-1">
              <div className="flex flex-col">
                {/* <Link href={item?.id?.videoId}> */}
                <p className="cursor-pointer line-clamp-2 overflow-hidden font-semibold mb-1 text-[#0f0f0f]">
                  {decodedName}
                </p>
                {/* </Link> */}
                <span className="text-[#606060] text-sm">
                  {item?.snippet?.channelTitle}
                </span>
                <span className="text-[#606060] text-sm">{relativeTime}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
