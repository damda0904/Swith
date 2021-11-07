import mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';
import * as userRepository from './user.js';

const schema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    faceToFace: { type: Boolean, required: true },
    personnel: { type: Number, required: true },
    recruit: { type: Boolean, required: true },
    achievement: [{ type: Number, required: true }],
    thisWeek: { type: Number, required: true },
    mainImage: String,
    participants: [String],
    leader: String,
    keyword: [String],
    totalWeeks: Number,
})

useVirtualId(schema)

const StudyGroup = new mongoose.model('StudyGroup', schema)


//스터디 생성
export async function createGroup(group) {
    return new StudyGroup(group).save()
        .then(data => {
            console.log(data)

            return data.id
        })
}

//스터디 찾기(Id)
export async function findById(id) {
    return StudyGroup.findById(id)
        .then(async (group) => {

            const participants = await userRepository.findUsers(group.participants)

            return { group, participants }
        })
}

//스터디 찾기(카테고리, 키워드)
export async function findGroupsByCK(category, keyword) {
    let groupList = [];
    return StudyGroup.find({ category, title: { $regex: '.*' + keyword + '.*' }, recruit: true }, 'title mainImage description startDate EndDate personnel faceToFace participant')
        .then(group => {
            if (group.length > 0) {
                groupList.push(group)
            }
            return StudyGroup.find({ category, keyword: { $regex: '.*' + keyword + '.*' }, recruit: true }, 'title mainImage description startDate EndDate personnel faceToFace participant')
                .then(group => {
                    if (group.length > 0) {
                        groupList.push(group)
                    }
                    return groupList
                })
        })
}

//스터디 찾기(카테고리)
export async function findGroupsByCate(category) {
    return StudyGroup.find({ category, recruit: true }, 'title mainImage description startDate EndDate personnel faceToFace participant')
        .then(group => {
            console.log("group: " + group);

            return group
        })
}

//스터디 찾기(키워드)
export async function findGroupsByKey(keyword) {
    let groupList = [];
    return StudyGroup.find({ title: { $regex: '.*' + keyword + '.*' }, recruit: true }, 'title mainImage description startDate EndDate personnel faceToFace participant')
        .then(group => {
            if (group.length > 0) {
                groupList.push(group)
            }
            return StudyGroup.find({ keyword: { $regex: '.*' + keyword + '.*' }, recruit: true }, 'title mainImage description startDate EndDate personnel faceToFace participant')
                .then(group => {
                    if (group.length > 0) {
                        groupList.push(group)
                    }
                    return groupList
                })
        })
}

//내 스터디 찾기
export async function findMyGroups(userId, ids) {
    let groups = []
    ids.forEach(id => {
        const group = StudyGroup.findById(id, 'mainImage, title, startDate, endDate')
        groups.push(group)
    })

    console.log(groups);

    return groups;
}

//스터디 지원
export async function apply(id, userId) {
    return StudyGroup.findById(id)
        .then(group => {
            let participants = group.particitpants ? group.participants : [];
            if (participants.length == group.personnel) {
                return -1
            } else if (participants.length > 0 && participants.find(userId)) {
                return -2
            }

            participants.push(userId)
            return StudyGroup.findByIdAndUpdate(id, { participants })
                .then(group => { return group.id })
        })
}

//스터디 지원 취소
export async function cancel(id, userId) {
    return StudyGroup.findById(id)
        .then(group => {
            if (!group) {
                return true
            }

            let participants = group.particitpants ? group.participants : [];
            if (participants.length > 0 && !participants.find(userId)) {
                return false
            }

            for (var i = 0; i < participants.length; i++) {
                if (participants[i] == userId) {
                    participants.splice(i, 1);
                    break;
                }
            }

            return StudyGroup.findByIdAndUpdate(id, { participants })
                .then(group => { return group.id })
        })
}

//스터디 정보 수정
export async function update(id, info) {

    return StudyGroup.findByIdAndUpdate(id, info)
        .then(group => {
            console.log(group);

            return group.id;
        })
}

//스터디 삭제
export async function remove(id) {
    return StudyGroup.findByIdAndDelete(id);
}

