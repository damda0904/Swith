import express from 'express';
import { toUnicode } from 'punycode';
import * as controller from '../controller/todoController.js'
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

//이번주 개별 todo 불러오기
router.get('/private/:id', isAuth, controller.getPrivate)

//이번주 공통 todo 불러오기
router.get('/common/:id', isAuth, controller.getCommon)

//내 todo 불러오기
router.get('/myTodo', isAuth, controller.getMyTodo)

export default router;