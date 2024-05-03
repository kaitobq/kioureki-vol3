export type MedicalRecord = {
  id: number;
  name: string;
  part: string;
  treatment_status: string;
  diagnosis: string;
  memo?: string;
  date_of_injury: string;
  return_date?: string;
};
