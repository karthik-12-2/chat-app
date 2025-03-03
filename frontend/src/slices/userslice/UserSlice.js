import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { socket } from "../../lib/socket";

// Async action for signup
export const signup = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async action for login
export const login = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async action for checking user
export const checkauth = createAsyncThunk(
  "user/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/check");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/getAllUsers");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    currentUser: { id: "", username: "" },
    anotherUser: { id: "", username: "" },
    error: null,
    isRegistered: false,
    isLoggedin: localStorage.getItem("isLoggedin") === "true",
    status: [],
    whichIsClicked: null
  },
  reducers: {
    logout: (state) => {
      state.isLoggedin = false;
      localStorage.removeItem("isLoggedin");
      toast.success("LoggedOut successfully");
    },
    invalid: (state) => {
      state.isLoggedin = false;
      localStorage.removeItem("isLoggedin");
      toast.error(`Your's token has been expired`);
    },
    setUserToChatId: (state, action) => {
      state.anotherUser.id = action.payload.id;
      state.anotherUser.username = action.payload.username;
    },
    setStatus: (state, action) => {
      const index = state.status.findIndex(
        (user) => user.userId === action.payload.userId
      );
      if (index !== -1) {
        state.status[index].status = action.payload.status;
      } else {
        state.status.push(action.payload);
      }
    },
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
    setWhichIsClicked: (state, action) => {
      state.whichIsClicked = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // signup builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegistered = true;
        toast.success("Registered Successfully");
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Registration Failed");
      })

      // login builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedin = true;
        socket.emit("loggedin", action.payload);
        localStorage.setItem("isLoggedin", "true");
        toast.success("Logged in Successfully");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Login Failed");
      })

      // check user exists or valid
      .addCase(checkauth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkauth.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser.id = action.payload._id;
        state.currentUser.username = action.payload.userName;
        socket.emit("loggedin", {
          id: action.payload._id,
          username: action.payload.userName,
        });
      })
      .addCase(checkauth.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // get all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        socket.emit("allusers", action.payload);
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // reseting state value to the signup
      .addMatcher(
        (action) => action.type.startsWith("user/signup"),
        (state) => {
          state.error = null;
        }
      );
  },
});

export const { logout, invalid, setUserToChatId, setStatus, setAllUsers, setWhichIsClicked } =
  userSlice.actions;

export default userSlice.reducer;
