import { Link, useLocation } from "react-router-dom";

export default function ChannelBox() {
  const pathName = useLocation().pathname;

  const menuItems = [
    { name: "MysteryCode", to: "/channel/MysteryCode", color: "#10215C" },
    { name: "DeskSetup", to: "/channel/DeskSetup", color: "#3380DE" },
    { name: "Vote", to: "/channel/Vote", color: "#60A7F7" },
  ];

  // console.log(pathName.split("/channel")[1]);

  return (
    <>
      <div className="w-[291px] h-[211px] bg-white rounded-[10px] pt-5 shadow-md font-semibold">
        <h2 className="text-[20px] font-medium text-[#595956] ml-7 mb-[14px]">
          Channel
        </h2>
        <ul className="space-y-[13px]">
          {menuItems.map((item) => (
            <li>
              <Link
                // onClick={() => clickHandler(pathName)}
                to={item.to}
                className="flex items-start ml-[29px] group"
              >
                <span
                  className={`w-1 h-8 bg-[${item.color}] rounded-sm mr-[7px]`}
                ></span>
                <span className="font-noto font-[18px] pt-1 relative z-1">
                  이거 왜 되지?
                  <span
                    className={`block w-0 h-3/7 bg-[${item.color}] opacity-30 absolute left-0 bottom-0 -z-1 group-hover:w-full duration-300 ease-out`}
                    style={{
                      width: pathName === item.to ? "100%" : "",
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
