import { collections } from '../database';
import * as mongodb from 'mongodb';

export const findAllUser = async (req, res) => {
    const schedule = await collections.tickets.find({}).toArray();
    res.status(200).send(schedule)
}

export const findOneUser = async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = {_id: new mongodb.ObjectId(id)};
        const user = await collections.tickets.findOne(query);

        if(user) {
            res.status(200).send(user);
        }else{
            res.status(404).send(`Failed to find an user: ID ${ id }`);
        }

    } catch(error) {
        res.status(404).send(`Failed to find an user: ID ${ req?.params.id }`);
    }
}

export const createUser = async (req, res) => {
    try {
        const user = req.body;
        const result = await collections.tickets.insertOne(user);

        if(result.acknowledged){
            res.status(201).send(`Created a new ticket: ID ${ result.insertedId }`);
        } else {
            res.status(500).send("Failed to create new ticket");
        }

    } catch(error) {
        console.error(error);
        res.status(400).send("Failed to register new ticket");
    }
}

export const updateUser = async (req, res) => {
    try{
        const id = req?.params?.id;
        const user = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.tickets.updateOne(query, {$set: user});

        if(result && result.matchedCount){
            res.status(200).send(`Updated an user ID ${id}`);
        }else if(!result.matchedCount){
            res.status(404).send(`Failed to find an user ID ${id}`);
        }else{
            res.status(304).send(`Failed to update an user: ID ${id}`);
        }

    }catch(error){
        console.log(error.message);
        res.status(400).send(error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.tickets.deleteOne(query);

        if(result && result.deletedCount) {
            res.status(202).send(`Removed an user: ID ${ id }`);
        }else if(!result) {
            res.status(400).send(`Failed to remove an user: ID ${ id }`);
        } else {
            res.status(404).send(`Failed to find an user: ID ${id}`);
        }

    } catch(error) {
        console.error(error.message);
        res.status(400).send(error.message);
    } 
}