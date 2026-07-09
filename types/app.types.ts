import { MODULE_SECTIONS } from "@/lib/constants";
import { IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type ModuleSection = (typeof MODULE_SECTIONS)[number];

export interface IPlaybook {
  slug: string;
  title: string;
  description: string;
  docs: string;
}

export interface IDocument extends IPlaybook {
  module: number;
  order: number;
}

export interface IModule extends IPlaybook {
  order: number;
  topics: IDocument[];
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}
