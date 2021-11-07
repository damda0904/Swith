import * as todoRepository from '../data/todo.js';
import * as groupRepository from '../data/group.js';
import * as userRepository from '../data/user.js';


//공통 todo 받기
export async function getCommon(req, res) {
    const id = req.params.id;

    const todo = await todoRepository.findCommon(id);

    res.status(200).json({ todo, success: true })

}

//공통 todo 생성
export async function createCommon(req, res) {
    const groupId = req.params.id;
    const commonList = req.body.commonList;

    const todoId = await todoRepository.createCommon(groupId, commonList);

    res.status(200).json({ todoId, success: true })
}


//개별 todo 받기
export async function getPrivate(req, res) {
    const id = req.params.id;
    const userId = req.userId;

    const todo = await todoRepository.findPrivate(id, userId);

    res.status(200).json({ todo, success: true })
}

//개별 todo 생성
export async function createPrivate(req, res) {
    const groupId = req.params.id;
    const userId = req.userId;
    const privateList = req.body.privateList;

    const todoId = await todoRepository.createPrivate(groupId, userId, privateList);

    res.status(200).json({ todoId, success: true })
}


//내 todo 받기
export async function getMyTodo(req, res) {
    const id = req.params.id;
    const userId = req.userId;

    const user = await userRepository.findById(userId)

    const list = await todoRepository.findMyList(user.studyGroup, userId);

    res.status(200).json({ list, success: true })
}