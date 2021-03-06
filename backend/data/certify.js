import mongoose from 'mongoose'
import { useVirtualId } from '../db/database.js';
import * as userRepository from '../data/user.js';
import * as groupRepository from './group.js';

const schema = new mongoose.Schema({
    studyGroupId: { type: String, required: true },
    title: { type: String, required: true },
    achieve: [String],
    notAchieve: [String],
    certifiedImg: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    week: { type: String, required: true }
}, { timestamp: true })

useVirtualId(schema)

const Certify = mongoose.model('Certify', schema);


//인증하기
export async function certify(userId, groupId, certify) {
    const user = await userRepository.findById(userId);
    const group = await groupRepository.findById(groupId);

    await userRepository.updateAchieve(userId, groupId)

    return new Certify({
        ...certify,
        studyGroupId: groupId,
        title: group.group.title,
        userId: userId,
        username: user.username
    }).save().then(data => {
        return data.id;
    })
}

//인증 여부 검색
export async function findCertifyWithWeek(groupId, week) {
    return Certify.findOne({ studyGroupId: groupId, week: week })
}