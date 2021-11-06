import express from 'express';
import * as controller from '../controller/todoController.js'
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

//이번주 개별 todo 불러오기
router.get('/private/:id', isAuth, controller)

//이번주 공통 todo 불러오기
router.get('/common/:id', isAuth, controller)

//내 todo 불러오기
router.get('/myTodo', isAuth, controller)