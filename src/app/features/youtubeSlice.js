import { createSlice } from "@reduxjs/toolkit";

const youtubeSlice = createSlice({
  name: "youtube",
  initialState: { videos: [], loading: "idle" },
  reducers: {
    fetchVideoListFulfilled(state) {
      state.videos = [];
      state.loading = "fulfilled";
    },
  },
});

export const { fetchVideoListFulfilled } = youtubeSlice.actions;

export const fetchVideoList = () => (dispatch) => {
  dispatch(fetchVideoListFulfilled());
};

export default youtubeSlice.reducer;
