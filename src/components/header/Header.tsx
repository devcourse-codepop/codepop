import { Link } from "react-router-dom";
import logo from "../../assets/images/header/logo.svg";
import user from "../../assets/images/header/userImg.svg";
import Notification from "../notification/Notification";
import { useState } from "react";

export default function Header() {
  const auth = true;

  return (
    <>
      <header className="h-[100px] px-[60px] flex items-center justify-between">
        <h1>
          <Link to="/">
            <img src={logo} />
          </Link>
        </h1>
        <div>
          {!auth && <a href="">Login</a>}
          {auth && (
            <div className="flex items-center gap-6">
              <Link to="/logout" className="text-[20px]">
                Logout
              </Link>
              <div className="notification-wrapper">
                <Notification></Notification>
              </div>
              <Link
                to="/mypage"
                className="w-10 h-10 rounded-3xl overflow-hidden"
              >
                <img src={user} />
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
