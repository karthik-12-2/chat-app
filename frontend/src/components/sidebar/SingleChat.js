import { Avatar, Box } from "@mui/material";
import FormattedTime from "../FormattedTime";
import { useEffect } from "react";

const SingleChat = ({
  users,
  currentUser,
  selectedUser,
  setSelectedUser,
  onlineUser,
  latestMessages,
}) => {

  // const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e, user) => {
    e.preventDefault();
    // setContextMenu(user);
    // console.log(user)
  }
  console.log('currentuser', currentUser)

  users.map(user => user._id &&
    latestMessages.filter(latestMessage => latestMessage.senderId === currentUser.id && latestMessage.receiverId === user._id).map(latestMessage => console.log(latestMessage))
      )
  // useEffect(() => {
  // }, [])
  return (
    <div style={{width: '100%', position: 'absolute', marginTop: '10px', height: '70vh'}} className="overflow-y-scroll pe-1">
      {users.length > 0 ? (
        users.map(
          (user, i) =>
            currentUser.id !== user._id && (
              <Box
                component="button"
                onClick={() =>
                  setSelectedUser({
                    id: user._id,
                    username: user.userName,
                  })
                }
                onContextMenu={(e) => handleContextMenu(e, user)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: 1,
                  backgroundColor:
                    selectedUser?.id === user._id ? "#d3d3d3" : "inherit",
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
                      {onlineUser?.map((online) =>
                        online.id === user._id ? (
                          <div
                            key={online.id}
                            style={{
                              position: "absolute",
                              right: "-3px",
                              bottom: "0",
                              width: "15px",
                              height: "15px",
                              backgroundColor: "green",
                              borderRadius: "50%",
                              border: "1px  solid white",
                            }}
                          />
                        ) : (
                          ""
                        )
                      )}
                    </div>
                    <Box sx={{ marginLeft: 2, lineHeight: 0.9 }}>
                      <p className="d-lg-flex flex-row d-sm-none">
                        {user.userName}
                      </p>
                        {latestMessages.filter(
                          (latestMessage) =>
                            latestMessage.senderId === currentUser.id && latestMessage.receiverId === user._id).map( (latestMessage) =>
                      <p
                        style={{ marginBottom: "0px" }}
                        className="d-sm-none d-lg-flex flex-row "
                      >
                        
                            {latestMessage.message.length >= 20 ? latestMessage.message.slice(0,15)+ "..." : latestMessage.message}
                      </p>
                        )}
                    </Box>
                  </Box>
                  <p className="d-lg-block d-sm-none">
                    {latestMessages.map(
                      (latestMessage) =>
                        latestMessage.senderId  === currentUser.id && latestMessage.receiverId === user._id && (
                          <FormattedTime time={latestMessage.updatedAt} />
                        )
                    )}
                  </p>
                </>
              </Box>
            )
        )
      ) : (
        <Box display="flex" justifyContent="space-between" marginBottom="10px">
          <p>No messages</p>
        </Box>
      )}

      {false && (<div
      style={{
        position: 'absolute',
        width: '200px',
        height: '150px',
        backgroundColor: "#ffffff",
        padding: "10px",
        zIndex: 9999,
      }}
      >
        <p style={{ fontWeight: "bold" }}>
            Move to Personal
          </p>
        </div>)}
    </div>
  );
};

export default SingleChat;
