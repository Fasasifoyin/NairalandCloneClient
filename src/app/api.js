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

  if (localStorage.getItem("blogPaginationToken")) {
    req.headers["x-blog-pagination-token"] = JSON.parse(
      localStorage.getItem("blogPaginationToken")
    );
  }

  return req;
});

//start
export const signUp = (form) => API.post("/api/users/signup", form);
export const signIn = (form) => API.post("/api/users/signin", form);

export const latestNews = (page) => API.get(`/api/blogs/latest/${page}`);
export const getBlogsByTags = (tagRequest) =>
  API.post("/api/blogs/getblogsbytags", tagRequest);
export const getRandomBlogs = (page) =>
  API.get(`/api/blogs/randomblogs?page=${page}`);

export const getSingleBlog = (slug) => API.get(`/api/blogs/${slug}`);
export const getRelatedTags = (query) =>
  API.get(`/api/blogs/tags/related?tags=${query.tags}&page=${query.page}`);
export const getComment = (query) =>
  API.get(
    `/api/blogs/get/comment?blogId=${query.blogId}&length=${query.length}`
  );
export const createComment = (form) =>
  API.post("/api/blogs/create/comment", form);
export const createChildComment = (form) =>
  API.patch("/api/blogs/comment/childcomment", form);
export const likeComment = (commentId) =>
  API.patch(`/api/blogs/comment/like/${commentId}`);
export const deleteComment = (query) =>
  API.delete(
    `/api/blogs/comment/delete?commentId=${query.commentId}&blogId=${query.blogId}`
  );
export const deleteChildComment = (body) =>
  API.patch("/api/blogs/comment/deletechildcomment", body);
export const likeChildComment = (form) =>
  API.patch("/api/blogs/comment/childcomment/like", form);

export const Search = (query) =>
  API.get(
    `/api/blogs/blog/search?search=${query.search}&title=${query.title}&body=${query.body}&tags=${query.tags}&page=${query.page}`
  );

export const profile = (params) =>
  API.get(`/api/users/profile/${params.userName}/${params.page}`);
export const profileSearchedBlogs = (query) =>
  API.get(
    `/api/users/profile/search?search=${query.search}&userName=${query.userName}&page=${query.page}`
  );
export const updateProfile = (body) =>
  API.patch(`/api/users/profile/updateProfile/${body.user}`, body);
export const updatePhoto = (body) =>
  API.patch("/api/users/profile/updatePhoto", body);
//end

export const updateAddress = (body) =>
  API.patch(`/api/users/profile/updateAddress/${body.userName}`, body);
export const deleteUser = (userName) =>
  API.delete(`/api/users/profile/delete/${userName}`);
export const updatePassword = (body) =>
  API.patch(`/api/users/profile/password/${body.userName}`, body);

export const createBlog = (form) => API.post("/api/blogs/create", form);
export const updateBlog = (form) => API.patch("/api/blogs/update", form);
export const deleteBlog = (blogId) => API.delete(`/api/blogs/delete/${blogId}`);

export const homePageTags = (page) => API.get(`/api/blogs/homepage/${page}`);

export const newPageSlide = (qty) =>
  API.get(`/api/blogs/newpage/slider/${qty}`);
export const newPage = (page) => API.get(`/api/blogs/new/${page}`);

export const randomTags = (qty) => API.get(`/api/blogs/random/tags/${qty}`);
export const randomBlogs = (qty) => API.get(`/api/blogs/random/blogs/${qty}`);
export const footer = (qty) => API.get(`/api/blogs/footer/${qty}`);

export const verifyEmailandGenerateOTP = (mail) =>
  API.get(`/api/users/generateotp/${mail}`);
export const verifyotp = (code) => API.get(`/api/users/verifyotp/${code}`);
export const resetPassword = (body) =>
  API.patch(`/api/users/resetpassword`, body);
