import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import FormattedTime from "./FormattedTime";
import CheckDays from "./CheckDays";

const MessageContainer = ({ messages, whoSends }) => {
  const messasgeEndRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  console.log(whoSends);

  useEffect(() => {
    if (messages.length && messasgeEndRef.current) {
      messasgeEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      <div
        className="m-2 ps-2 pe-2 overflow-y-scroll overflow-x-hidden"
        style={{ height: "65vh" }}
      >
        {messages?.flat().map((message, i, arr) => {
          const prevMessage = arr[i - 1];
          const showDate =
            !prevMessage ||
            new Date(prevMessage.createdAt).toDateString() !== new Date(message.createdAt).toDateString();

          return (
            <div key={message._id}>
              {showDate && (
                <h6 className="bg-white p-2 rounded-2 text-center">
                  <CheckDays message={message.createdAt}/>
                </h6>
              )}
              <div
                className={`mb-3 mt-1 me-4 d-flex ${
                  currentUser.id === message.senderId
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div className="d-flex flex-column" style={{ maxWidth: "50%" }}>
                  {whoSends?.find(
                    (whoSend) => whoSend.userId === message.senderId
                  )?.username && (
                    <span
                      className={`${
                        currentUser.id === message.senderId
                          ? "align-self-end"
                          : "align-self-start"
                      }`}
                    >
                      {
                        whoSends?.find(
                          (whoSend) => whoSend.userId === message.senderId
                        ).username
                      }
                    </span>
                  )}
                  <span
                    className={`${
                      currentUser.id === message.senderId
                        ? "align-self-end"
                        : "align-self-start"
                    }`}
                  >
                    <FormattedTime time={message.updatedAt} />
                  </span>
                  {message?.image && (
                    <img
                      src={message.image}
                      alt="images"
                      style={{ width: "200px" }}
                    />
                  )}
                  {message?.message && (
                    <p
                      className={`${
                        currentUser.id === message.senderId
                          ? "align-self-end"
                          : "align-self-start"
                      } bg-success bg-opacity-25 p-2 rounded-1 `}
                      // style={{ minWidth: "100%" }}
                    >
                      {message.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messasgeEndRef}></div>
      </div>
    </>
  );
};

export default MessageContainer;
