import React, { useEffect, useState } from "react";
import MessageContainer from "./MessageContainer";
import InputContainer from "./InputContainer";
import { useDispatch, useSelector } from "react-redux";
import { getLatestMessageEveryUser, getMessages } from "../slices/messageslice/MessageSlice";
import { socket } from "../lib/socket.js";
import ChatHeader from "./ChatHeader.js";
import { Box } from "@mui/material";
import { setStatus } from "../slices/userslice/UserSlice.js";
import { fetchLatestGroupMessages, getGroupMessage, getGroups } from "../slices/groupSlice/GroupSlice.js";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { messages, isMessageLoading } = useSelector((state) => state.message);
  const { anotherUser, status, currentUser, whichIsClicked } = useSelector(
    (state) => state.user
  );
  const { group, groups, groupMessage } = useSelector((state) => state.group);
  
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    const sg = groups.find((g) => g._id === group.id);
    setSelectedGroup(sg);
    setGroupMembers(sg?.groupMembers);
  }, [groups, selectedGroup, group.id]);

  useEffect(() => {
    socket.on("newgroupmessage", (message) => {
      if (message) {
        dispatch(getGroupMessage({ gid: group.id }));
        dispatch(fetchLatestGroupMessages());
      }
    });
  }, [dispatch, group.id]);

  useEffect(() => {
    socket.on("typing", (status) => {
      dispatch(setStatus({ userId: status.userId, status: status.status }));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on("new message", (message) => {
      if (message) {
        console.log("New message received:", message);
        dispatch(getMessages(anotherUser.id));
        dispatch(getLatestMessageEveryUser());
      }
    });
    return () => socket.off("new message");
  }, [dispatch, anotherUser]);

  useEffect(() => {
    if (anotherUser?.id) {
      dispatch(getMessages(anotherUser.id));
    }
  }, [dispatch, anotherUser?.id]);

  useEffect(() => {
    if(whichIsClicked === 'more') {
      dispatch(getGroups(anotherUser.id))
    }
  }, [dispatch, whichIsClicked, anotherUser.id])

  return (
    <Box
      className={`col-12 ms-2 rounded-4 p-0 position-relative`}
      style={{
        height: "100%",
        backgroundImage:
          "url(https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg)",
      }}
    >
      {anotherUser?.id &&
        anotherUser?.username &&
        status?.map(
          (s) =>
            s.userId === anotherUser.id && (
              <>
                <ChatHeader
                  username={anotherUser.username}
                  status={s.status}
                />
                <MessageContainer
                  messages={messages}
                  isMessageLoading={isMessageLoading}
                />
                <InputContainer id={anotherUser.id} uid={currentUser.id} />
              </>
            )
        )}

      {group?.id && group?.groupname && (
        <>
          <ChatHeader
            username={group.groupname}
            // status={}
            groupMembers={groupMembers}
          />
          <MessageContainer
            groups={groups}
            messages={groupMessage}
            whoSends={groupMembers}
            isMessageLoading={isMessageLoading}
          />
          <InputContainer id={currentUser.id} uid={group.id} group={true} />
        </>
      )}
    </Box>
  );
};

export default ChatContainer;
