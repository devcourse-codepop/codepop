import { Link, useLocation } from 'react-router-dom';
import { useChannelItemStore } from '../../stores/channelStore';
import { useEffect } from 'react';

interface Theme {
  name: string;
}

export default function ChannelBox({ theme }: { theme: Theme }) {
  const pathName = useLocation().pathname;
  const { channels, fetchChannels } = useChannelItemStore();

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  return (
    <>
      <div
        className={`w-[291px] h-[211px] rounded-[10px] pt-5 shadow-md font-semibold ${
          theme.name === 'Dark'
            ? 'bg-[#2d2d2d] text-[#ffffff]'
            : 'bg-[#ffffff] text-[#111111]'
        }`}
      >
        <h2
          className={`text-[20px] font-medium ml-7 mb-[14px] ${
            theme.name === 'Dark' ? 'text-[#acacac]' : 'text-[#595956]'
          }`}
        >
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
                  style={{
                    backgroundColor:
                      theme.name === 'Dark' ? item.colorDark : item.colorLight,
                  }}
                ></span>
                <span className="font-noto font-[18px] pt-1 relative z-1">
                  {item.name}
                  <span
                    className={`block w-0 h-3/7 opacity-30 absolute left-0 bottom-0 -z-1 group-hover:w-full duration-300 ease-out`}
                    style={{
                      backgroundColor:
                        theme.name === 'Dark'
                          ? item.colorDark
                          : item.colorLight,
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
