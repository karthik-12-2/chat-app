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
        {message: data.message, image: data.image}
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
        `/group/messages/getmessage/${data.gid}`,
      );
      console.log(response.data)
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
      const response = await axiosInstance.get(`/group/messages/fetchlatestgroupmessages/message`);
      console.log(response.data)
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
    samePersonsinGroup: []
  },
  reducers: {
    setGroup: (state, action) => {
      state.group.id = action.payload.id;
      state.group.groupname = action.payload.groupname;
    },
    setOpen: (state, action) => {
      // console.log(action.payload)
      state.opengroup = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, () => {
        // console.log("pending");
      })
      .addCase(createGroup.fulfilled, (state) => {
        state.opengroup = false
        toast.success("New group created Successfully");
      })
      .addCase(createGroup.rejected, () => {
        // console.log("rejected");
      })

      .addCase(getAllGroups.pending, () => {
        // console.log("pending");
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.groups = action.payload.groupsforwhichuser;
      })
      .addCase(getAllGroups.rejected, () => {
        // console.log("rejected");
      })
      .addCase(getGroups.pending, () => {
        // console.log("pending");
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        console.log(action.payload)
        state.samePersonsinGroup = action.payload.group;
      })
      .addCase(getGroups.rejected, () => {
        console.log("rejected");
      })

      .addCase(sendGroupMessage.pending, () => {
        // console.log("pending");
      })
      .addCase(sendGroupMessage.fulfilled, (state, action) => {
        // state.groups = action.payload.groupsforwhichuser;
        toast.success("msg send Successfully");
      })
      .addCase(sendGroupMessage.rejected, () => {
        // console.log("rejected");
      })

      .addCase(getGroupMessage.pending, () => {
        // console.log("pending");
      })
      .addCase(getGroupMessage.fulfilled, (state, action) => {
        state.groupMessage = action.payload;
        
      })
      .addCase(getGroupMessage.rejected, () => {
        // console.log("rejected");
      })

      .addCase(fetchLatestGroupMessages.pending, () => {
        // console.log("pending");
      })
      .addCase(fetchLatestGroupMessages.fulfilled, (state, action) => {
        // console.log('fulfilled')
        state.latestMessage = action.payload;
        
      })
      .addCase(fetchLatestGroupMessages.rejected, () => {
        // console.log("rejected");
      });
  },
});

export const { setGroup, setOpen } = groupSlice.actions;

export default groupSlice.reducer;
