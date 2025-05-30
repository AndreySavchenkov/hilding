import Image from "next/image";
import refreshIcon from "../../../../public/refresh.png";

type HeaderProps = {
  handleRefresh: () => void;
};

export const Header = ({ handleRefresh }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl md:text-2xl font-bold text-gray-100">
        Panel administratora
      </h1>
      <Image
        onClick={handleRefresh}
        src={refreshIcon}
        width={45}
        height={45}
        alt="Refresh data"
        className="transform hover:scale-105 transition-all duration-200 hover:brightness-110 cursor-pointer"
      />
    </div>
  );
};
