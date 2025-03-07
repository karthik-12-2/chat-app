import { Avatar, Box } from "@mui/material";
import FormattedTime from "../FormattedTime";
import ImageIcon from "@mui/icons-material/Image";

const SingleChat = ({
  users,
  currentUser,
  selectedUser,
  setSelectedUser,
  onlineUser,
  latestMessages,
}) => {

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        width: "100%",
        position: "absolute",
        marginTop: "10px",
        height: "70vh",
      }}
      className="overflow-y-scroll pe-1"
    >
      {users.length > 0 &&
        users.map((user) => {
          if (currentUser.id === user._id) return null;
          const isOnline = onlineUser?.some((online) => online.id === user._id);
          const lastMessage = latestMessages.find(
            (msg) =>
              (msg.senderId === currentUser.id &&
                msg.receiverId === user._id) ||
              (msg.senderId === user._id && msg.receiverId === currentUser.id)
          );
          return (
            <Box
              component="button"
              onClick={() =>
                setSelectedUser({
                  id: user._id,
                  userName: user.userName,
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
              key={user._id}
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
                    {isOnline && (
                      <div
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
                    )}
                  </div>
                  <Box sx={{ marginLeft: 2, lineHeight: 0.9 }}>
                    <p className="d-lg-flex flex-row d-sm-none">
                      {user.userName}
                    </p>
                    {lastMessage && (
                      <p
                        style={{ marginBottom: "0px" }}
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

      {false && (
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "150px",
            backgroundColor: "#ffffff",
            padding: "10px",
            zIndex: 9999,
          }}
        >
          <p style={{ fontWeight: "bold" }}>Move to Personal</p>
        </div>
      )}
    </div>
  );
};

export default SingleChat;
