import * as todoRepository from '../data/todo.js';
import * as groupRepository from '../data/group.js';

export async function getCommon(req, res) {
    const id = req.params.id;

    const todo = await todoRepository.findCommon(id);

    res.status(200).json({ ...todo, success: true })

}

export async function getPrivate(req, res) {
    const id = req.params.id;
    const userId = req.userId;

    const todo = await todoRepository.findPrivate(id, userId);

    res.status(200).json({ ...todo, success: true })
}

export async function getMyTodo(req, res) {

}