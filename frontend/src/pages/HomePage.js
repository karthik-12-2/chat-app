import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkauth, getAllUsers } from "../slices/userslice/UserSlice";
import ChatContainer from "../components/ChatContainer";
import MembersAddinGroup from "../components/sidebar/MembersAddinGroup";
import { getAllGroups } from "../slices/groupSlice/GroupSlice";
import UserProfile from "./UserProfile";

const HomePage = () => {
  const { isLoggedin, whichIsClicked } = useSelector((state) => state.user);
  const { opengroup } = useSelector((state) => state.group);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkauth());
    dispatch(getAllUsers());
    dispatch(getAllGroups());
  }, [dispatch]);

  // checking if user logged in or not
  useEffect(() => {
    if (!isLoggedin) navigate("/login");
  }, [isLoggedin, navigate]);

  return (
    isLoggedin && (
      <>
        <div
          className={`mt-1 me-1 col-md-7 ${
            whichIsClicked || opengroup ? "col-lg-5" : "col-lg-8"
          } col-sm-9 ms-0 rounded-4 p-0 position-relative`}
          style={{ minHeight: "98vh" }}
        >
          <ChatContainer />
        </div>
        {opengroup && (
          <div
            className="mt-1 me-1 col-lg-3 col-sm-9 ms-3 rounded-4 p-0 position-relative"
            style={{ minHeight: "98vh" }}
          >
            <MembersAddinGroup />
          </div>
        )}
        {whichIsClicked === "more" && (
          <div
            className="mt-1 me-1 col-lg-3 col-sm-9 ms-3 rounded-4 p-0 position-relative"
            style={{ minHeight: "98vh" }}
          >
            <UserProfile />
          </div>
        )}
      </>
    )
  );
};

export default HomePage;
