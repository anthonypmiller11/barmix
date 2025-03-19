import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";

const initialState = {
  videos: [],
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const youtubeSlice = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    fetchVideoListFulfilled(state) {
      state.videos = [];
      state.loading = HTTP_STATUS.FULFILLED;
    },
  },
});

export const { fetchVideoListFulfilled } = youtubeSlice.actions;

export const fetchVideoList = () => (dispatch) => {
  dispatch(fetchVideoListFulfilled());
};

export default youtubeSlice.reducer;
