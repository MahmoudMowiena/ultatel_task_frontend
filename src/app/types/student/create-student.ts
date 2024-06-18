import { Gender } from "./gender-enum";

export interface CreateStudent {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    gender?: Gender;
    country: string;
}