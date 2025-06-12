import Image, { StaticImageData } from "next/image";

type HeaderImageProps = {
  src: StaticImageData;
  alt: string;
  onClick: () => void;
  isLoading: boolean;
};

export const SubscribeButtonImage = ({
  src,
  alt,
  onClick,
  isLoading,
}: HeaderImageProps) => {
  return (
    <Image
      className="cursor-pointer transform hover:scale-105 transition-all duration-200 
                  hover:brightness-110 active:scale-95 absolute top-0 left-0
                  transition-opacity duration-300"
      onClick={onClick}
      src={src}
      width={45}
      height={45}
      alt={alt}
      style={{ opacity: isLoading ? 0 : 1 }}
    />
  );
};
