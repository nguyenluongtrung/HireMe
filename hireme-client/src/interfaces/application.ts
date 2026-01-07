export interface Application {
    id: number;
    companyName: string;
    position: string;
    status: string;
    notes: string;
    dateApplied: Date | string | null
    createdAt: string;
}