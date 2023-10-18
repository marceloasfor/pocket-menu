import React from "react";

function Footer() {
  return (
    <div className="flex justify-center items-center px-5 mb-5 lg:px-36">
      <div className="w-full">
        <span className="font-semibold">
          © PocketMenu {new Date().getFullYear()}.{" "}
        </span>
        <span className="font-light">
          Made with React by{" "}
          <a
            href="pocket_menu_git"
            target="_blank"
            className="text-primary"
          >
            team_name
          </a>
          .
        </span>
      </div>
    </div>
  );
}

export default Footer;