import express from "express";
import * as controller from '../controller/groupController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

//스터디 세부사항 가져오기
router.get('/:id', controller.getGroupInfo)

//스터디 검색
//GET /group?category=:category
//GET /group?keyword=:keyword
//GET /group?category=:category&keyword=:keyword
router.get('/', controller.getGroups)

//참여 스터디 정보 보기
router.get('/info/:id', controller.getInfo)

//스터디 생성
router.post('/', isAuth, controller.createGroup);

//스터디 신청
router.put('/apply/:id', isAuth, controller.apply)

//스터디 취소
router.put('/cancel/:id', isAuth, controller.cancel)

//스터디 수정
router.put('/:id', isAuth, controller.update)

//스터디 삭제
router.delete('/:id', isAuth, controller.remove)

export default router;