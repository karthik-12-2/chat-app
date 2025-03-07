import { Avatar, Box, Divider } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { setWhichIsClicked } from "../slices/userslice/UserSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { anotherUser } = useSelector((state) => state.user);
  const { samePersonsinGroup, group, groups } = useSelector(
    (state) => state.group
  );

  const handleCancel = () => {
    dispatch(setWhichIsClicked(null));
  };

  return (
    <div
      className="col-12 position-absolute rounded-4 bg-light p-3"
      style={{ height: "100%" }}
    >
      <ClearIcon onClick={handleCancel} sx={{ cursor: "pointer" }} />
      {!group ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: "100px", height: "100px" }} />
            <h4 className="mt-1">{anotherUser?.userName}</h4>
          </Box>
          <Divider sx={{ border: "1px solid black", marginBlock: "10px" }} />
          <Box>
            <h5 className="d-flex justify-content-center gap-3 my-4">
              <GroupIcon />
              Mutual Groups
            </h5>
            <Box sx={{ overflowY: "scroll", height: "60vh" }}>
              {samePersonsinGroup.map((spg) => (
                <Box
                  sx={{ display: "flex", gap: "10px", marginBottom: "15px" }}
                >
                  <Avatar
                    sx={{
                      width: "50px",
                      height: "50px",
                    }}
                  ></Avatar>
                  <Box sx={{ lineHeight: "0.8" }}>
                    <p>{spg.groupName}</p>
                    <p className="w-100 text-wrap text-truncate">
                      {spg.groupMembers.map((members) => members.join(", "))}
                    </p>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: "100px", height: "100px" }} />
            <h4 className="mt-1">{group?.groupname}</h4>
          </Box>
          <Divider sx={{ border: "1px solid black", marginBlock: "10px" }} />
          <Box>
            <h5 className="d-flex justify-content-center gap-3 my-4">
              <GroupIcon />
              Group Members
            </h5>
            <Box sx={{ overflowY: "scroll", height: "55vh" }}>
              {groups
                .filter((g) => g._id === group.id)
                .map((g) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginBottom: "15px",
                    }}
                    key={g.id}
                  >
                    {g.groupMembers.map((ggroupMembers) => (
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                          marginInline: "20px",
                          marginBlock: "10px",
                        }}
                        key={ggroupMembers.id}
                      >
                        <Avatar
                          sx={{
                            width: "50px",
                            height: "50px",
                            position: "relative",
                          }}
                        ></Avatar>
                        <Box sx={{ paddingBlock: "5px" }}>
                          <p className="w-100 text-wrap text-truncate">
                            {ggroupMembers.userName}
                          </p>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ))}
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default UserProfile;
