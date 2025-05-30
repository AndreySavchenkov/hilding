import Image from "next/image";
import emptyStateIcon from "../../../../public/emptyState.png";

export const EmptyState = () => {
  return (
    <div className="h-[calc(100vh-70px)] p-6 flex items-center justify-center">
      <div className="text-center">
        <Image
          src={emptyStateIcon}
          alt="empty state icon"
          width={80}
          height={80}
          className="mx-auto mb-6 opacity-70"
        />
        <span className="text-xl font-medium text-gray-500">
          Nie ma nowych zamówień
        </span>
      </div>
    </div>
  );
};
