import express from 'express';
import * as controller from '../controller/certifyController.js'
import { isAuth } from '../middleware/isAuth.js'

const router = express.Router();

//인증하기
router.post('/:id', isAuth, controller.certify);

export default router;
