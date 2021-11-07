import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.js";

const schema = new Mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    major: { type: String, required: true },
    studentId: { type: Number, required: true },
    profile: String,
    studyGroup: [{
        groupId: { type: String, required: true },
        achieveNum: { type: Number, required: true }
    }]
})

useVirtualId(schema);

const User = Mongoose.model('User', schema);



export async function createUser(user) {
    return new User(user).save().then(data => {
        console.log(data)

        return data.id;
    })
}

export async function findUsers(ids) {
    let users = [];
    ids.forEach(id => {
        User.findById(id, 'username profile').then(user => {
            const { username, profile } = user;
            users.push({ username, profile });
        })
    })

    return users;
}

export async function findById(id) {
    return User.findById(id)

}

export async function findByEmail(email) {
    console.log(email)
    return User.findOne({ email })
}

export async function applyStudy(userId, groupId) {
    return User.findById(userId)
        .then(user => {
            let studyGroup = user.studyGroup ? user.studyGroup : [];

            studyGroup.push({ groupId, achieveNum: 0 })

            return User.findByIdAndUpdate(userId, { studyGroup })
        })
}

export async function cancelStudy(userId, groupId) {
    return User.findById(userId)
        .then(user => {
            let studyGroup = user.studyGroup;

            for (var i = 0; i < studyGroup.length; i++) {
                if (studyGroup[i].groupId == groupId) {
                    studyGroup.splice(i, 1);
                }
            }

            return User.findByIdAndUpdate(userId, { studyGroup })
        })
}

export async function updateAchieve(userId, groupId) {
    return User.findOne({ id: userId })
        .then((user) => {
            let groups = user.studyGroup;

            for (var i = 0; i < groups.length; i++) {
                if (groups[i].groupId == groupId) {
                    groups[i].achieveNum += 1
                }
            }

            return User.findOneAndUpdate({ id: userId }, { studyGroup: groups })
        })
}