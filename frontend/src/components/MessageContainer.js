import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import FormattedTime from "./FormattedTime";

const MessageContainer = ({ messages, whoSends }) => {
  const messasgeEndRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  console.log(whoSends);

  useEffect(() => {
    if (messasgeEndRef.current) {
      messasgeEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  // console.log(groups)

  return (
    <>
      <div
        className="m-2 ps-2 pe-2 overflow-y-scroll overflow-x-hidden"
        style={{ height: "65vh" }}
      >
        {messages?.flat().map((message, i) => (
          <div
            className={`mb-3 mt-1 me-4 d-flex ${
              currentUser.id === message.senderId
                ? "justify-content-end"
                : "justify-content-start"
            }`}
            key={i}
          >
            <div className="d-flex flex-column" style={{ maxWidth: "50%" }}>
              {whoSends?.map((whoSend) =>
                whoSend.userId === message.senderId ? (
                  <span
                    className={`${
                      currentUser.id === message.senderId
                        ? "align-self-end"
                        : "align-self-start"
                    }`}
                  >
                    {whoSend.userName}
                  </span>
                ) : (
                  ""
                )
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
              {message?.image && <img src={message.image} alt="images"  style={{width: '200px'}}/>}
              {message?.message && <p
                className={`${
                  currentUser.id === message.senderId
                    ? "align-self-end"
                    : "align-self-start"
                } bg-success bg-opacity-25 p-2 rounded-1 `}
                // style={{ minWidth: "100%" }}
              >
                {message.message}
              </p>}
            </div>
          </div>
        ))}
        <div ref={messasgeEndRef}></div>
      </div>
    </>
  );
};

export default MessageContainer;
