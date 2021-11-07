import mongoose from 'mongoose';
import * as groupRepository from './group.js';
import * as certifyRepository from './certify.js'
import { useVirtualId } from '../db/database.js';

const schema = new mongoose.Schema({
    groupId: { type: String, required: true },
    commonList: [String],
    privateList: [{
        userId: { type: String, required: true },
        content: { type: String, required: true },
    }],
    certified: [{
        week: { type: Number, required: true },
        certifiedId: { type: Number, required: true },
    }],
})

useVirtualId(schema)

const TodoList = new mongoose.model('TodoList', schema)

//공통 todolist 생성
export async function createCommon(groupId, common) {
    const todo = await TodoList.find({ groupId });

    //해당 스터디에 todo리스트가 없다면 새로 생성
    if (todo.length == 0) {
        return new TodoList({ groupId, commonList: common }).save()
            .then(data => {
                return data.id
            })
    }
    else {

        return TodoList.findOne({ groupId })
            .then(list => {
                let commonList = list.commonList ? list.commonList : [];
                common.forEach(item => {
                    commonList.push(item)
                })

                return TodoList.findOneAndUpdate({ groupId }, { commonList: commonList })
                    .then(data => {
                        return data.id;
                    })

            })
    }

}

//공통 수정

//공통 가져오기
export async function findCommon(groupId) {
    return TodoList.find({ groupId }, 'commonList')
        .then(list => {

            return list;
        })
}

//개별 todolist 생성
export async function createPrivate(groupId, userId, privates) {
    const todo = await TodoList.find({ groupId });

    //해당 스터디에 todo리스트가 없다면 새로 생성
    let list = []
    if (todo.length == 0) {
        privates.forEach(item => {
            list.push({ userId, content: item })
        })

        return new TodoList({ userId, privateList: list }).save()
            .then(data => {
                return data.id
            })
    }
    else {
        return TodoList.findOne({ groupId })
            .then(todolist => {
                list = todolist.privateList ? todolist.privateList : [];
                privates.forEach(item => {
                    list.push({ userId, content: item })
                })

                return TodoList.findOneAndUpdate({ groupId }, { privateList: list })
                    .then(data => {
                        return data.id;
                    })

            })
    }

}

//개별 수정

//개별 가져오기
export async function findPrivate(groupId, userId) {
    return TodoList.findOne({ groupId })
        .then(todo => {

            let certainList = []
            todo.privateList.forEach(item => {
                if (item.userId == userId) {
                    certainList.push(item)
                }
            })

            return certainList;
        })
}

//todolist 리셋

//내 todo 가져오기
export async function findMyList(groups, userId) {
    let list = []

    for (var groupObject of groups) {

        var groupId = groupObject.groupId;
        const group = await groupRepository.findById(groupId)

        //한 스터디의 이번주 투두리스트 가져오기
        let sublist = []
        var commons = await findCommon(groupId)
        commons.forEach(item => sublist.push(item))

        var privates = await findPrivate(groupId, userId)
        privates.forEach(item => sublist.push(item))

        //인증 유무
        const item = await certifyRepository.findCertifyWithWeek(groupId, group.group.thisWeek)
        let certified = false
        if (item) {
            certified = true;
        }

        list.push({
            week: group.group.thisWeek,
            sublist,
            certified: certified
        })
    }


    return list;
}