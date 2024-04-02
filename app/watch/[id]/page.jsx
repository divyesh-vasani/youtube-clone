"use client";
import formatRelativeTime from "@/utils/formatRelativeTime";
import Dislike from "@/public/asset/icon/dislike";
import DislikeFill from "@/public/asset/icon/dislikeFill";
import Like from "@/public/asset/icon/like";
import LikeFill from "@/public/asset/icon/likeFill";
import ShareIcon from "@/public/asset/icon/shareIcon";
import { BASE_URL, options } from "@/utils/fetchFromAPI";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import SuggestionVideos from "@/components/suggestionVideos/suggestionVideos";

const Page = () => {
  const params = useParams();
  const [videoDetail, setVideoDetail] = useState({});
  const [channelDetail, setChannelDetail] = useState([]);
  const [commentsDetail, setCommentsDetail] = useState([]);
  const [like, setLike] = useState(0);
  const [commentLike, setCommentLike] = useState(0);
  const [commentLikeIndex, setCommentLikeIndex] = useState();
  const [subscribe, setSubscribe] = useState(false);
  const channelId =
    videoDetail?.items && videoDetail?.items[0]?.snippet?.channelId;
  const fetchDataById = async () => {
    const { data } = await axios.get(
      `${BASE_URL}/videos?part=snippet,statistics&id=${params?.id}`,
      options
    );
    setVideoDetail(data);
  };

  const fetchChannelData = async () => {
    const { data } = await axios.get(
      `${BASE_URL}/channels?part=snippet,statistics&id=${channelId}`,
      options
    );
    setChannelDetail(data);
  };

  const fetchCommentslData = async () => {
    const { data } = await axios.get(
      `${BASE_URL}/commentThreads?part=snippet&videoId=${params?.id}`,
      options
    );
    setCommentsDetail(data);
  };

  const formatSubscribers = (count) => {
    if (count < 1000) {
      return count;
    } else if (count < 1000000) {
      return (count / 1000).toFixed(1) + "k";
    } else {
      return (count / 1000000).toFixed(2) + "M";
    }
  };

  useEffect(() => {
    fetchDataById();
    fetchCommentslData();
    if (channelId) {
      fetchChannelData();
    }
  }, [channelId, params?.id]);

  if (videoDetail?.items?.length > 0) {
    return (
      <div className="max-w-home mx-auto px-[15px] mt-[24px]">
        <div className="flex gap-8">
          <div className="w-[75%] grow">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${params?.id}`}
              className="react-player"
              controls
              width="100%"
              height={700}
            />
            <div className="mt-3">
              <span className="text-lg font-bold">
                {videoDetail?.items && videoDetail?.items[0]?.snippet?.title}
              </span>
            </div>
            <div className="flex mt-3">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img
                  src={
                    channelDetail?.items &&
                    channelDetail?.items[0]?.snippet?.thumbnails?.high?.url
                  }
                  alt=""
                />
              </div>
              <div className="flex gap-6 grow">
                {channelDetail?.items && (
                  <div className="flex flex-col">
                    <p className="text-base  font-medium">
                      {channelDetail?.items[0]?.snippet?.title}
                    </p>
                    <span className="text-xs font-normal text-[#606060]">
                      {formatSubscribers(
                        channelDetail?.items[0]?.statistics?.subscriberCount
                      )}{" "}
                      subscribers
                    </span>
                  </div>
                )}
                <div
                  className={`${
                    subscribe
                      ? `bg-[rgba(0,0,0,0.05)] text-black`
                      : `bg-[#0f0f0f] text-white `
                  } h-9 rounded-[36px] px-4 flex justify-center text-center`}
                  onClick={() => setSubscribe(!subscribe)}
                >
                  <button className="capitalize text-sm">
                    {subscribe ? `subscribed` : `subscribe`}
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                {videoDetail?.items && (
                  <div className="bg-[rgba(0,0,0,0.05)] flex items-center rounded-[18px]">
                    <div
                      className="flex px-4 items-center cursor-pointer"
                      onClick={() =>
                        like === 0
                          ? setLike(1)
                          : setLike(0) || like === 2
                          ? setLike(1)
                          : setLike(0)
                      }
                    >
                      {like === 1 ? <LikeFill /> : <Like />}
                      <span className="text-sm font-medium">
                        {formatSubscribers(
                          videoDetail?.items[0]?.statistics?.likeCount
                        )}
                      </span>
                    </div>
                    <div
                      className="relative cursor-pointer px-4 before:content-[' '] before:left-0	before:absolute before:w-[1px] before:h-6 before:top-0  before:bg-gray-400"
                      onClick={() => (like === 2 ? setLike(0) : setLike(2))}
                    >
                      {like === 2 ? <DislikeFill /> : <Dislike />}
                      {/* <Dislike /> */}
                    </div>
                  </div>
                )}
                <div className="bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)] cursor-pointer flex gap-[6px] items-center rounded-[18px] px-4">
                  <ShareIcon />
                  <button className="text-sm font-medium">Share</button>
                </div>
              </div>
            </div>
            <div className="mt-3 bg-[rgba(0,0,0,0.05)] w-full rounded-xl p-3">
              {videoDetail?.items && (
                <div>
                  <div className="flex font-medium text-sm gap-2">
                    <span>
                      {formatSubscribers(
                        videoDetail?.items[0]?.statistics?.viewCount
                      )}{" "}
                      views
                    </span>
                    <span>
                      {formatRelativeTime(
                        videoDetail?.items[0]?.snippet?.publishedAt
                      )}
                    </span>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm font-normal">
                      {videoDetail?.items[0]?.snippet?.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {videoDetail?.items && (
              <div className="mt-6 mb-8">
                <span className="text-xl font-bold">
                  {videoDetail?.items[0]?.statistics?.commentCount} Comments
                </span>
              </div>
            )}

            <div>
              {commentsDetail?.items?.map((item, index) => {
                const decodedName = (() => {
                  const textarea = document.createElement("textarea");
                  textarea.innerHTML =
                    item?.snippet?.topLevelComment?.snippet?.textDisplay;
                  return textarea.value;
                })();
                return (
                  <div className="flex mb-4 gap-4" key={index}>
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={
                          item?.snippet?.topLevelComment?.snippet
                            ?.authorProfileImageUrl
                        }
                        alt=""
                      />
                    </div>
                    <div className="grow">
                      <p className="text-[13px] font-medium">
                        {
                          item?.snippet?.topLevelComment?.snippet
                            ?.authorDisplayName
                        }
                      </p>
                      <span className="text-sm font-normal">{decodedName}</span>
                      <div className="flex gap-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              commentLike === 0
                                ? setCommentLike(1)
                                : setCommentLike(0) || commentLike === 2
                                ? setCommentLike(1)
                                : setCommentLike(0);
                              setCommentLikeIndex(index);
                            }}
                          >
                            {commentLike === 1 && commentLikeIndex === index ? (
                              <LikeFill />
                            ) : (
                              <Like />
                            )}
                          </button>
                          <span className="text-xs font-normal text-[#606060]">
                            {item?.snippet?.topLevelComment?.snippet
                              ?.likeCount > 0
                              ? item?.snippet?.topLevelComment?.snippet
                                  ?.likeCount
                              : null}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            commentLike === 2
                              ? setCommentLike(0)
                              : setCommentLike(2);
                            setCommentLikeIndex(index);
                          }}
                        >
                          {commentLike === 2 && commentLikeIndex === index ? (
                            <DislikeFill />
                          ) : (
                            <Dislike />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-[25%]">
            <SuggestionVideos SuggestionVideosId={params?.id} />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Page;
