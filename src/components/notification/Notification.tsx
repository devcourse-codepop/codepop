// import readAllImg from '../../assets/images/header/notifi.svg';
import { useNavigate } from 'react-router-dom';
import close from '../../assets/images/header/close.svg';
import closeWhite from '../../assets/images/header/closeWhite.svg';
import alarm from '../../assets/images/header/alarm.svg';
import alarmWhite from '../../assets/images/header/alarm-white.svg';
import redDot from '../../assets/RedDotIcon.svg';
import { useEffect, useRef, useState } from 'react';
import {
  getNotificationsData,
  putNotificationSeenData,
} from '../../api/notification/notification';
import { useChannelItemStore } from '../../stores/channelStore';
import { twMerge } from 'tailwind-merge';
import { Theme } from '../../types/ darkModeTypes';
import { dark } from '../../utils/ darkModeUtils';

export default function Notification({ theme }: { theme: Theme }) {
  const { channels } = useChannelItemStore();
  const [notifiOpen, setNotifiOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [newData, setNewData] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // const navigate = useNavigate();

  const fetchNotifications = async () => {
    const result = await getNotificationsData();
    setNotifications(result.data);
  };

  // 새로운 알림이 있는지 확인
  const newDataHandler = () => {
    let dataSum = 0;
    notifications.map((notification) => {
      // seen값이 false고 like,comment가 삭제된 내용이 아니면 카운트 되도록
      if (
        notification.seen === false &&
        notification.like !== null &&
        notification.comment !== null
      ) {
        dataSum += 1;
      }
    });
    setNewData(dataSum);
  };

  // 알림 확인 api 보내기
  const readHandler = async () => {
    await putNotificationSeenData();
    fetchNotifications();
  };

  // 알림글 누르면 해당 포스트로 이동하는 navigate
  const navigateHandler = (notifi: NotificationType) => {
    channels.map((channel) => {
      if (notifi.like !== undefined) {
        if (channel.id === notifi.like['post']['channel']) {
          navigate(`${channel.to}/post/${notifi.like['post']['_id']}`);
        }
      } else if (notifi.comment !== undefined) {
        if (channel.id === notifi.comment['post']['channel']) {
          navigate(`${channel.to}/post/${notifi.comment['post']['_id']}`);
        }
      }
    });

    closeHandler();
  };

  const closeHandler = () => {
    // 닫힐때 읽음도 처리 되도록
    setNotifiOpen(false);
    readHandler();
  };

  // 알림 api 요청, 실시간 알림 감지를 위해 2초마다 요청
  useEffect(() => {
    fetchNotifications();
    newDataHandler();

    const interval = setInterval(fetchNotifications, 2000);
    return () => clearInterval(interval);
  }, []);

  // 알림목록 갱신되면 감지하고 newDataHandler 실행
  useEffect(() => {
    newDataHandler();
  }, [notifications]);

  // 알림 modal 외의 외부 영역 누르면 모달이 닫히도록
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeHandler();
      }
    };
    window.addEventListener('mousedown', clickHandler);
    return () => window.removeEventListener('mousedown', clickHandler);
  }, [modalRef]);

  return (
    <>
      <button
        className="relative cursor-pointer block"
        onClick={(e) => {
          e.preventDefault();
          setNotifiOpen(!notifiOpen);
        }}
      >
        <img src={dark(theme) ? alarmWhite : alarm} />
        {newData > 0 && (
          <span className="block w-3.5 h-3.5 rounded-2xl bg-[#FF0000] absolute -right-1 top-0 text-[11px] text-white leading-3">
            {newData}
          </span>
        )}
      </button>
      {notifiOpen && (
        <div
          className={`absolute gap-3 rounded-[10px] z-1 py-4 px-5 shadow-2xl w-[340px] z-10 -right-5 top-8.5 ${
            dark(theme)
              ? 'bg-[#2d2d2d] text-[#ffffff]'
              : 'bg-[#ffffff] text-[#111111]'
          }`}
        >
          <span
            className={`w-[12px] h-[12px] rounded-[2px] absolute rotate-135 -top-1.5 right-6 -z-2 ${
              dark(theme) ? 'bg-[#2d2d2d]' : 'bg-[#ffffff]'
            }`}
          ></span>
          <div
            className={`border-b  flex justify-between pb-3 ${
              dark(theme) ? 'border-[#484848]' : 'border-[#cccccc]'
            }`}
          >
            <h3
              className={`text-[#4D4D4D] text-base font-medium flex items-end gap-x-2 ${
                dark(theme) ? 'text-[#ffffff]' : 'text-[#4D4D4D]'
              }`}
            >
              Notifications
              {/* <span className="inline-block bg-zinc-400 rounded-3xl px-2 py-1.5 mb-0.5 min-w-7 text-center text-white text-xs leading-1.5">
                {newData}
              </span> */}
            </h3>
          </div>
          <div
            ref={modalRef}
            className="notiList px-2 h-[200px] overflow-y-auto scroll-custom relative"
          >
            {notifications.length === 0 ? (
              <p className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-sm">
                알림이 없습니다
              </p>
            ) : (
              notifications.map((notifi, index) => {
                let thisType = '';
                if (notifi.like !== undefined && notifi.like !== null) {
                  thisType = 'like';
                } else if (
                  notifi.comment !== undefined &&
                  notifi.comment !== null
                ) {
                  thisType = 'comment';
                } else thisType = 'none';
                return (
                  <>
                    {thisType !== 'none' && (
                      <button
                        onClick={() => {
                          navigateHandler(notifi);
                        }}
                        className="block relative pl-3.5 text-[13px] my-3.5 cursor-pointer text-left"
                        key={`notification-${index}`}
                      >
                        <img
                          className={twMerge(
                            'absolute -left-0.5 top-2',
                            notifi.seen ? 'opacity-40 grayscale' : 'opacity-100'
                          )}
                          src={redDot}
                        />
                        {thisType === 'like' &&
                          `[${notifi.author['fullName']}] 님이 당신의 게시물을 좋아합니다.`}
                        {thisType === 'comment' &&
                          `[${notifi.author['fullName']}] 님이 당신의 게시물에 댓글을 달았습니다.`}
                      </button>
                    )}
                  </>
                );
              })
            )}
          </div>
          <div className="absolute right-5 top-4">
            <button
              className="text-sm text-[#bbbbbb] cursor-pointer"
              onClick={() => {
                closeHandler();
              }}
            >
              <img
                src={dark(theme) ? closeWhite : close}
                className="opacity-60"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ex) <Notification value={["[한유빈] 님이 당신의 게시물을 좋아합니다.", "두 번째 알림"]}/>
