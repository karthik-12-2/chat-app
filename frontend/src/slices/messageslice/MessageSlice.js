import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/message/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getLatestMessage = createAsyncThunk(
  "message/getLatestMessage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/message/getLatestMessage/${id}`);
      // console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getLatestMessageEveryUser = createAsyncThunk(
  "message/getLatestMessageEveryUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/message/getlatestmessageeveryuser/message`);
      // console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/message/send/${user.id}`, {message: user.message, image: user.image});
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    isMessageLoading: false,
    latestMessages: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isMessageLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isMessageLoading = false;
        if (action.payload) {
          state.messages = action.payload;
        }
      })
      .addCase(getMessages.rejected, (state) => {
        state.isMessageLoading = false;
      })

      .addCase(sendMessage.pending, (state) => {
        state.isMessageLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isMessageLoading = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isMessageLoading = false;
      })
      .addCase(getLatestMessageEveryUser.pending, (state) => {
        state.isMessageLoading = true;
      })
      .addCase(getLatestMessageEveryUser.fulfilled, (state, action) => {
        state.isMessageLoading = false;
        state.latestMessages = action.payload
      })
      .addCase(getLatestMessageEveryUser.rejected, (state) => {
        state.isMessageLoading = false;
      })
  },
});

export default messageSlice.reducer;
