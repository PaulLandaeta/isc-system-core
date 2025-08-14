export interface ProfessorProfileResponseDTO {
    name: string;
    lastname: string;
    mothername?: string;
    career?: string;
    phone: string;
    email: string;
    role?: string;
    tutorias: Tutoria[];
}

interface Tutoria {
    id: string;
    id_estudiante: number;
    nombre_proyecto: string;
    semestre: string;
    hasSeminarEnroll: boolean;
    hasTutorLetter: boolean;
    hasTutorApproval: boolean;
    hasReviewerLetter: boolean;
    hasReviewerApproval: boolean;
}