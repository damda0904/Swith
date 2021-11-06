import mongoose from 'mongoose';

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

//개별 todolist 설정

//개별 수정

//todolist 리셋
