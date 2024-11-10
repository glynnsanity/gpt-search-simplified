export interface UserContext {
  key: string;
  kind: string;
  anonymous?: boolean;
  custom?: {
    affinities?: string[];
  };
}