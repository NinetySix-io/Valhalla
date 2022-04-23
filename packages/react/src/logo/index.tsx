import * as React from "react";

import type { ComponentProps } from "../types";
import Image from "next/image";
import LogoAsset from "../../assets/logo.png";

type Props = ComponentProps<Omit<React.ComponentProps<typeof Image>, "src">>;

export const Logo: React.FC<Props> = (props) => {
  return <Image alt="Logo" {...props} src={LogoAsset} />;
};
