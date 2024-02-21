import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";
interface TimeAgoInterface {
  timestamp: string;
}
const TimeAgo: React.FC<TimeAgoInterface> = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
