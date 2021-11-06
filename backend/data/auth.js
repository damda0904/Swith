import { Mongoose } from "mongoose";
import { useVirtualId } from "../db/database";

const schema = Mongoose.Schema({
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

const User = Mongoose.model('User', schema);

useVirtualId(User);


export async function createUser(user) {
    return new User(user).save().then(data => {
        console.log(data)

        return data.id;
    })
}

export async function findById(id) {


}

export async function findByEmail(email) {

}