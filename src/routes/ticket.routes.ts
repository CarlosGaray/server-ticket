import * as express from 'express';
import { findAllUser, createUser, findOneUser, updateUser, deleteUser } from '../controllers/ticket.controller';

export const ticketRouter = express.Router();

ticketRouter.use(express.json());

ticketRouter.get('/', findAllUser);
ticketRouter.get('/:id', findOneUser);
ticketRouter.post('/', createUser);
ticketRouter.put('/:id', updateUser);
ticketRouter.delete('/:id', deleteUser);