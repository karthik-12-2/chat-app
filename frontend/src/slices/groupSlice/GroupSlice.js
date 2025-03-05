import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

// create group
export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (data, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.post(
        "/group/users/creategroup",
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Send Group Message
export const sendGroupMessage = createAsyncThunk(
  "group/sendGroupMessage",
  async (data, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.post(
        `/group/messages/sendmessage/${data.gid}/${data.sid}`,
        { message: data.message, image: data.image }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get Group Message
export const getGroupMessage = createAsyncThunk(
  "group/getGroupMessage",
  async (data, { rejectWithValue }) => {
    if(data.gid) //TODO send the data.gid without empty
      try {
        const { data: response } = await axiosInstance.get(
          `/group/messages/getmessage/${data.gid}`
        );
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
  }
);

// Get All Groups
export const getAllGroups = createAsyncThunk(
  "group/getAllGroups",
  async (_, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.get(
        "/group/users/getallgroups"
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get Group for a specific user
export const getGroups = createAsyncThunk(
  "group/getGroups",
  async (id, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.get(
        `/group/users/getgroups/${id}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch latest Group messages
export const fetchLatestGroupMessages = createAsyncThunk(
  "message/fetchLatestGroupMessages",
  async (_, { rejectWithValue }) => {
    try {
      const { data: response } = await axiosInstance.get(
        `/group/messages/fetchlatestgroupmessages/message`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// InitialState
const initialState = {
  opengroup: false,
  groups: [],
  group: { id: "", groupname: "" },
  groupMessage: [],
  latestMessage: [],
  samePersonsinGroup: [],
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroup: (state, { payload }) => {
      state.group = { id: payload.id, groupname: payload.groupname };
    },
    setOpen: (state, { payload }) => {
      state.opengroup = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, () => {
        toast.loading("Creating group...");
      })
      .addCase(createGroup.fulfilled, (state) => {
        state.opengroup = false;
        toast.dismiss();
        toast.success("New group created Successfully");
      })
      .addCase(createGroup.rejected, (state, { payload }) => {
        toast.dismiss();
        toast.error(payload || "Failed to create group.");
      })

      .addCase(getAllGroups.fulfilled, (state, { payload }) => {
        state.groups = payload.groupsforwhichuser;
      })
      .addCase(getAllGroups.rejected, (_, { payload }) => {
        toast.error(payload || "Failed to fetch groups.");
      })

      .addCase(getGroups.fulfilled, (state, { payload }) => {
        state.samePersonsinGroup = payload.group;
      })
      .addCase(getGroups.rejected, (_, { payload }) => {
        toast.error(payload || "Failed to fetch user groups.");
      })

      .addCase(sendGroupMessage.fulfilled, (state, {payload}) => {
        toast.success("Message sent successfully!");
        if(payload){
          state.groupMessage.push(payload)
        }
      })
      .addCase(sendGroupMessage.rejected, (_, { payload }) => {
        toast.error(payload || "Failed to send message.");
      })

      .addCase(getGroupMessage.fulfilled, (state, { payload }) => {
        state.groupMessage = payload;
      })
      .addCase(getGroupMessage.rejected, (_, { payload }) => {
        toast.error(payload || "Failed to fetch messages.");
      })

      .addCase(fetchLatestGroupMessages.fulfilled, (state, { payload }) => {
        state.latestMessage = payload;
      })
      .addCase(fetchLatestGroupMessages.rejected, (_, { payload }) => {
        toast.error(payload || "Failed to fetch latest messages.");
      });
  },
});

export const { setGroup, setOpen } = groupSlice.actions;

export default groupSlice.reducer;
