import mongoose from 'mongoose'
import useVirtualId from '../db/database.js';

const schema = new mongoose.schema({
    studyGroupId: { type: Number, required: true },
    title: { type: String, required: true },
    achieve: [String],
    notAchieve: [String],
    certifiedImg: { type: String, required: true },
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    week: { type: String, required: true }
}, { timestamp: true })

useVirtualId(schema)

const Certify = mongoose.model('Certify', schema);

export async function certify(id) {

    //아직 인증하지 않았었는지 확인
    return new Certify()
}