import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface NavListItem {
  route?: string;
  action?: (e: MouseEvent) => void;
  title?: string;
  icon: IconDefinition;
}
