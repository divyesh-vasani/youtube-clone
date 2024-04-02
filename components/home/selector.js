import { selector } from "recoil";
import { drawerState } from "../recoil/atom";

export const drawerStateValue = selector({
  key: "drawerStateValue",
  get: ({ get }) => {
    return get(drawerState);
  },
});
