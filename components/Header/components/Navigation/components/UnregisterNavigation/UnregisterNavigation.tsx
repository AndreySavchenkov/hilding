import { HeaderLink } from "@/components/ui/HeaderLink";
import homeIcon from "@/public/home.png";

export const UnregisterNavigation = () => {
  return (
    <nav className="flex max-w-screen-xl mx-auto items-center justify-between">
      <HeaderLink href="/" iconSrc={homeIcon} alt="Home page" />
    </nav>
  );
};
