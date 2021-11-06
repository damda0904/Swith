import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt'
import { config } from '../config.js';
import * as userRepository from '../data/user.js';
import * as groupRepository from '../data/group.js';
import jwt from 'jsonwebtoken'

const jwtSecretKey = config.jwt.secretKey;
const jwtExpires = config.jwt.expiresInDays;
const bcryptSalt = config.bcrypt.salt;

//토큰생성
function createToken(id) {
    return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpires });
}


//회원가입
export async function signup(req, res) {
    const { email, password, username, major, studentId, profile } = req.body;

    const findEmail = await userRepository.findByEmail(email)
    console.log(findEmail);
    if (findEmail) {
        res.status(409).json({ message: "이미 등록된 이메일입니다." })
    }
    else {
        const hashed = await bcrypt.hash(password, bcryptSalt);

        const userId = await userRepository.createUser({
            email,
            password: hashed,
            username,
            major,
            studentId,
            profile,
        })

        const token = await createToken(userId);

        res.status(201).json({ token, success: true });
    }
}


//로그인
export async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userRepository.findByEmail(email)
    if (!user) {
        res.status(404).json({ message: "아이디 혹은 비밀번호를 확인해주세요" })
    }

    const isValidPasswd = await bcrypt.compare(password, user.password);
    if (!isValidPasswd) {
        res.status(404).json({ message: "아이디 혹은 비밀번호를 확인해주세요" })
    }

    const token = await createToken(user.id);
    res.status(200).json({ token, success: true })
}


//메일 인증
export async function authEmail(req, res) {
    const email = req.body.email;
    let min = Math.ceil(100000)
    let max = Math.floor(1000000)
    const code = Math.floor(Math.random() * (max - min)) + min;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: config.gmail.address,
            pass: config.gmail.passwd,
        }
    })

    // let info = await transporter.sendMail({
    //     from: '"Swith" <sookmyung.ac.kr>',
    //     to: email,
    //     subject: '[Swith] 인증코드를 입력하세요',
    //     html: `<h3>Swith Authencition Code<h3><br/><h3>다음 코드를 입력하세요</h3><h1>${code}<h1>`
    // })

    res.status(200).json({
        code: code, success: true
    })
}

//내 스터디들 미리보기
export async function getMyGroups(req, res) {
    const userId = req.userId;

    const user = await userRepository.findById(userId);
    if (!user.studyGroup) {
        res.status(200).json({ group: "empty", success: true })
    }
    else {
        const group = await groupRepository.findMyGroups(userId, user.studyGroup);
        res.status(200).json({ ...group, success: true })
    }
}

