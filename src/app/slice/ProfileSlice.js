import { createSlice } from "@reduxjs/toolkit";
import {
  profile,
  profileSearchedBlogs,
  updatePhoto,
  updateProfile,
} from "../actions/User";

const initialState = {
  user: {},
  userBlogs: [],
  status: "idle",
  error: null,
  totalPages: 0,

  search: [],
  searchStatus: "idle",
  searchError: null,
  searchTotalPages: 0,

  updateStatus: "idle",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setEmpty: (state) => {
      (state.error = null), (state.totalPages = 0), (state.user = {});
      state.userBlogs = [];
    },
    setSearchEmpty: (state) => {
      (state.searchTotalPages = 0),
        (state.search = []),
        (state.searchStatus = "idle");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(profile.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.user = payload.data;
        state.userBlogs = [...state.userBlogs, ...payload.data.allBlogs];
        state.totalPages = payload.totalPages;
      })
      .addCase(profile.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(profileSearchedBlogs.pending, (state) => {
        state.searchStatus = "pending";
        state.searchError = null;
      })
      .addCase(profileSearchedBlogs.fulfilled, (state, { payload }) => {
        state.searchStatus = "success";
        if (payload.page === 1) {
          state.search = payload.data;
        } else {
          state.search = [...state.search, ...payload.data];
        }
        state.searchTotalPages = payload.totalPages;
      })
      .addCase(profileSearchedBlogs.rejected, (state, { payload }) => {
        state.searchStatus = "failed";
        state.searchError = payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.updateStatus = "pending";
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        (state.updateStatus = "success"),
          (state.user = {
            ...state.user,
            firstName: payload.firstName,
            lastName: payload.lastName,
            userName: payload.userName,
            email: payload.email,
            phone: payload.phone,
            occupation: payload.occupation,
            about: payload.about,
            country: payload.country,
            state: payload.state,
            postalCode: payload.postalCode,
          });
      })
      .addCase(updateProfile.rejected, (state) => {
        state.updateStatus = "failed";
      })
      .addCase(updatePhoto.pending, (state) => {
        state.updateStatus = "pending";
      })
      .addCase(updatePhoto.fulfilled, (state, { payload }) => {
        (state.updateStatus = "success"),
          (state.user = { ...state.user, image: payload });
      })
      .addCase(updatePhoto.rejected, (state) => {
        state.updateStatus = "failed";
      });
  },
});

export const ProfileDetails = (state) => state.profile.user;
export const ProfileBlogs = (state) => state.profile.userBlogs;
export const ProfileStatus = (state) => state.profile.status;
export const ProfileError = (state) => state.profile.error;
export const TotalPages = (state) => state.profile.totalPages;

export const Search = (state) => state.profile.search;
export const SearchStatus = (state) => state.profile.searchStatus;
export const SearchError = (state) => state.profile.searchError;
export const SearchTotalPages = (state) => state.profile.searchTotalPages;

export const UpdateStatus = (state) => state.profile.updateStatus;

export const { setEmpty, setSearchEmpty } = profileSlice.actions;

export const PhotoStatus = (state) => state.profile.photoStatus;
export const AddressStatus = (state) => state.profile.addressStatus;
export const DeleteStatus = (state) => state.profile.deleteStatus;
export const PasswordStatus = (state) => state.profile.passwordStatus;
export const DeleteBlogStatus = (state) => state.profile.deleteBlogStatus;

export default profileSlice.reducer;

// /* eslint-disable no-unused-vars */
// import { createSlice } from "@reduxjs/toolkit";
// import {
//   deleteUser,
//   profile,
//   updateAddress,
//   updatePassword,
//   updatePhoto,
//   updateProfile,
// } from "../actions/User";
// import { deleteBlog } from "../actions/Blogs";

// const initialState = {
//   userDetails: {},
//   error: null,
//   status: "idle",
//   photoStatus: "idle",
//   updateStatus: "idle",
//   addressStatus: "idle",
//   deleteStatus: "idle",
//   passwordStatus: "idle",
//   deleteBlogStatus: "idle",
// };

// const porfileSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(profile.pending, (state, action) => {
//         state.status = "pending";
//       })
//       .addCase(profile.fulfilled, (state, { payload }) => {
//         (state.status = "success"), (state.userDetails = payload);
//       })
//       .addCase(profile.rejected, (state, { payload }) => {
//         state.status = "failed";
//         state.error = payload;
//       })
// .addCase(updatePhoto.pending, (state, action) => {
//   state.photoStatus = "pending";
// })
// .addCase(updatePhoto.fulfilled, (state, { payload }) => {
//   (state.photoStatus = "success"),
//     (state.userDetails = { ...state.userDetails, image: payload });
// })
// .addCase(updatePhoto.rejected, (state, action) => {
//   state.photoStatus = "failed";
// })
// .addCase(updateProfile.pending, (state, action) => {
//   state.updateStatus = "pending";
// })
// .addCase(updateProfile.fulfilled, (state, { payload }) => {
//   (state.updateStatus = "success"),
//     (state.userDetails = {
//       ...state.userDetails,
//       firstName: payload.firstName,
//       lastName: payload.lastName,
//       userName: payload.userName,
//       email: payload.email,
//       phone: payload.phone,
//       occupation: payload.occupation,
//       about: payload.about,
//     });
// })
// .addCase(updateProfile.rejected, (state, action) => {
//   state.updateStatus = "failed";
// })
//       .addCase(updateAddress.pending, (state, action) => {
//         state.addressStatus = "pending";
//       })
//       .addCase(updateAddress.fulfilled, (state, { payload }) => {
//         (state.addressStatus = "success"),
//           (state.userDetails = {
//             ...state.userDetails,
//             country: payload.country,
//             state: payload.state,
//             postalCode: payload.postalCode,
//           });
//       })
//       .addCase(updateAddress.rejected, (state, action) => {
//         state.addressStatus = "failed";
//       })
//       .addCase(deleteUser.pending, (state, action) => {
//         state.deleteStatus = "pending";
//       })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.deleteStatus = "success";
//       })
//       .addCase(deleteUser.rejected, (state, action) => {
//         state.deleteStatus = "failed";
//       })
//       .addCase(updatePassword.pending, (state, action) => {
//         state.passwordStatus = "pending";
//       })
//       .addCase(updatePassword.fulfilled, (state, action) => {
//         state.passwordStatus = "success";
//       })
//       .addCase(updatePassword.rejected, (state, action) => {
//         state.passwordStatus = "failed";
//       })
//       .addCase(deleteBlog.pending, (state, action) => {
//         state.deleteBlogStatus = "pending";
//       })
//       .addCase(deleteBlog.fulfilled, (state, { payload }) => {
//         const allBlogs = state.userDetails.allBlogs.filter(
//           (each) => each._id !== payload._id
//         );
//         state.userDetails = { ...state.userDetails, allBlogs };
//         state.deleteBlogStatus = "success";
//       })
//       .addCase(deleteBlog.rejected, (state, action) => {
//         state.deleteBlogStatus = "failed";
//       });
//   },
// });

// export default porfileSlice.reducer;
