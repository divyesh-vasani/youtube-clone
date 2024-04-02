// atoms.js
import { atom } from "recoil";

export const drawerState = atom({
  key: "drawerState",
  default: false,
});
export const homeSuggestionsAtom = atom({
  key: "homeSuggestions",
  default: "all",
});
