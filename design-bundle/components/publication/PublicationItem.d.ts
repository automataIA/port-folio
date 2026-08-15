export interface PublicationItemProps {
  title: string;
  /** Journal, conference or publisher */
  venue?: string;
  year?: string | number;
  url?: string;
  /** Short label above the title, e.g. "Research Paper" */
  type?: string;
  /** Abstract or summary; clamped to 4 lines */
  summary?: string;
}
export declare function PublicationItem(props: PublicationItemProps): JSX.Element;
