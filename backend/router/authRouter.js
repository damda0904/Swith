import express from 'express'
import * as controller from '../controller/authController.js';

const router = express.Router();

async function validate(req, res, next) {
    const email = req.body.email;

    const address = email.split("@")[1]

    console.log("address: " + address);
    if (!address == 'sookmyung.ac.kr' && !address == 'sm.ac.kr') {
        res.status(401).json({ message: "숙명 이메일 주소여야 합니다." })
    } else {
        next()
    }
}


//로그인
router.get('/', validate, controller.login)

//숙명메일 인증
router.get('/', validate, controller.authEmail)

//회원가입
router.get('/', controller.signup)


export default router;
