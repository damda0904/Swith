import * as todoRepository from '../data/todo.js';
import * as groupRepository from '../data/group.js';
import * as userRepository from '../data/user.js';

export async function getCommon(req, res) {
    const id = req.params.id;

    const todo = await todoRepository.findCommon(id);

    res.status(200).json({ todo, success: true })

}

export async function getPrivate(req, res) {
    const id = req.params.id;
    const userId = req.userId;

    const todo = await todoRepository.findPrivate(id, userId);

    res.status(200).json({ todo, success: true })
}

export async function getMyTodo(req, res) {
    const id = req.params.id;
    const userid = req.userId;

    const user = await userRepository.findById(user)

    const list = await todoRepository.findMyList(user.studyGroup, userId);

    res.status(200).json({ list, success: true })
}