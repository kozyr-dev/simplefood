import { ButtonProps } from "@/shared/types/types";
import { BenefitPostProps as Article } from "@/shared/ui/blocks/BenefitPost/BenefitPost";

export interface BenefitsListProps {
  title: string;
  articles: Array<Article>;
  button: ButtonProps;
}
