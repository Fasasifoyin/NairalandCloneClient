import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_API_KEY,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("nairalandUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("nairalandUser")).token
    }`;
  }

  return req;
});

export const signUp = (form) => API.post("/api/users/signup", form);
export const signIn = (form) => API.post("/api/users/signin", form);

export const createBlog = (form) => API.post("/api/blogs/create", form);
export const updateBlog = (form) => API.patch("/api/blogs/update", form);

export const createComment = (form) =>
  API.post("/api/blogs/create/comment", form);
export const getComment = (query) =>
  API.get(`/api/blogs/get/comment?blogId=${query.blogId}&index=${query.index}`);
export const likeComment = (commentId) =>
  API.patch(`/api/blogs/comment/like/${commentId}`);
export const createChildComment = (form) =>
  API.patch("/api/blogs/comment/childcomment", form);
export const likeChildComment = (form) =>
  API.patch("/api/blogs/comment/childcomment/like", form);
export const deleteComment = (query) =>
  API.delete(
    `/api/blogs/comment/delete?commentId=${query.commentId}&blogId=${query.blogId}`
  );
export const deleteChildComment = (body) =>
  API.patch("/api/blogs/comment/deletechildcomment", body);

export const homePageTags = (page) => API.get(`/api/blogs/homepage/${page}`);

export const newPageSlide = (qty) =>
  API.get(`/api/blogs/newpage/slider/${qty}`);
export const newPage = (page) => API.get(`/api/blogs/new/${page}`);

export const getSingleProduct = (slug) => API.get(`/api/blogs/${slug}`);

export const getRelatedTags = (query) =>
  API.get(`/api/blogs/tags/related?page=${query.page}&tags=${query.tags}`);

export const randomTags = (qty) => API.get(`/api/blogs/random/tags/${qty}`);
export const randomBlogs = (qty) => API.get(`/api/blogs/random/blogs/${qty}`);
export const footer = (qty) => API.get(`/api/blogs/footer/${qty}`);
