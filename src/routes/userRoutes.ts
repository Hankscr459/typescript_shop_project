import { Router } from 'express'
import { 
    Hello,
    facebookLogin,
    userInfo
} from '../controller/user'

import { protect } from '../middleware/authorMiddleware'

const router = Router()

router.get('/', Hello)
router.post('/facebookLogin', facebookLogin)
router.get('/userInfo', protect, userInfo)

export default router