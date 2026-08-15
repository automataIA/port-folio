export interface ProjectCardProps {
  title: string;
  /** Clamped to 4 lines so cards in a row stay level */
  description?: string;
  /** Variable number of technology tags; they wrap */
  tags?: string[];
  repo?: string;
  demo?: string;
  /** Optional highlighted figure, e.g. "1.2k stars" or "40ms p95" */
  metric?: string;
}
export declare function ProjectCard(props: ProjectCardProps): JSX.Element;
