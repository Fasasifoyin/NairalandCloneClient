import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/UserSlice";
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
import profileSlice from "./slice/ProfileSlice";
import resetSlice from "./slice/ResetSlice";
import searchSlice from "./slice/SearchSlice";
import relatedTagsSlice from "./slice/RelatedTags";
import latestSlice from "./slice/latestSlice";
import BBTSlice from "./slice/BBT";

import randomSlice from "./slice/home/RandomBlog";

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
    profile: profileSlice,
    reset: resetSlice,
    search: searchSlice,
    relatedTags: relatedTagsSlice,
    latest: latestSlice,
    BBT: BBTSlice,
    random: randomSlice,
  },
});
