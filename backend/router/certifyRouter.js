import express from 'express';
import * as controller from '../controller/certifyController.js'

const router = express.Router();

//인증하기
router.post('/:id', controller);

export default router;
