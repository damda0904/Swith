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
        groupId: Number,
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
    return User.find({ email })
}