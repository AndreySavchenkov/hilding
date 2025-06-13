import { HeaderLink } from "@/components/ui/HeaderLink";
import { SubscribeButton } from "./components/SubscribeButton/SubscribeButton";
import adminIcon from "@/public/admin.png";
import homeIcon from "@/public/home.png";
import numbersIcon from "@/public/numbers.png";
import profileIcon from "@/public/profile.png";
import { useUserRole } from "@/hooks/useUserRole";

export const UserNavigation = () => {
  const { isAdmin, isDriver, isWorker } = useUserRole();
  const canShowNumbersLink = !isDriver;
  const canShowAdditionalLinks = !isWorker;
  const canShowAdminLink = isAdmin;

  return (
    <nav className="flex max-w-screen-xl mx-auto items-center justify-between">
      <HeaderLink href="/" iconSrc={homeIcon} alt="Home page" />
      {canShowNumbersLink && (
        <HeaderLink href="/numbers" iconSrc={numbersIcon} alt="Numbers page" />
      )}
      {canShowAdditionalLinks && (
        <div className="flex items-center gap-4">
          <div className="relative w-[45px] h-[45px]">
            <SubscribeButton />
          </div>
          {canShowAdminLink && (
            <HeaderLink href="/admin" iconSrc={adminIcon} alt="Admin page" />
          )}
        </div>
      )}
      <HeaderLink href="/profile" iconSrc={profileIcon} alt="Profile page" />
    </nav>
  );
};
