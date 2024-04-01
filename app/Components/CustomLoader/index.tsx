import { FourPointedStar } from "../Icons/FourPointedStar";
import Image from "next/image";
import React from "react";

type Props = {};

export default function CustomLoader({}: Props) {
  return (
    <div className="flex items-center justify-center relative size-[82px]">
      <Image
        alt="Loading"
        src="/custom-loading.png"
        width={60}
        height={60}
        className="animate-spin"
      />
      <Image
        alt="Loading"
        src="/custom-loading-large.png"
        width={82}
        height={82}
        className="absolute animate-reverse-spin top-0 left-0 size-[82px]"
      />
      <FourPointedStar className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
