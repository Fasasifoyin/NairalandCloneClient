import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/UserSlice"
import createReducer from "./slice/CreateSlice";
import homeBlogSlice from "./slice/home/HomeBlogSlice";
import randomTagsSlice from "./slice/home/RandomTagsSlice";
import randomBlogsSlice from "./slice/home/RandomBlogsSlice";
import newSliderSlice from "./slice/new/NewSliderSlice";
import newPageSlice from "./slice/new/NewPageSlice";
import footerSlice from "./slice/FooterSlice";
import detailedSlice from "./slice//Detailed/DetailedSlice";
import detailedLatestSlice from "./slice/Detailed/DetailedLatest";
import detailedRelatedSlice from "./slice/Detailed/DetailedRelated";
import commentSlice from "./slice/Detailed/CommentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: createReducer,
    home: homeBlogSlice,
    randomTags: randomTagsSlice,
    randomBlogs: randomBlogsSlice,
    newPageSlide: newSliderSlice,
    new: newPageSlice,
    footer: footerSlice,
    single: detailedSlice,
    detailedLatest: detailedLatestSlice,
    detailedRelated: detailedRelatedSlice,
    comment: commentSlice,
  },
});
