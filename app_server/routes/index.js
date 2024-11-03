// var express = require('express');
// var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express &Nodemon by 2024810100 maenggyuno',
    message: 'Welcome to Express by 2024810100 맹균오'
   });
});
*/

const express = require('express');
const router = express.Router();
/*4장 9페이지 컨트롤러*/
// const homepageController = (req, res) => {
//   res.render('index', {title: 'Express' });
// };

// router.get('/', homepageController);

// /*4장 15페이지*/
// module.exports = router;

// const express = require('express');
// const router = express.Router();

//ctrlMain은 4장의 컨트롤러이고 url과 index컨트롤러를 라우터가 매핑해줌
// const ctrlMain = require('../controllers/main');
//router.get('/', ctrlMain.index);

// 5장 8페이지 로케이션 컨트롤러와 아더스 컨트롤러 파일을 인덱스 파일에 참조시키고 변수이름에 할당

const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

//5장 10페이지 라우터로 각 요청 url을 각 컨트롤러와 매핑해줌 홈리스트,로케이션인포,애드리뷰 컨트롤러와 어바웃 컨트롤러

router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationInfo);

//14장 5p
router
  .route('/location/:locationid/review/new')  // '/location/:locationid/review/new' 경로에 대한 라우트를 정의함. ':locationid'는 URL 경로의 변수임.
  .get(ctrlLocations.addReview)  // HTTP GET 요청을 받으면 'ctrlLocations.addReview' 함수가 호출됨.
  .post(ctrlLocations.doAddReview);  // HTTP POST 요청을 받으면 'ctrlLocations.doAddReview' 함수가 호출됨.

// router.get('/location/review/new', ctrlLocations.addReview);

router.get('/about', ctrlOthers.about);

module.exports = router;
