export interface ExperienceItemProps {
  /** Job title, e.g. "Machine Learning Engineer" */
  role: string;
  /** Employer or client */
  company?: string;
  /** Free-form period, e.g. "2023 — present" */
  period?: string;
  /** 2-4 achievements. Anything past the 4th is dropped; each line clamps to 3 lines. */
  bullets?: string[];
  /** Technology tags */
  stack?: string[];
}
export declare function ExperienceItem(props: ExperienceItemProps): JSX.Element;
