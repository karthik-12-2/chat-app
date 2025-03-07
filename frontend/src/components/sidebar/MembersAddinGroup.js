import ClearIcon from "@mui/icons-material/Clear";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { createGroup, setOpen } from "../../slices/groupSlice/GroupSlice";

const MembersAddinGroup = () => {
  const { users, currentUser } = useSelector((state) => state.user);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const { opengroup } = useSelector((state) => state.group);
  const dispatch = useDispatch();

  const handleCancel = (userId) => {
    setSelectedUsers((prev) => prev.filter((user) => user.userId !== userId));
  };

  //   console.log(currentUser);
  const handleSelect = (e, userId, userName) => {
    setSelectedUsers((prev = []) => {
      const exists = prev.some((user) => user.userId === userId);
      return exists ? prev : [...prev, { userId: userId, userName: userName }];
    });
  };
  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createGroup({
        groupName: groupName,
        groupMembers: [
          ...selectedUsers,
          { userId: currentUser.id, userName: currentUser.username },
        ],
        createdBy: { id: currentUser.id, userName: currentUser.username },
      })
    );
    setSelectedUsers([]);
    setGroupName("");
  };
  if (!opengroup) return null;

  return (
    <div
      className={`me-1 col-lg-12 col-sm-9  ms-1 rounded-4 p-3  position-relative h-100 bg-white`}
    >
      <div className="px-4 d-flex justify-content-between">
        <h5 className="text-center">Create a new Group</h5>
        <ClearIcon onClick={handleClose} style={{ cursor: "pointer" }} />
      </div>
      <hr className="mx-4" />

      <form className="mt-3 mb-3 px-4" onSubmit={handleSubmit}>
        <label>
          Group Name :{" "}
          <input
            type="text"
            className="border-0 border-bottom border-black"
            style={{ outline: "none" }}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </label>
        <button
          className="border-0 mt-3 bg-success bg-opacity-25 px-2 py-1 rounded-4"
          type="submit"
          disabled={selectedUsers.length === 0 || !groupName}
        >
          Create Group
        </button>
      </form>

      {selectedUsers?.length > 0 && (
        <List
          sx={{
            listStyle: "none",
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "349px",
            overflowY: "scroll",
            height: "100px",
          }}
        >
          {selectedUsers?.map((selectedUser) => (
            <ListItem
              sx={{ display: "flex", padding: "0", width: "auto" }}
              key={selectedUser.userId}
            >
              <ListItemButton>
                <IconButton onClick={() => handleCancel(selectedUser.userId)}>
                  <ClearIcon />
                </IconButton>
              </ListItemButton>
              <Typography variant="subtitle1">
                {selectedUser.userName}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}

      {/* users */}
      <List
        sx={{
          listStyle: "none",
          marginTop: 2,
          overflowY: "scroll",
          overflowX: "hidden",
          minHeight: "50vh",
        }}
      >
        <Typography sx={{ marginLeft: "10px", marginBottom: "10px" }}>
          Add Members?
        </Typography>
        {users?.map(
          (user) =>
            currentUser.id !== user._id && (
              <ListItem
                sx={{
                  display: "flex",
                  gap: 1,
                  paddingBlock: 0,
                  paddingInlineEnd: 0,
                }}
                key={user._id}
              >
                <IconButton
                  onClick={(e) => {
                    handleSelect(e, user._id, user.userName);
                  }}
                >
                  {selectedUsers.some(
                    (selectedUser) => selectedUser.userId === user._id
                  ) ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </IconButton>
                <Typography variant="subtitle1">{user.userName}</Typography>
              </ListItem>
            )
        )}
      </List>
    </div>
  );
};

export default MembersAddinGroup;
