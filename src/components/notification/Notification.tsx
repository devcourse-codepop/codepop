import { Link } from "react-router-dom";
import readAllImg from "../../assets/images/header/notifi.svg";
import alarm from "../../assets/images/header/alarm.svg";
import redDot from "../../assets/RedDotIcon.svg";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";

export default function Notification() {
  const [notifiOpen, setNotifiOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationType[]>([]);

  const fetchNotifications = async () => {
    const result = await axiosInstance.get("/notifications");
    setNotification(result.data);
  };

  const readAllHandler = () => {
    notification.map(async (item) => {
      await axiosInstance.post(`/notifications/seen/`, {
        id: item._id,
      });
    });
  };

  const readHandler = async (item: NotificationType) => {
    let id = "";
    if (item.like !== undefined) {
      id = item.like["_id"];
    } else if (item.comment !== undefined) {
      id = item.comment["_id"];
    }
    await axiosInstance.post(`/notifications/seen/`, {
      id: id,
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <button
        className="relative cursor-pointer block"
        onClick={(e) => {
          e.preventDefault();
          setNotifiOpen(!notifiOpen);
        }}
      >
        <img src={alarm} />
        {!notification.reduce((sum, d) => sum && d.seen, true) && (
          <span className="block w-[8px] h-[8px] rounded-2xl bg-[#FF0000] absolute right-0 top-0.5"></span>
        )}
      </button>
      {notifiOpen && (
        <div className="relative gap-3 bg-white rounded-[10px] z-1 py-4 px-5 shadow-2xl w-[340px]">
          <span className="w-[12px] h-[12px] bg-white rounded-[2px] absolute rotate-135 -top-1.5 right-6 -z-2"></span>
          <div className="border-b border-[#cccccc] flex justify-between pb-3">
            <h3 className="text-[#4D4D4D] text-base font-medium">
              Notifications
            </h3>
            <button
              className="cursor-pointer"
              aria-label="readAll"
              onClick={() => readAllHandler}
            >
              <img src={readAllImg} />
            </button>
          </div>
          <div className="notiList px-2 h-[200px] overflow-y-auto scroll-custom">
            {notification.map((notifi) => (
              <Link
                to={`/post/${notifi.post}`}
                onClick={() => readHandler(notifi)}
                className="block relative pl-4 text-[13px] my-3.5"
              >
                {!notifi.seen && (
                  <img className="absolute left-0 top-2" src={redDot} />
                )}
                {notifi.like !== undefined &&
                  `[${notifi.author["fullName"]}] 님이 당신의 게시물을 좋아합니다.`}
                {notifi.comment !== undefined &&
                  `[${notifi.author["fullName"]}] 님이 당신의 게시물에 댓글을 달았습니다.`}
              </Link>
            ))}
          </div>
          <div className="text-right">
            <button
              className="text-sm text-[#bbbbbb] cursor-pointer"
              onClick={() => {
                setNotifiOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ex) <Notification value={["[한유빈] 님이 당신의 게시물을 좋아합니다.", "두 번째 알림"]}/>
