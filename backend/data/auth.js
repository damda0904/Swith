import { Mongoose } from "mongoose";
import { useVirtualId } from "../db/database";

const schema = Mongoose.schema({

})

const User = Mongoose.model('User', schema);

useVirtualId(User);

export async function findById(email, password) {


}