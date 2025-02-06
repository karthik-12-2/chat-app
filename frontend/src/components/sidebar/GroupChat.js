import AddIcon from "@mui/icons-material/Add";
import { Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormattedTime from "../FormattedTime";
import {
  fetchLatestGroupMessages,
  getGroupMessage,
  setGroup,
  setOpen,
} from "../../slices/groupSlice/GroupSlice";

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

  function hanldeAddGroup(e) {
    dispatch(setOpen(true));
  }

  return (
    <div style={{ width: "100%", marginTop: "0px" }}>
      <div className="d-flex justify-content-between bg-white rounded-3 p-2">
        <p> Create a new Group</p>
        <button className="rounded-5 border-1" onClick={hanldeAddGroup}>
          <AddIcon />
        </button>
      </div>
      <div
        id="groups"
        className="mt-4 overflow-y-scroll pe-2"
        style={{ height: "60vh" }}
      >
        {groups?.map((group, i) => (
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
            key={i}
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
                  {latestMessage
                    .filter((message) => message.receiverId === group._id)
                    .map((message) => (
                      <p
                        key={message.id} 
                        style={{
                          marginBottom: "0px",
                        }}
                         className="d-sm-none d-lg-flex flex-row "
                      >
                        {message.message.length >= 20 ? message.message.slice(0,15)+ "..." : message.message}
                      </p>
                    ))}
                </Box>
              </Box>
              <p className="d-lg-block d-sm-none">
                {latestMessage.map(
                  (latestMessage) =>
                    latestMessage.receiverId === group._id && (
                      <FormattedTime time={latestMessage.updatedAt} />
                    )
                )}
              </p>
            </>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default GroupChat;
