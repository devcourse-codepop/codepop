import alarm from "../../assets/images/header/alarm.svg";
import logo from "../../assets/images/header/logo.svg";
import user from "../../assets/images/header/userImg.svg";

export default function Header() {
  const auth = true;

  return (
    <>
      <header className="h-[100px] px-[60px] flex items-center justify-between">
        <h1>
          <a href="/">
            <img src={logo} />
          </a>
        </h1>
        <div>
          {!auth && <a href="">Login</a>}
          {auth && (
            <div className="flex items-center gap-6">
              <a href="" className="text-[20px]">
                Logout
              </a>
              <a href="" className="relative">
                <img src={alarm} />
                <span className="block w-[8px] h-[8px] rounded-2xl bg-[#FF0000] absolute right-0 top-0.5"></span>
              </a>
              <a href="" className="w-10 h-10 rounded-3xl overflow-hidden">
                <img src={user} />
              </a>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
