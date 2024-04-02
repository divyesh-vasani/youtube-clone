import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASE_URL, options } from "@/utils/fetchFromAPI";
import formatRelativeTime from "@/utils/formatRelativeTime";

const SuggestionVideos = ({ SuggestionVideosId }) => {
  const [SuggestionVideosData, setSuggestionVideosData] = useState({});
  const router = useRouter();

  const pushRouter = (id) => {
    router.push(`/watch/${id}`);
  };

  const fetchSuggestionVideosData = async () => {
    const { data } = await axios.get(
      `${BASE_URL}/search?relatedToVideoId=${SuggestionVideosId}&part=id,snippet&type=video`,
      options
    );
    setSuggestionVideosData(data);
  };

  useEffect(() => {
    fetchSuggestionVideosData();
  }, [SuggestionVideosId]);

  console.log(SuggestionVideosData, "SuggestionVideosData");
  return (
    <>
      {SuggestionVideosData?.items?.map((item, index) => {
        return (
          <div key={index} className="flex gap-2 mt-2">
            <div
              className="max-w-[168px] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => pushRouter(item?.id?.videoId)}
            >
              <img
                src={item?.snippet?.thumbnails?.high?.url}
                alt=""
                className="w-full"
              />
            </div>
            <div>
              <p
                className="line-clamp-2 overflow-hidden text-sm font-medium text-[#0f0f0f] cursor-pointer"
                onClick={() => pushRouter(item?.id?.videoId)}
              >
                {item?.snippet?.title}
              </p>
              <span className="block text-xs font-normal text-[#606060]">
                {item?.snippet?.channelTitle}
              </span>
              <span className="text-xs font-normal text-[#606060]">
                {formatRelativeTime(item?.snippet?.publishedAt)}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SuggestionVideos;
