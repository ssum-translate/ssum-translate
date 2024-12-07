import Image from "next/image";

import headerLogo from "@/assets/icons/header-logo.svg";

export default function Header() {
  return (
    <header className="h-[56px] flex justify-center items-center font-semibold">
      <Image src={headerLogo} alt="" />
    </header>
  );
}
