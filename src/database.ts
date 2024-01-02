import * as mongodb from 'mongodb';
import { User } from './models/ticket';

export const collections: {
    tickets?: mongodb.Collection<User>;
} = {};

export async function connectToDataBase(uri: string) {
    try {
        const client = new mongodb.MongoClient(uri);

        const db = client.db("ticket");

        const ticketsConnection = db.collection<User>('users');

        collections.tickets = ticketsConnection;

        console.log("Connected to MongoDB!");

    } catch(error) {
        console.log(error);
    }
}