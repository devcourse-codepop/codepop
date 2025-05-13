// import { useNavigate } from 'react-router-dom';
import readAllImg from '../../assets/images/header/notifi.svg';
import alarm from '../../assets/images/header/alarm.svg';
import alarmWhite from '../../assets/images/header/alarm-white.svg';
import redDot from '../../assets/RedDotIcon.svg';
import { useEffect, useState } from 'react';
import {
  getNotificationsData,
  putNotificationSeenData,
} from '../../api/notification/notification';

interface Theme {
  name: string;
}

export default function Notification({ theme }: { theme: Theme }) {
  const [notifiOpen, setNotifiOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  // const navigate = useNavigate();

  const fetchNotifications = async () => {
    const result = await getNotificationsData();
    setNotifications(result.data);
  };

  const seenHandler = async (notification: NotificationType) => {
    return await putNotificationSeenData(notification._id);
    // let id = "";
    // if (notification.like !== undefined) {
    //   id = notification.like["_id"];
    // } else if (notification.comment !== undefined) {
    //   id = notification.comment["_id"];
    // }

    // if (id !== "") await putNotificationSeenData(id);
  };

  const readAllHandler = () => {
    notifications.map((notification) => {
      seenHandler(notification);
    });
    fetchNotifications();
  };

  const readHandler = (notification: NotificationType) => {
    seenHandler(notification);
    fetchNotifications();
    // navigate("/post/");
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
        <img src={`${theme.name === 'Dark' ? alarmWhite : alarm}`} />
        {!notifications.reduce((sum, data) => sum && data.seen, true) && (
          <span className="block w-[8px] h-[8px] rounded-2xl bg-[#FF0000] absolute right-0 top-0.5"></span>
        )}
      </button>
      {notifiOpen && (
        <div
          className={`absolute gap-3 rounded-[10px] z-1 py-4 px-5 shadow-2xl w-[340px] z-10 -right-5 top-8.5 ${
            theme.name === 'Dark' ? 'bg-[#2d2d2d]' : 'bg-[#ffffff]'
          }`}
        >
          <span
            className={`w-[12px] h-[12px] rounded-[2px] absolute rotate-135 -top-1.5 right-6 -z-2 ${
              theme.name === 'Dark' ? 'bg-[#2d2d2d]' : 'bg-[#ffffff]'
            }`}
          ></span>
          <div className="border-b border-[#cccccc] flex justify-between pb-3">
            <h3
              className={` text-base font-medium ${
                theme.name === 'Dark' ? 'text-[#ffffff]' : 'text-[#4D4D4D]'
              }`}
            >
              Notifications
            </h3>
            <button
              className="cursor-pointer"
              aria-label="readAll"
              onClick={readAllHandler}
            >
              <img src={readAllImg} />
            </button>
          </div>
          <div className="notiList px-2 h-[200px] overflow-y-auto scroll-custom relative">
            {notifications.length === 0 ? (
              <p
                className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-sm ${
                  theme.name === 'Dark' ? 'text-[#ffffff]' : 'text-[#5c5c5c]'
                }`}
              >
                알림이 없습니다
              </p>
            ) : (
              notifications.map((notifi, index) => (
                <button
                  onClick={() => readHandler(notifi)}
                  className="block relative pl-4 text-[13px] my-3.5 cursor-pointer"
                  key={`notification-${index}`}
                >
                  {!notifi.seen && (
                    <img className="absolute left-0 top-2" src={redDot} />
                  )}
                  {notifi.like !== undefined && (
                    <p
                      className={`${
                        theme.name === 'Dark'
                          ? 'text-[#ffffff]'
                          : 'text-[#111111]'
                      }`}
                    >
                      [{notifi.author.fullName}] 님이 당신의 게시물을
                      좋아합니다.
                    </p>
                  )}
                  {notifi.comment !== undefined && (
                    <p
                      className={`${
                        theme.name === 'Dark'
                          ? 'text-[#ffffff]'
                          : 'text-[#111111]'
                      }`}
                    >
                      [{notifi.author.fullName}] 님이 당신의 게시물에 댓글을
                      달았습니다.
                    </p>
                  )}
                </button>
              ))
            )}
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
