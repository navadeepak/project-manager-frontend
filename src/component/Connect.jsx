import React from "react";
import { Icon } from "@iconify/react";

function Connect({ setConnectModal }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-fit">
        <div className="mb-4 flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold">Connect With Me</h2>
          <button
            onClick={() => setConnectModal(false)}
            className="hover:text-red-500 text-gray-600 hover:scale-110 ease-in-out duration-150 bg-gray-200 rounded-full"
          >
            <Icon icon="line-md:close-small" width="24" height="24" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://github.com/navadeepak"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg"
          >
            <Icon icon="mdi:github" width="24" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/navadeepak-c-7b35741b6/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg"
          >
            <Icon icon="mdi:linkedin" width="24" />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:navadeepakaswin007@gmail.com"
            className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg"
          >
            <Icon icon="mdi:email" width="24" />
            <span>Gmail</span>
          </a>
          <a
            href="mailto:navadeepakaswin007@outlook.com"
            className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg"
          >
            <Icon icon="mdi:microsoft-outlook" width="24" />
            <span>Outlook</span>
          </a>
          <a
            href="tel:+917603857110"
            className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg"
          >
            <Icon icon="mdi:phone" width="24" />
            <span>+91 76038 57110</span>
          </a>
          <a
            href="https://www.instagram.com/____out____of____control____/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg"
          >
            <Icon icon="mdi:instagram" width="24" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Connect;
