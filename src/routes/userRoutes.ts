import { Router } from 'express'
import { 
    Hello,
    facebookLogin
} from '../controller/user'

const router = Router()

router.get('/', Hello)
router.post('/facebookLogin', facebookLogin)

export default router