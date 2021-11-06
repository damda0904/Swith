import mongoose from 'mongoose';
import * as groupRepository from './group.js';
import { useVirtualId } from '../db/database.js';

const schema = new mongoose.Schema({
    groupId: { type: Number, required: true },
    commonList: [String],
    privateList: [{
        userId: { type: Number, required: true },
        content: { type: String, required: true },
    }],
    certified: [{
        week: { type: Number, required: true },
        certifiedId: { type: Number, required: true },
    }],
})

useVirtualId(schema)

const TodoList = new mongoose.model('TodoList', schema)

//공통 todolist 설정

//공통 수정

//공통 가져오기
export async function findCommon(groupId) {
    return TodoList.find({ groupId }, 'commonList')
        .then(list => {
            console.log(list);

            return list;
        })
}

//개별 todolist 설정

//개별 수정

//개별 가져오기
export async function findPrivate(groupId, userId) {
    return TodoList.find({ groupId }, 'privateList')
        .then(list => {

            let certainList = []
            list.forEach(item => {
                if (item.userId == userId) {
                    certainList.push(item)
                }
            })

            return certainList;
        })
}

//todolist 리셋

//내 todo 가져오기
export async function findMyList(groupIds, userId) {
    let list = []
    groupIds.forEach(async (id) => {
        await findCommon(id).then(item => {
            list.push(item)
        })

        await findPrivate(id, userId)
            .then(itme => {
                list.push(item)
            })
    })

    return list;
}