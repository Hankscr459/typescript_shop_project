import { Router } from 'express'
import { Hello } from '../controller/user'

const router = Router()

router.get('/', Hello)

export default router