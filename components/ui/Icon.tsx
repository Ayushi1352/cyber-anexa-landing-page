import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaQuoteLeft, FaStar, FaYoutube } from "react-icons/fa";
import {
  LuActivity,
  LuArrowRight,
  LuArrowUpRight,
  LuBadgeCheck,
  LuBriefcase,
  LuBug,
  LuCheck,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuCloud,
  LuCompass,
  LuDatabaseBackup,
  LuFileCheck,
  LuHeadset,
  LuLifeBuoy,
  LuLock,
  LuMail,
  LuMapPin,
  LuMenu,
  LuMonitorSmartphone,
  LuNetwork,
  LuPhone,
  LuRadar,
  LuScanSearch,
  LuShieldCheck,
  LuSlidersHorizontal,
  LuX,
} from "react-icons/lu";

// Every icon the site can use, by the name templates.json stores. A new icon is added here once.
const icons: Record<string, IconType> = {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaQuoteLeft,
  FaStar,
  FaYoutube,
  LuActivity,
  LuArrowRight,
  LuArrowUpRight,
  LuBadgeCheck,
  LuBriefcase,
  LuBug,
  LuCheck,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuCloud,
  LuCompass,
  LuDatabaseBackup,
  LuFileCheck,
  LuHeadset,
  LuLifeBuoy,
  LuLock,
  LuMail,
  LuMapPin,
  LuMenu,
  LuMonitorSmartphone,
  LuNetwork,
  LuPhone,
  LuRadar,
  LuScanSearch,
  LuShieldCheck,
  LuSlidersHorizontal,
  LuX,
};

type Props = {
  name: string;
  className?: string;
  // Line thickness of the outline icons (Lu); the filled Fa icons keep their own shape.
  strokeWidth?: number;
};

export const Icon = ({ name, className, strokeWidth = 1.8 }: Props) => {
  const Component = icons[name] ?? LuShieldCheck;
  return <Component className={className} strokeWidth={name.startsWith("Fa") ? undefined : strokeWidth} aria-hidden="true" />;
};
