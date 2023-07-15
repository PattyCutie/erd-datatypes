// School entity
interface School {
  school_id: number;
  name: string;
  location: string;
  school_type: string;
  teachers: Teacher[]; // Many-to-One relationship with Teacher entity
  students: Student[]; // Many-to-One relationship with Student entity
}

// User entity
type AuthUser = {
  user: Teacher | Student | null;
  last_login: string;
  is_active: boolean;
}

// Teacher entity
interface Teacher {
  teacher_id: number;
  name: string;
  avatar: string;
  email: string;
  department: string;
  subjects: Subject[]; // One-to-Many relationship with Subject entity
  students: Student[]; // Many-to-Many relationship with Student entity
  school: School; // One-to-Many relationship with School entity
  exams: Exam[]; // One-to-Many relationship with Exam entity
  canManageExams: boolean; // Only teachers can manage exams
  canSeeStudentResults: boolean; // Only teachers can see student results
  canSeeStudents: boolean; // Only teachers can see students who enter the exam
  canSeeExamDetails: boolean; // Only teachers can see the exam details
  studentsEnrolled: Student[]; // Only students who have enrolled in the teacher's subject
}

// Subject entity
interface Subject {
  subject_id: number;
  name: string;
  description: string;
  exams: Exam[];
  teacher: Teacher; // One-to-One relationship with Teacher entity
  students: Student[]; // Many-to-Many relationship with Student entity
}

// Exam entity
interface Exam {
  exam_id: number;
  exam_type: string;
  subject: string;
  topic: string;
  grade: number;
  quiz_count: number;
  point: number;
  semester: number;
  date: Date;
  duration: string;
  time_start: string;
  time_end: string;
  teacher: Teacher; // One-to-Many relationship with Teacher entity
  questions: Question[]; // One-to-Many relationship with Question entity
}

// Question entity
interface Question {
  question_id: number;
  exam_id: number;
  text: string;
  choices: string[];
  correct_answer: string;
}

// Student entity
interface Student {
  student_id: number;
  name: string;
  avatar: string;
  email: string;
  grade: string;
  score_summary: ScoreSummary[];
  school: School; // One-to-Many relationship with School entity
  exams: Exam[]; // Many-to-Many relationship with Exam entity
  exam_submissions: ExamSubmission[]; // One-to-Many relationship with ExamSubmission entity
  canEnterExamSession: boolean; // Only students can enter exam sessions
  enrolledSubjects: Subject[]; // Only students who have enrolled in specific subjects
}

// ScoreSummary entity
interface ScoreSummary {
  exam_results: ExamResult[];
}

// ExamSubmission entity
interface ExamSubmission {
  submission_id: number;
  exam_id: number;
  student_id: number;
  answers: ExamAnswer[];
  canSeeResults: boolean; // Only the student who owns the submission can see results
}

// ExamAnswer entity
interface ExamAnswer {
  question_id: number;
  selected_choice: string;
  is_correct: boolean;
}

// ExamResult entity
interface ExamResult {
  student_exam_id: number;
  exam: ExamSubmission[];
  student: Student;
}

// Additional properties for access control
interface ExamAccess {
  canManageExams: boolean; // Only teachers can manage exams
  canSeeStudentResults: boolean; // Only teachers can see student results
  canSeeStudents: boolean; // Only teachers can see students who enter the exam
  canSeeExamDetails: boolean; // Only teachers can see the exam details
  canEnterExamSession: boolean; // Only students can enter exam sessions
  canSeeSubmissionResults: boolean; // Only the student who owns the submission can see results
}

// Augment the existing entities with access control properties
type AuthTeacher = Teacher & ExamAccess;
type AuthStudent = Student & ExamAccess;
