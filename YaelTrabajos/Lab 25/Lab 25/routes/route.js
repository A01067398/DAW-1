const isAuth = require('../is-auth');
const bodyParser = require('body-parser');
const { Router }= require('express');

const homeController = require('../controllers/homeController');
const empleadoController = require('../controllers/empleadoController');
const usuarioController = require('../controllers/usuarioController');

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('', isAuth, homeController.home);

router.get('/empleado/list', isAuth, empleadoController.list);
router.get('/empleado/add', isAuth, empleadoController.add);
router.get('/empleado/edit', isAuth, empleadoController.edit);
router.get('/empleado/delete', isAuth, empleadoController.delete);
router.post('/empleado/save', isAuth, empleadoController.save);
router.post('/empleado/update', isAuth, empleadoController.update);

router.get('/empleado/list-ajax', isAuth, empleadoController.listAjax);
router.get('/empleado/get-all-ajax', empleadoController.getAllAjax);
router.get('/empleado/add-ajax', isAuth, empleadoController.addAjax);

router.get('/reset', isAuth, homeController.reset);

router.get('/login', homeController.index);
router.get('/logout', homeController.logout);

router.get('/register', usuarioController.register);
router.post('/login', usuarioController.login);
router.post('/register', usuarioController.saveRegister);

router.get('/usuario/add', isAuth, usuarioController.add);
router.post('/usuario/save', usuarioController.save);
router.get('/usuario/list', isAuth, usuarioController.list);
router.get('/usuario/delete', isAuth, usuarioController.delete);

router.get('/cuestionario', homeController.cuestionario);

router.use(empleadoController.error404);

module.exports = router;