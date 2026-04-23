import { ButtonProps } from "@/shared/types/types";
import { ArticlePostProps as Article } from "@/shared/ui/elements/ArticlePost/ArticlePost";

export interface ArticlesListProps {
  title: string;
  articles: Array<Article>;
  button: ButtonProps;
  id: string;
  class: string;
}
