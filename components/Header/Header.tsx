import adminIcon from "../../public/admin.png";
import homeIcon from "../../public/home.png";
import numbersIcon from "../../public/numbers.png";
import { SubscribeButton } from "./components/SubscribeButton/SubscribeButton";
import { HeaderLink } from "./components/HeaderLink";

export const Header = () => {
  return (
    <header
      className="bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 backdrop-blur-md 
      text-white px-6 sm:px-10 py-3 fixed top-0 left-0 w-full z-50 
      border-b border-white/20 shadow-xl"
    >
      <div className="flex max-w-screen-xl mx-auto items-center justify-between">
        <HeaderLink href="/" iconSrc={homeIcon} alt="Home page" />
        <HeaderLink href="/numbers" iconSrc={numbersIcon} alt="Numbers page" />
        <div className="flex items-center gap-4">
          <div className="relative w-[45px] h-[45px]">
            <SubscribeButton />
          </div>
          <HeaderLink href="/admin" iconSrc={adminIcon} alt="Admin page" />
        </div>
      </div>
    </header>
  );
};
