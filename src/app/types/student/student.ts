import { Gender } from "./gender-enum";

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    gender: Gender;
    country: string;
}