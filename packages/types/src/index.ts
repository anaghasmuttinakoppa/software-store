export type TenantId = string;

export type ApplicationStatus = "draft" | "published" | "deprecated";

export interface ApplicationSummary {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  version: string;
  status: ApplicationStatus;
}
