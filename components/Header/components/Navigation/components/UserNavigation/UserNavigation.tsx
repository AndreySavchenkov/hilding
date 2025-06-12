import { HeaderLink } from "@/components/ui/HeaderLink";
import { SubscribeButton } from "./components/SubscribeButton/SubscribeButton";
import adminIcon from "@/public/admin.png";
import homeIcon from "@/public/home.png";
import numbersIcon from "@/public/numbers.png";

export const UserNavigation = () => {
  return (
    <nav className="flex max-w-screen-xl mx-auto items-center justify-between">
      <HeaderLink href="/" iconSrc={homeIcon} alt="Home page" />
      <HeaderLink href="/numbers" iconSrc={numbersIcon} alt="Numbers page" />
      <div className="flex items-center gap-4">
        <div className="relative w-[45px] h-[45px]">
          <SubscribeButton />
        </div>
        <HeaderLink href="/admin" iconSrc={adminIcon} alt="Admin page" />
      </div>
    </nav>
  );
};
