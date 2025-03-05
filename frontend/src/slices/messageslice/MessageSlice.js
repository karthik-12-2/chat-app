import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

// Get message
export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (id, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.get(`/message/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get latestMessage
export const getLatestMessage = createAsyncThunk(
  "message/getLatestMessage",
  async (id, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.get(
        `/message/getLatestMessage/${id}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get latest Message for Every user
export const getLatestMessageEveryUser = createAsyncThunk(
  "message/getLatestMessageEveryUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.get(
        `/message/getlatestmessageeveryuser/message`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// SendMessage
export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (user, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.post(
        `/message/send/${user.id}`,
        { message: user.message, image: user.image }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const  initialState = {
  messages: [],
  isMessageLoading: false,
  latestMessages: [],
}

export const messageSlice = createSlice({
  name: "message",
 initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isMessageLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, {payload}) => {
        state.isMessageLoading = false;
        if (payload) {
          state.messages = payload;
        }
      })
      .addCase(getMessages.rejected, (state) => {
        state.isMessageLoading = false;
      })

      .addCase(sendMessage.pending, (state) => {
        state.isMessageLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, {payload}) => {
        state.isMessageLoading = false;
        if (payload) {
          state.messages.push(payload);
        }
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isMessageLoading = false;
      })

      .addCase(getLatestMessageEveryUser.pending, (state) => {
        state.isMessageLoading = true;
      })
      .addCase(getLatestMessageEveryUser.fulfilled, (state, {payload}) => {
        state.isMessageLoading = false;
        state.latestMessages = payload;
      })
      .addCase(getLatestMessageEveryUser.rejected, (state) => {
        state.isMessageLoading = false;
      });
  },
});

export default messageSlice.reducer;
