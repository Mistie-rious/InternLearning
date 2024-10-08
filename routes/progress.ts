import express from 'express'
const router = express.Router()
import { progressController } from '../controllers';
import isAuth from '../middlewares/isAuth';
import validate from '../validators/validate';

router.post('/add/:id', isAuth, validate, progressController.addProgress)

router.get('/:id', isAuth, validate, progressController.getProgress)

router.get('/', isAuth, progressController.getAllProgress)

router.delete('/delete/:id', isAuth, progressController.deleteProgress)


export default router;