const { Router } = require('express');
const authControlller = require('../controllers/authController');

const router = Router();

router.get('/signup', authControlller.signup_get);
router.post('/signup', authControlller.signup_post);
router.get('/login', authControlller.login_get);
router.post('/login', authControlller.login_post);
router.get('/logout', authControlller.logout_get);

module.exports = router;