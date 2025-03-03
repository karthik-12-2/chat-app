import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/group/users/creategroup",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const sendGroupMessage = createAsyncThunk(
  "group/sendGroupMessage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/group/messages/sendmessage/${data.gid}/${data.sid}`,
        { message: data.message, image: data.image }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getGroupMessage = createAsyncThunk(
  "group/getGroupMessage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/group/messages/getmessage/${data.gid}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getAllGroups = createAsyncThunk(
  "group/getAllGroups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/group/users/getallgroups");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getGroups = createAsyncThunk(
  "group/getGroups",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/group/users/getgroups/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchLatestGroupMessages = createAsyncThunk(
  "message/fetchLatestGroupMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/group/messages/fetchlatestgroupmessages/message`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    opengroup: false,
    groups: [],
    group: { id: "", groupname: "" },
    groupMessage: [],
    latestMessage: [],
    samePersonsinGroup: [],
  },
  reducers: {
    setGroup: (state, action) => {
      state.group.id = action.payload.id;
      state.group.groupname = action.payload.groupname;
    },
    setOpen: (state, action) => {
      state.opengroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, () => {})

      .addCase(createGroup.fulfilled, (state) => {
        state.opengroup = false;
        toast.success("New group created Successfully");
      })

      .addCase(createGroup.rejected, () => {})

      .addCase(getAllGroups.pending, () => {})

      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.groups = action.payload.groupsforwhichuser;
      })

      .addCase(getAllGroups.rejected, () => {})

      .addCase(getGroups.pending, () => {})

      .addCase(getGroups.fulfilled, (state, action) => {
        state.samePersonsinGroup = action.payload.group;
      })

      .addCase(getGroups.rejected, () => {
        console.log("rejected");
      })

      .addCase(sendGroupMessage.pending, () => {})

      .addCase(sendGroupMessage.fulfilled, (state, action) => {
        toast.success("msg send Successfully");
      })

      .addCase(sendGroupMessage.rejected, () => {})

      .addCase(getGroupMessage.pending, () => {})

      .addCase(getGroupMessage.fulfilled, (state, action) => {
        state.groupMessage = action.payload;
      })

      .addCase(getGroupMessage.rejected, () => {})

      .addCase(fetchLatestGroupMessages.pending, () => {})

      .addCase(fetchLatestGroupMessages.fulfilled, (state, action) => {
        state.latestMessage = action.payload;
      })

      .addCase(fetchLatestGroupMessages.rejected, () => {});
  },
});

export const { setGroup, setOpen } = groupSlice.actions;

export default groupSlice.reducer;
