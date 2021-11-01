const bodyParser = require('body-parser');
const { Router }= require('express');
const empleadoController = require('../controllers/empleadoController');

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('', empleadoController.index);

router.get('/list', empleadoController.list);

router.get('/create', empleadoController.create);

router.get('/get-all', empleadoController.get_all);

router.get('/reset', empleadoController.reset);

router.post('/save', empleadoController.save);

router.use(empleadoController.error404);

module.exports = router;