import { Gender } from "./gender-enum";

export interface CreateStudent {
    firstName: string;
    lastName: string;
    email: string;
    birthDate?: Date;
    gender?: Gender;
    country: string;
}