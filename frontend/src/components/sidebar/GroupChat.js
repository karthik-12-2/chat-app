import AddIcon from "@mui/icons-material/Add";
import { Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormattedTime from "../FormattedTime";
import ImageIcon from "@mui/icons-material/Image";
import {
  fetchLatestGroupMessages,
  getGroupMessage,
  setAllGroups,
  setGroup,
  setOpen,
} from "../../slices/groupSlice/GroupSlice";
import { socket } from "../../lib/socket";

const GroupChat = () => {
  const dispatch = useDispatch();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { groups, latestMessage } = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(fetchLatestGroupMessages());
  }, [dispatch]);

  useEffect(() => {
    if (selectedGroup?.id && selectedGroup?.groupname) {
      dispatch(setGroup(selectedGroup));
      dispatch(getGroupMessage({ gid: selectedGroup.id }));
    }
  }, [dispatch, selectedGroup]);

  const handleAddGroup = (e) => {
    dispatch(setOpen(true));
  };

  useEffect(() => {
    const handleAllGroups = (groups) => {
      dispatch(setAllGroups(groups));
    };

    socket.on("allgroups", handleAllGroups);
    return () => socket.off("allgroups", handleAllGroups);
  }, [dispatch]);


  return (
    <div style={{ width: "100%", marginTop: "0px" }}>
      <div className="d-flex justify-content-between bg-white rounded-3 p-2">
        <p> Create a new Group</p>
        <button className="rounded-5 border-1" onClick={handleAddGroup}>
          <AddIcon />
        </button>
      </div>
      <div
        id="groups"
        className="mt-3 overflow-y-scroll "
        style={{ height: "56vh" }}
      >
        {groups?.map((group, i) => {
          const lastMessage = latestMessage.find(
            (msg) => msg.receiverId === group._id
          );
          return (
            <Box
              component="button"
              onClick={() =>
                setSelectedGroup({
                  id: group._id,
                  groupname: group.groupName,
                })
              }
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: 1,
                backgroundColor:
                  selectedGroup?.id === group._id ? "#d3d3d3" : "inherit",
                border: "none",
                borderRadius: "10px",
                marginBottom: "5px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
              key={group._id}
            >
              <>
                <Box display="flex" position="relative">
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: "50px",
                        height: "50px",
                        position: "relative",
                      }}
                    ></Avatar>
                  </div>
                  <Box sx={{ marginLeft: 2, lineHeight: 0.9 }}>
                    <p className="d-lg-flex flex-row d-sm-none">
                      {group.groupName}
                    </p>
                    {lastMessage && (
                      <p
                        style={{
                          marginBottom: "0px",
                        }}
                        className="d-sm-none d-lg-flex flex-row "
                      >
                        {lastMessage.image ? (
                          <>
                            <ImageIcon
                              sx={{ position: "relative", bottom: "5px" }}
                            />{" "}
                            Image
                          </>
                        ) : lastMessage.message.trim().length >= 20 ? (
                          lastMessage.message.trim().slice(0, 15) + "..."
                        ) : (
                          lastMessage.message || ""
                        )}
                      </p>
                    )}
                  </Box>
                </Box>
                {lastMessage && (
                  <p className="d-lg-block d-sm-none">
                    <FormattedTime time={lastMessage.updatedAt} />
                  </p>
                )}
              </>
            </Box>
          );
        })}
      </div>
    </div>
  );
};

export default GroupChat;
