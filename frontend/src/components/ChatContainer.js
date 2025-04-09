import React, { useEffect, useState } from "react";
import MessageContainer from "./MessageContainer";
import InputContainer from "./InputContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getLatestMessageEveryUser,
  getMessages,
} from "../slices/messageslice/MessageSlice";
import { socket } from "../lib/socket.js";
import ChatHeader from "./ChatHeader.js";
import { Box } from "@mui/material";
import { setStatus } from "../slices/userslice/UserSlice.js";
import {
  fetchLatestGroupMessages,
  getGroupMessage,
  getGroups,
} from "../slices/groupSlice/GroupSlice.js";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { messages, isMessageLoading } = useSelector((state) => state.message);
  const { anotherUser, status, currentUser, whichIsClicked } = useSelector(
    (state) => state.user
  );
  const { group, groups, groupMessage } = useSelector((state) => state.group);
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    const sg = groups.find((g) => g._id === group.id);
    setGroupMembers(sg?.groupMembers);
  }, [groups, group.id]);

  useEffect(() => {
    const handleNewGroupMessage = (message) => {
      if (message) {
        dispatch(getGroupMessage({ gid: group.id }));
        dispatch(fetchLatestGroupMessages());
      }
    };
    socket.on("newgroupmessage", handleNewGroupMessage);
    return () => socket.off("newgroupmessage", handleNewGroupMessage);
  }, [dispatch, group.id]);

  useEffect(() => {
    const handleTyping = (status) => {
      dispatch(setStatus({ userId: status.userId, status: status.status }));
    };

    socket.on("typing", handleTyping);
    return () => socket.off("typing", handleTyping);
  }, [dispatch]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      if (message) {
        dispatch(getMessages(anotherUser.id));
        dispatch(getLatestMessageEveryUser());
      }
    };
    socket.on("new message", handleNewMessage);
    return () => socket.off("new message", handleNewMessage);
  }, [dispatch, anotherUser.id]);

  useEffect(() => {
    if (anotherUser?.id) {
      dispatch(getMessages(anotherUser.id));
    }
  }, [dispatch, anotherUser?.id]);

  useEffect(() => {
    if (whichIsClicked === "more") {
      dispatch(getGroups(anotherUser.id));
    }
  }, [dispatch, whichIsClicked, anotherUser.id]);

  const userStatus = status.find((s) => s.userId === anotherUser?.id);
  return (
    <Box
      className={`col-12 rounded-4 p-0 position-relative`}
      style={{
        height: "100%",
        backgroundImage:
          "url(https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg)",
      }}
    >
      {anotherUser?.id && anotherUser?.userName && userStatus && (
        <>
          <ChatHeader
            userName={anotherUser.userName}
            status={userStatus.status}
          />
          <MessageContainer
            messages={messages}
            isMessageLoading={isMessageLoading}
          />
          <InputContainer id={anotherUser.id} uid={currentUser.id} />
        </>
      )}

      {group?.id && group?.groupname && (
        <>
          <ChatHeader userName={group.groupname} groupMembers={groupMembers} />
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
