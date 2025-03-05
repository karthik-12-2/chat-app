import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../slices/messageslice/MessageSlice";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ClearIcon from '@mui/icons-material/Clear';
import { socket } from "../lib/socket";
import SendIcon from "@mui/icons-material/Send";
import { sendGroupMessage } from "../slices/groupSlice/GroupSlice";
import toast from "react-hot-toast";

const InputContainer = ({ id, uid, group }) => {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() && !imagePreview) return;
    if (!group) {
      dispatch(sendMessage({ id, message: message.trim(), image: imagePreview }));
    } else {
      dispatch(sendGroupMessage({ sid: id, gid: uid, message: message.trim(), image: imagePreview }));
    }

    setMessage("");
    setImagePreview("")
    handleBlur();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return ;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleFocus = () => {
    socket.emit("typing", { userId: uid, status: "typing...." });
  };

  const handleBlur = () => {
    socket.emit("typing", { userId: uid, status: "online" });
  };

  const handleRemoveImage = () => {
    setImagePreview(null)
    setTimeout(() => {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 0);
  }

  return (
    <>
      <div className=" w-100">
      {imagePreview && (
          <div className="position-relative">
            <img
            src={imagePreview}
            alt="imagePreview"
            style={{ width: "70px", height: "70px" }}
          />
          <button className="position-absolute border-0 rounded-4" onClick={handleRemoveImage}><ClearIcon/></button>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center align-items-center position-absolute w-100 bottom-0 mb-0 bg-white py-2 px-3 rounded-bottom-4">
        <form
          className="d-flex justify-content-center align-items-center w-75 w-100"
          onSubmit={handleSubmit}
        >
          <input
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control p-2"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            style={{ height: "50px" }}
            placeholder="Message"
          ></input>
          <input
            type="file"
            accept="image/*"
            className="d-none"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="border-0 ms-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <PhotoLibraryIcon />
          </button>
          <button
            className="btn btn-primary ms-4 rounded-5"
            type="submit"
            disabled={!message && !imagePreview}
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </>
  );
};

export default InputContainer;
