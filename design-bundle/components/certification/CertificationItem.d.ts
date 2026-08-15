export interface CertificationItemProps {
  name: string;
  /** Awarding body */
  issuer?: string;
  year?: string | number;
  /** Optional short label above the name, e.g. "Professional" */
  badge?: string;
  /** What the credential covers; clamped to 4 lines */
  summary?: string;
}
export declare function CertificationItem(props: CertificationItemProps): JSX.Element;
