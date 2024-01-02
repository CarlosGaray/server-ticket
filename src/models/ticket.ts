import * as mongodb from 'mongodb';

export interface User {
    first: string,
    last: string,
    dni: string,
    numberphone: string,
    grade: string,
    _id?: mongodb.ObjectId
}