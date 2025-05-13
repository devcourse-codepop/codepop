import { Link, useLocation } from 'react-router-dom';
import { useChannelItemStore } from '../../stores/channelStore';
import { useEffect } from 'react';

export default function ChannelBox() {
  const pathName = useLocation().pathname;
  const { channels, fetchChannels } = useChannelItemStore();

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  return (
    <>
      <div className="w-[291px] h-[211px] bg-white rounded-[10px] pt-5 shadow-md font-semibold">
        <h2 className="text-[20px] font-medium text-[#595956] ml-7 mb-[14px]">
          Channel
        </h2>
        <ul className="space-y-[13px]">
          {channels.map((item) => (
            <li key={item.id}>
              <Link
                onClick={() => {
                  window.location.href = `${item.to}`;
                }}
                to={item.to}
                className="flex items-start ml-[29px] group"
              >
                <span
                  className={`w-1 h-8 rounded-sm mr-[7px]`}
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="font-noto font-[18px] pt-1 relative z-1">
                  {item.name}
                  <span
                    className={`block w-0 h-3/7 opacity-30 absolute left-0 bottom-0 -z-1 group-hover:w-full duration-300 ease-out`}
                    style={{
                      backgroundColor: item.color,
                      width: pathName === item.to ? '100%' : '',
                    }}
                  ></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
