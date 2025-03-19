import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  loading: "idle",
  error: null,
};

const youtubeSlice = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    fetchVideoListFulfilled(state) {
      state.videos = [];
      state.loading = "fulfilled";
    },
  },
});

export const { fetchVideoListFulfilled } = youtubeSlice.actions;

export const fetchVideoList = () => (dispatch) => {
  dispatch(fetchVideoListF
