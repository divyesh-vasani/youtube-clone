import React from "react";
import data from "./homeSuggestions.json";
import { homeSuggestionsAtom } from "../recoil/atom";
import { useRecoilState } from "recoil";

const HomeSuggestions = () => {
  const [query, setQuery] = useRecoilState(homeSuggestionsAtom);
  return (
    <div className="flex just overflow-auto space-x-4 mt-[12px] scrollbar">
      {data?.map((item) => {
        return (
          <button
            key={item?.id}
            value={item?.title}
            onClick={(e) => setQuery(e.target.value)}
            className={`${
              (query === "all" && item.id === 1) || query === item.title
                ? `bg-[#0f0f0f] text-white`
                : "bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)]"
            } font-medium px-3 py-1 rounded-lg capitalize whitespace-nowrap mb-2 text-sm`}
          >
            {item?.title}
          </button>
        );
      })}
    </div>
  );
};

export default HomeSuggestions;
