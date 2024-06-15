import { Gender } from "./gender-enum";

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    gender: Gender;
    country: string;
}