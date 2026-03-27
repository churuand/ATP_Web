import { post } from "@/lib/api";

export type EmployerBriefPayload = {
  companyName: string;
  contactName: string;
  email: string;
  roleTitle: string;
  hiringType: string;
  functionArea: string;
  location: string;
  startDate?: string;
  numberOfHires?: number;
  jdNotes?: string;
  idealCandidate?: string;
  submissionMode: string;
  mustHaveSkills?: string;
  preferredUniversity?: string;
  workRights?: string;
  compensationType?: string;
  budgetRange?: string;
  weeklyHours?: string;
  conversionPotential?: string;
};

export async function submitEmployerBrief(payload: EmployerBriefPayload) {
  return post("/api/community/employer/brief", payload);
}
