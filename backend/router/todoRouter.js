import express from 'express';
import * as controller from '../controller/todoController.js'
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

//공통 todo 입력
router.put('/common/:id', isAuth, controller.createCommon)

//개별 todo 입력
router.put('/private/:id', isAuth, controller.createPrivate)

//이번주 공통 todo 불러오기
router.get('/common/:id', isAuth, controller.getCommon)

//이번주 개별 todo 불러오기
router.get('/private/:id', isAuth, controller.getPrivate)

//내 todo 불러오기
router.get('/myTodo', isAuth, controller.getMyTodo)

export default router;