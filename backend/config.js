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
    port: parseInt(required('PORT', 8080)),
    cors: {
        allowedOrigin: required('CORS_ALLOW_ORIGIN'),
    },
    gmail: {
        address: required('GMAIL_ADDRESS'),
        passwd: required('GMAIL_PASSWORD'),
    },
    db: {
        host: required('DB_HOST')
    },
    jwt: {
        secretKey: required('JWT_SECRET'),
    },
    bcrypt: {
        salt: parseInt(required('BCRYPT_SALT'))
    }
}