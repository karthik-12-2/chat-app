import { Box, Avatar, Divider, Badge, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SideBarSkeleton from "./skeletons/SideBarSkeleton";
import { useEffect, useState } from "react";
import {
  setAllUsers,
  setStatus,
  setUserToChatId,
  setWhichIsClicked,
} from "../slices/userslice/UserSlice";
import { getLatestMessageEveryUser } from "../slices/messageslice/MessageSlice";
import { socket } from "../lib/socket";
import SingleChat from "./sidebar/SingleChat";
import PersonalChat from "./sidebar/PersonalChat";
import GroupChat from "./sidebar/GroupChat";
import { setGroup } from "../slices/groupSlice/GroupSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const { users, loading, isLoggedin, currentUser, anotherUser } = useSelector(
    (state) => state.user
  );
  const { latestMessages } = useSelector((state) => state.message);
  const { group } = useSelector((state) => state.group);
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUser, setOnlineUser] = useState(null);
  const [activeButton, setActiveButton] = useState("all");
  const [totalusers, setTotalUsers] = useState(0);

  console.log(onlineUser);
  useEffect(() => {
    if (group.id === "" && group.groupname === "" && !isLoggedin) {
      setActiveButton("all");
    }
  }, [activeButton, group.groupname, group.id, isLoggedin]);

  useEffect(() => {
    if (selectedUser?.id && selectedUser?.userName) {
      dispatch(
        setUserToChatId({
          id: selectedUser.id,
          userName: selectedUser.userName,
        })
      );
    }
  }, [selectedUser, dispatch]);

  useEffect(() => {
    const handleAllUsers = (users) => {
      dispatch(setAllUsers(users));
    };
    socket.on("allusers", handleAllUsers);

    return () => socket.off("allusers", handleAllUsers);
  }, [dispatch]);

  useEffect(() => {
    const handleLoggedIn = (user) => {
      setOnlineUser(user);
    };
    socket.on("loggedinuser", handleLoggedIn);

    return () => socket.off("loggedinuser", handleLoggedIn);
  }, []);

  useEffect(() => {
    const handleLoggedOut = (user) => {
      setOnlineUser((prev) => prev?.filter((online) => online.id === user.id));
    };
    socket.on("loggedoutuser", handleLoggedOut);

    return () => socket.off("loggedoutuser", handleLoggedOut);
  }, []);

  useEffect(() => {
    users.forEach((user) => {
      const online = onlineUser?.some((online) => online.id === user._id);
      if (online) {
        dispatch(setStatus({ userId: user._id, status: "online" }));
      } else {
        dispatch(setStatus({ userId: user._id, status: "offline" }));
      }
    });
  }, [onlineUser, users, dispatch]);

  useEffect(() => {
    dispatch(getLatestMessageEveryUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedin) {
      setSelectedUser(null);
    }
  }, [isLoggedin]);

  useEffect(() => {
    const handleTotalUsers = (totalOnlineUsers) => {
      setTotalUsers(totalOnlineUsers);
    };
    socket.on("totalusers", handleTotalUsers);

    return () => socket.off("totalusers", handleTotalUsers);
  }, []);

  const handleClick = (what) => () => {
    setActiveButton(what);
    dispatch(setUserToChatId({ id: "", userName: "" }));
    dispatch(setGroup({ id: "", groupname: "" }));
    if (what !== "more") {
      dispatch(setWhichIsClicked(null));
    }
  };

  return (
    isLoggedin && (
      <Box
        sx={{
          maxWidth: { md: "25%", sm: "10%" },
          backgroundColor: "rgba(245, 245, 245, 0.50)",
          borderRadius: "12px",
          color: "red",
          marginTop: 0.5,
          marginBottom: 0,
          paddingX: { sm: 0.5, md: 3 },
          paddingY: 3,
          marginRight: { sm: 1, md: 1 },
          marginLeft: { sm: 1, md: 0 },
          position: "relative",
        }}
      >
        {loading ? (
          <SideBarSkeleton />
        ) : (
          <>
            <Box display="flex">
              <Avatar sx={{ width: 60, height: 60 }} />
              <Box sx={{ marginLeft: 2, lineHeight: 1.2 }}>
                {(anotherUser?.id && anotherUser?.userName) ||
                (group?.id && group?.groupname) ? (
                  <>
                    <Typography className="text-success d-sm-none d-lg-block">
                      {onlineUser
                        ?.slice(0, 3)
                        .map((user) => user.userName)
                        .join(", ")}
                    </Typography>
                    <p className="text-success d-sm-none d-lg-inline-block mt-1">
                      {totalusers} users online
                    </p>
                  </>
                ) : (
                  <>
                    <Typography className="text-success d-sm-none d-lg-block">
                      {onlineUser
                        ?.slice(0, 3)
                        .map((user) => user.userName)
                        .join(", ")}
                    </Typography>
                    <p className="text-success d-sm-none d-lg-inline-block mt-1">
                      {totalusers} users online
                    </p>
                  </>
                )}
              </Box>
            </Box>

            <Divider
              sx={{
                border: "1px solid gray",
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{
                height: "40px",
                width: "auto",
                backgroundColor: "whitesmoke",
                display: "flex",
                justifyContent: "space-around",
                padding: "5px",
                paddingInline: "5px",
                borderRadius: "25px",
                marginBottom: "10px",
                position: "relative",
              }}
            >
              {" "}
              <button
                style={{
                  height: "30px",
                  color: "blue",
                  borderRadius: "15px",
                  backgroundColor:
                    activeButton === "all" ? "lightgreen" : "whitesmoke",
                  width: "20%",
                  paddingTop: "2px",
                  paddingLeft: "6px",
                  border: "none",
                  position: "relative",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "lightgreen")
                }
                onMouseOut={(e) => {
                  if (activeButton !== "all") {
                    e.currentTarget.style.backgroundColor = "";
                  }
                }}
                onClick={handleClick("all")}
              >
                All
              </button>
              {/* TODO : commentout if you want personals */}
              {/* <button
                style={{
                  height: "30px",
                  color: "blue",
                  borderRadius: "15px",
                  backgroundColor:
                    activeButton === "personals" ? "lightgreen" : "whitesmoke",
                  width: "30%",
                  paddingTop: "2px",
                  paddingLeft: "6px",
                  border: "none",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "lightgreen")
                }
                onMouseOut={(e) => {
                  if (activeButton !== "personals") {
                    e.currentTarget.style.backgroundColor = "";
                  }
                }}
                onClick={handleClick("personals")}
              >
                Personals
              </button> */}
              <button
                style={{
                  height: "30px",
                  color: "blue",
                  borderRadius: "15px",
                  backgroundColor:
                    activeButton === "group" ? "lightgreen" : "whitesmoke",
                  width: "20%",
                  paddingTop: "2px",
                  paddingLeft: "6px",
                  border: "none",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "lightgreen")
                }
                onMouseOut={(e) => {
                  if (activeButton !== "group") {
                    e.currentTarget.style.backgroundColor = "";
                  }
                }}
                onClick={handleClick("group")}
              >
                Group
              </button>
            </div>
            <div className="position-relative">
              {activeButton === "all" && (
                <SingleChat
                  users={users}
                  currentUser={currentUser}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  onlineUser={onlineUser}
                  latestMessages={latestMessages}
                />
              )}
              {activeButton === "personals" && <PersonalChat />}
              {activeButton === "group" && <GroupChat />}
            </div>
          </>
        )}
      </Box>
    )
  );
};

export default SideBar;
