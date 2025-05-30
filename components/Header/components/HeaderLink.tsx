import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type HeaderLinkProps = {
  href: string;
  iconSrc: StaticImageData;
  alt: string;
};

export const HeaderLink = ({ href, iconSrc, alt }: HeaderLinkProps) => {
  return (
    <Link href={href} className="hover:opacity-80 transition-opacity">
      <Image
        src={iconSrc}
        width={45}
        height={45}
        alt={alt}
        className="transform hover:scale-105 transition-all duration-200 hover:brightness-110"
      />
    </Link>
  );
};
