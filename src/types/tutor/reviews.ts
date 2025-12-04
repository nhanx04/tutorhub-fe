export interface StudentReview {
  studentId: number;
  studentName: string;
  studentEmail: string;
  attendance: boolean | null;
  score: number | null;
  feedback: string | null;
}

export interface ReviewSubmission {
  studentId: number;
  attendance: boolean;
  score: number;
  feedback: string;
}

