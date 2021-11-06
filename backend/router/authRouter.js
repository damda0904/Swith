import express from 'express'
import { body } from 'express-validator';
import * as controller from '../controller/authController.js';
import { validate, checkEmail } from '../middleware/validate.js';

const router = express.Router();

const validateGmail = [
    body("email")
        .trim()
        .notEmpty()
        .custom((value, { req }) => checkEmail)
        .withMessage("숙명 메일을 입력해주세요"),
    validate
]

const validateLogin = [
    ...validateGmail,
    body("password")
        .trim()
        .notEmpty()
        .withMessage("비밀번호를 입력하세요"),
    validate
]

const validateForm = [
    body("password")
        .trim()
        .notEmpty()
        .withMessage("비밀번호를 입력하세요"),
    body("username")
        .trim()
        .notEmpty()
        .withMessage("닉네임을 입력하세요"),
    body("studentId")
        .trim()
        .notEmpty()
        .withMessage("학번을 입력하세요"),
    validate
]


//로그인
router.post('/login', validateLogin, controller.login)

//숙명메일 인증
router.post('/authEmail', validateGmail, controller.authEmail)

//회원가입
router.post('/signup', validateForm, controller.signup)


export default router;
