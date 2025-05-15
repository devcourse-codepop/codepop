import { useNavigate } from 'react-router-dom';
import close from '../../assets/images/header/close.svg';
import alarm from '../../assets/images/header/alarm.svg';
import redDot from '../../assets/RedDotIcon.svg';
import { useEffect, useRef, useState } from 'react';
import {
  getNotificationsData,
  putNotificationSeenData,
} from '../../api/notification/notification';
import { useChannelItemStore } from '../../stores/channelStore';
import { twMerge } from 'tailwind-merge';
import { useAuthStore } from '../../stores/authStore';

export default function Notification() {
  const { user } = useAuthStore(); // 내 프로필
  const { channels } = useChannelItemStore();
  const [notifiOpen, setNotifiOpen] = useState(false);
  // 실질적으로 화면에 그려지는 알림 state
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  // api이 반영된 알림 state
  const [originNotifications, setOriginNotifications] = useState<
    NotificationType[]
  >([]);
  const [newData, setNewData] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const hasCopiedRef = useRef(false);

  const fetchNotifications = async () => {
    const result = await getNotificationsData();
    setOriginNotifications(result.data);
    return result.data;
  };

  // 새로운 알림, 알림 삭제를 반영 하기 위한 함수
  const updateDataHandler = () => {
    let updateNotifications = [...notifications];
    // 새로운 알림을 notitications에 반영하기
    const newNotifications = originNotifications.filter(
      (x) => !updateNotifications.some((y) => y._id === x._id)
    );
    updateNotifications = [...newNotifications, ...updateNotifications];

    originNotifications.forEach((origin, i) => {
      if (
        origin.like !== updateNotifications[i].like ||
        origin.comment !== updateNotifications[i].comment ||
        origin.follow !== updateNotifications[i].follow
      ) {
        updateNotifications[i] = {
          ...origin,
          seen: updateNotifications[i].seen,
        };
      }
    });

    // 정렬
    updateNotifications.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setNotifications(updateNotifications);
  };

  // 새로운 알림갯수 세기
  const countDataHandler = () => {
    let dataSum = 0;
    // notifications에서 seen값이 false고 like,comment가 삭제된 내용이 아니면 카운트 되도록
    notifications.map((notification) => {
      if (
        notification.seen === false &&
        notification.like !== null &&
        notification.comment !== null &&
        notification.follow !== null
      ) {
        dataSum += 1;
      }
    });
    setNewData(dataSum);
  };

  // 알림글 누르면 해당 포스트로 이동하는 navigate
  const navigateHandler = (notifi: NotificationType) => {
    // 클릭한 norifi의 seen 정보만 목록에서 갱신
    const update = notifications.map((notification) =>
      notification._id === notifi._id ? { ...notifi, seen: true } : notification
    );
    setNotifications(update);

    // 알림이 눌렸을때 개별 읽기가 되기때문에 sessionStorage는 알림을 눌렀을 때만 하면 됨
    sessionStorage.setItem(`notification-${user?._id}`, JSON.stringify(update));
    closeHandler();

    channels.map((channel) => {
      if (notifi.like !== undefined) {
        if (channel.id === notifi.like['post']['channel']) {
          navigate(`${channel.to}/post/${notifi.like['post']['_id']}`);
        }
      } else if (notifi.comment !== undefined) {
        if (channel.id === notifi.comment['post']['channel']) {
          navigate(`${channel.to}/post/${notifi.comment['post']['_id']}`);
        }
      } else if (notifi.follow !== undefined) {
        navigate(`/profile`, { state: { userid: notifi.follow['follower'] } });
      }
    });
  };

  // 알림닫힘
  const closeHandler = () => {
    setNotifiOpen(false);
  };

  // 알림 전체확인 api 보내기
  const readHandler = async () => {
    await putNotificationSeenData();
    const data = await fetchNotifications();
    setNotifications(data);
    sessionStorage.setItem(`notification-${user?._id}`, JSON.stringify(data));
  };

  // 알림 api 요청, 실시간 알림 감지를 위해 2초마다 요청
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 2000);
    return () => clearInterval(interval);
  }, []);

  const sessionData = async () => {
    const result = await sessionStorage.getItem(`notification-${user?._id}`);
    const parseMyData =
      result && result !== '[]' ? JSON.parse(result) : [...originNotifications];
    setNotifications(parseMyData);
  };

  // origin 알림목록 갱신되면 감지하고 countDataHandler 실행
  useEffect(() => {
    // 맨 처음 한번만 목록 가져오기
    if (!hasCopiedRef.current && originNotifications.length > 0) {
      sessionData();
      hasCopiedRef.current = true;
    }

    countDataHandler();
    updateDataHandler();
  }, [originNotifications]);

  // 개별 알림에 변화가 있으면 새로운 카운트
  useEffect(() => {
    countDataHandler();
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
        <img src={alarm} />
        {newData > 0 && (
          <span className="block w-3.5 h-3.5 rounded-2xl bg-[#FF0000] absolute -right-1 top-0 text-[11px] text-white leading-3">
            {newData}
          </span>
        )}
      </button>
      {notifiOpen && (
        <div
          ref={modalRef}
          className="absolute gap-3 bg-white rounded-[10px] z-1 py-4 px-5 shadow-2xl w-[340px] z-10 -right-5 top-8.5"
        >
          <span className="w-[12px] h-[12px] bg-white rounded-[2px] absolute rotate-135 -top-1.5 right-6 -z-2"></span>
          <div className="border-b border-[#cccccc] flex justify-between pb-3">
            <h3 className="text-[#4D4D4D] text-base font-medium flex items-end gap-x-2">
              Notifications
            </h3>
          </div>
          <div className="notiList pt-1 px-2 h-[200px] overflow-y-auto scroll-custom relative">
            {notifications.length === 0 ? (
              <p className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-sm text-[#5c5c5c]">
                알림이 없습니다
              </p>
            ) : (
              notifications.map((notifi) => {
                let thisType = '';
                if (notifi.like !== undefined && notifi.like !== null) {
                  thisType = 'like';
                } else if (
                  notifi.comment !== undefined &&
                  notifi.comment !== null
                ) {
                  thisType = 'comment';
                } else if (
                  notifi.follow !== undefined &&
                  notifi.follow !== null
                ) {
                  thisType = 'follow';
                } else thisType = 'none';
                return (
                  <div key={notifi._id}>
                    {thisType !== 'none' && (
                      <button
                        onClick={() => {
                          navigateHandler(notifi);
                        }}
                        className="block relative pl-3.5 text-[13px] my-2.5 cursor-pointer text-left"
                      >
                        <img
                          className={twMerge(
                            'absolute -left-0.5 top-2',
                            notifi.seen && 'grayscale-100 opacity-30'
                          )}
                          src={redDot}
                        />
                        {thisType === 'like' &&
                          `[${notifi.author['fullName']}] 님이 당신의 게시물을 좋아합니다.`}
                        {thisType === 'comment' &&
                          `[${notifi.author['fullName']}] 님이 당신의 게시물에 댓글을 달았습니다.`}
                        {thisType === 'follow' &&
                          `[${notifi.author['fullName']}] 님이 당신을 팔로우 합니다.`}
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <div className="text-right mt-1">
            <button
              className="text-xs text-zinc-500 cursor-pointer"
              onClick={readHandler}
            >
              전체읽기
            </button>
          </div>
          <div className="absolute right-5 top-4">
            <button
              className="text-sm text-[#bbbbbb] cursor-pointer"
              onClick={() => {
                closeHandler();
              }}
            >
              <img src={close} className="opacity-60" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ex) <Notification value={["[한유빈] 님이 당신의 게시물을 좋아합니다.", "두 번째 알림"]}/>
