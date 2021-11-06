import dotenv from 'dotenv';
dotenv.config();

//환경변수 유무를 체크하는 함수
function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue;
    if (value == null) {
        throw new Error(`Key ${key} is undefined`)
    }
    return value;
}

export const config = {
    host: {
        port: parseInt(required('HOST_PORT', 8080))
    },
    gmail: {
        address: required('GMAIL_ADDRESS'),
        passwd: required('GMAIL_PASSWORD'),
    }
}