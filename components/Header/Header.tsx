import { Navigation } from "./components/Navigation/Navigation";

export const Header = () => {
  return (
    <header
      className="bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 backdrop-blur-md 
      text-white px-6 sm:px-10 py-3 fixed top-0 left-0 w-full z-50 
      border-b border-white/20 shadow-xl"
    >
      <Navigation />
    </header>
  );
};
