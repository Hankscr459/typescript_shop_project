import { Router } from 'express'
import { 
    Hello,
    facebookLogin,
    userInfo,
    lineLogin,
    signup,
    signin
} from '../controller/user'

import { protect } from '../middleware/authorMiddleware'

const router = Router()

router.get('/', Hello)
router.post('/signup', signup)
router.post('/signin', signin)
router.get('/userInfo', protect, userInfo)
router.post('/facebookLogin', facebookLogin)
router.post('/lineLogin', lineLogin)

export default router