import checkIcon from "../../assets/CheckIcon.svg";
import notiBox from "../../assets/NotiBox.svg";
import redDot from "../../assets/RedDotIcon.svg";
type NotificationProps = {
  value: string[];
};

export default function Notification({ value }: NotificationProps) {
  return (
    <div className="relative flex p-4 gap-3">
      <img src={notiBox} />
      <div className="absolute w-[309px] h-[282px]">
        <div className="flex items-center justify-between">
          <p className="text-[16px] opacity-70 ml-[35px] mt-[25px]">
            Notification
          </p>
          <button>
            <img src={checkIcon} className="mr-[34px] mt-[25px]" />
          </button>
        </div>

        <hr className="opacity-20 w-[243px] mt-3 mb-[23px] mx-auto" />

        <div className="flex flex-col gap-2 px-6">
          {value.map((msg, index) => (
            <div key={index} className="flex items-center gap-2">
              <img src={redDot} alt="dot" />
              <p className="text-xs font-medium">{msg}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ex) <Notification value={["[한유빈] 님이 당신의 게시물을 좋아합니다.", "두 번째 알림"]}/>
