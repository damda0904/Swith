import mongoose from 'mongoose';
import { config } from '../config.js';

export async function connectDB() {
    return mongoose
        .connect(config.db.host, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
}

export function useVirtualId(schema) {
    schema.virtual('id').get(function () {
        return this._id.toString();
    })
    schema.set('toJSON', { virtuals: true })
    schema.set('toObject', { virtuals: true })
}