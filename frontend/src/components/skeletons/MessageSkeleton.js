import { Skeleton, Stack } from "@mui/material";
import React from "react";

const MessageSkeleton = () => {
  const messages = new Array(3).fill(null);
  return (
    <div>
      {/* Message Content Skeleton */}
      {messages.map((_, i) => (
        <Stack>
          <Stack
          key={i}
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ marginBottom: 1 }}
          paddingInline="10px"
        >
          <Stack spacing={1}>
            <Skeleton variant="text" width={250} height={80}/>
            {/* <Skeleton variant="text" width={150} /> */}
          </Stack>
        </Stack>
        <Stack
          key={i}
          direction="row-reverse"
          spacing={2}
          alignItems="end"
          sx={{ marginBottom: 1 }}
          paddingInline="10px"
        >
          <Stack spacing={1}>
          <Skeleton variant="text" width={250} height={80}/>
            {/* <Skeleton variant="text" width={150} /> */}
          </Stack>
        </Stack>
        </Stack>
      ))}
    </div>
  );
};

export default MessageSkeleton;
