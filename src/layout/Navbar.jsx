import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";
import Connect from "../component/Connect";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [connectModal, setConnectModal] = useState(false);
  return (
    <div className="p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center bg-gray-800 shadow-md text-white p-2 rounded-full">
        {location.pathname === "/admin" ? (
          <h1 className="px-4">
            Hello, <span className="font-semibold">Deepak</span>
          </h1>
        ) : (
          <h1 className="px-4">
            Welcome to <span className="font-semibold">MyApp</span>
          </h1>
        )}
        {location.pathname === "/admin" ? (
          <div
            onClick={() => {
              navigate("/");
            }}
            className="cursor-pointer"
          >
            <button className="flex flex-row items-center justify-center bg-gray-700 hover:bg-white hover:text-red-500 gap-2 text-white font-semibold px-4 p-2 rounded-full transition duration-300">
              <p className="max-md:hidden">Logout</p>{" "}
              <Icon icon="line-md:log-in" width="24" height="24" />
            </button>
          </div>
        ) : (
          <div onClick={() => setConnectModal(true)} className="cursor-pointer">
            <button className="flex flex-row items-center justify-center bg-gray-700 hover:bg-white hover:text-green-500 gap-2 text-white font-semibold px-4 p-2 rounded-full transition duration-300">
              <p className="max-md:hidden">Connect</p>{" "}
              <Icon icon="line-md:link" width="24" height="24" />
            </button>
          </div>
        )}
      </div>
      {connectModal && <Connect setConnectModal={setConnectModal} />}
    </div>
  );
}

export default Navbar;
