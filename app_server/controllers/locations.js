// 5장 14페이지 로케이션즈 파일에 3개의 컨트롤러 추가
// const homelist = (req, res) => {
//     res.render('index', { title: 'Home'});
// };

// const locationInfo = (req, res) => {
//     res.render('index', { title: 'Location info'});
// };

// const addReview = (req, res) => {
//     res.render('index', { title: 'Add review' });
// };

// // 5장 35페이지 컨트롤러 변경

// const homelist = (req, res) => {
//     res.render('locations-list', { title: 'Home'});
// };

// // 5장 45페이지 컨트롤러 변경-> 6장 39페이지에서 변경함

// const locationInfo = (req, res) => {
//     res.render('location-info', { title: 'Location info'});
// };

// 5장 51페이지 컨트롤러 변경 -> 6장 41페이지에서 변경함

// const addReview = (req, res) => {
//     res.render('location-review-form', { title: 'Add review' });
// };

// module.exports = {
//     homelist,
//     locationInfo,
//     addReview
// };

//10장 8페이지 11p에서 코드 추가함
// const mongoose = require('mongoose');
// const Loc = mongoose.model('Location');

// const locationsReadOne = async (req, res) => {
//   try {
//     const location = await Loc.findById(req.params.locationid).exec();
//     res.status(200).json(location);
//   } catch (err) {
//     res.status(500).json({ error: 'An error occurred.' });
//   }
// };

//12장 7p

var request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://yourapi.com';
}

//12장 12p
const requestOptions = {
  url: `${apiOptions.server}`,
  method: 'GET',
  json: {},
  qs: {
      offset: 20
  }
};

request(requestOptions, (err, response, body) => {
  if (err) {
      console.log(err);
  }
  if (response.statusCode === 200) {
      console.log(body);
  } else {
      console.log(response.statusCode);
  }
});

//12장 18p
const homelist = (req, res) => {
  const path = '/api/locations';
  const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'GET',
      json: {},
      qs: {
          lng: 127.2642483,
          lat: 37.0116265,
          maxDistance: 200000
      }
  };

  // const homelist = (req, res) => {
  //   const path = '/api/locations';
  //   const requestOptions = {
  //       url: `${apiOptions.server}${path}`,
  //       method: 'GET',
  //       json: {},
  //       qs: {
  //           lng: 1,
  //           lat: 1,
  //           maxDistance: 0.002
  //       }
  //   };

  // request(requestOptions, (err, response, body) => {
  //     renderHomepage(req, res, body);
  // });
  //12장 23p
  // request(
  //   requestOptions,
  //   (err, response, body) => {
  //       let data = [];
  //       data = body.map((item) => {
  //           item.distance = formatDistance(item.distance);
  //           return item;
  //       });
  //       renderHomepage(req, res, data);
  //   }
  // );

//12장 28p
  request(
    requestOptions,
    (err, { statusCode }, body) => {
        let data = [];
        
        // 상태 코드가 200이고, body가 비어있지 않은 경우에만 처리
        if (statusCode === 200 && body.length) {
            data = body.map((item) => {
                item.distance = formatDistance(item.distance);
                return item;
            });
        } else {
            console.log(`Error: Received status code ${statusCode} or empty body.`);
        }
        
        renderHomepage(req, res, data);
    }
);
};

//12장 23p
// request(
//   requestOptions,
//   (err, response, body) => {
//       let data = [];
//       data = body.map((item) => {
//           item.distance = formatDistance(item.distance);
//           return item;
//       });
//       renderHomepage(req, res, data);
//   }
// );

//12장 22p
const formatDistance = (distance) => {
  let thisDistance = 0;
  let unit = 'm';
  if (distance > 1000) {
      thisDistance = parseFloat(distance / 1000).toFixed(1);
      unit = 'km';
  } else {
      thisDistance = Math.floor(distance);
  }
  return thisDistance + unit;
};

//12장 19p
// const renderHomepage = (req, res, responseBody) => {
//   res.render('locations-list', {
//       title: 'Loc8r - find a place to work with wifi',
//       pageHeader: {
//           title: 'Loc8r',
//           strapline: 'Find places to work with wifi near you!'
//       },
//       sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
//       locations: responseBody
//   });
// };

//12장 31p
const renderHomepage = function(req, res, responseBody) {
  let message = null;

  // responseBody가 배열이 아니면 에러 메시지 설정
  if (!(responseBody instanceof Array)) {
      message = "API lookup error";
      responseBody = [];
  } else {
      // 배열이지만 빈 배열일 경우 메시지 설정
      if (!responseBody.length) {
          message = "No places found nearby";
      }
  }

  // 'locations-list' 뷰를 렌더링
  res.render('locations-list', {
      title: 'Loc8r - find a place to work with wifi',
      pageHeader: {
          title: 'Loc8r',
          strapline: 'Find places to work with wifi near you!'
      },
      sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
      locations: responseBody,
      message: message
  });
};

/* GET 'home' page 6장 33페이지는 5장 35페이지에서 homelist 컨트롤러만 변경된거고 5장 45,51페이지 로케이션 인포와 로케이션 
리뷰폼은 그대로 둬야함 또한 module.export ={ homelist, locationInfo,addReview}; 가 맨 마지막에 꼭 있어야 컨트롤러가 실행됨 */ 
// const homelist = (req, res) => {
//     res.render('locations-list', {
//       title: 'Loc8r - find a place to work with wifi',
//       pageHeader: {
//         title: 'Loc8r',
//         strapLine: 'Find places to work with wifi near you!'
//       },
//       sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
//       locations: [
//         {
//           name: 'Starcups',
//           address: '안성시 중앙로, Reading, RG6 1PS',
//           rating: 3,
//           facilities: ['Hot drinks', 'Food', 'Premium wifi'],
//           distance: '100m'
//         },
//         {
//           name: 'Cafe Hero',
//           address: '안성시 금산동, Reading, RG6 1PS',
//           rating: 4,
//           facilities: ['Hot drinks', 'Food', 'Premium wifi'],
//           distance: '200m'
//         },
//         {
//           name: 'Burger Queen',
//           address: '안성시 공도읍, Reading, RG6 1PS',
//           rating: 2,
//           facilities: ['Food', 'Premium wifi'],
//           distance: '250m'
//         }
//       ]
//      }
//     );
//   };


//13장 12p 

const renderDetailPage = function(req, res, location) {
  res.render('location-info', {
      title: location.name,
      pageHeader: {
          title: location.name
      },
      sidebar: {
          context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
          callToAction: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
      },
      location: location
  });
};

//13장 11p

// const locationInfo = (req, res) => {
//   const path = `/api/locations/${req.params.locationid}`;
//   const requestOptions = {
//       url: `${apiOptions.server}${path}`,
//       method: 'GET',
//       json: {}
//   };

  // request(
  //     requestOptions,
  //     (err, response, body) => {
  //         if (err) {
  //             console.log(err);
  //             return;
  //         }

  //         const data = body;
  //         data.coords = {
  //             lng: body.coords[0],
  //             lat: body.coords[1]
  //         };

  //         renderDetailPage(req, res, data);
  //     }
  // );

  //13장 24p
//   request(
//     requestOptions,
//     (err, { statusCode }, body) => {
//         const data = body;

//         // 상태 코드가 200인 경우에만 처리
//         if (statusCode === 200) {
//             data.coords = {
//                 lng: body.coords[0],
//                 lat: body.coords[1]
//             };
//             renderDetailPage(req, res, data);
//         } else {
//             // 상태 코드가 200이 아닐 경우 에러 처리
//             showError(req, res, statusCode);
//         }
//     }
//   );
// };

//13장 26p

const showError = (req, res, status) => {
  let title = '';
  let content = '';

  // 상태 코드가 404인 경우
  if (status === 404) {
      title = '404, page not found';
      content = 'Oh dear. Looks like you can\'t find this page. Sorry.';
  } else {
      // 그 외의 상태 코드인 경우
      title = `${status}, something's gone wrong`;
      content = 'Something, somewhere, has gone just a little bit wrong.';
  }

  // 응답 상태 코드 설정 및 템플릿 렌더링
  res.status(status);
  res.render('generic-text', {
      title,
      content
  });
};



  // 6장 39페이지 로케이션 인포 컨트롤러 변경

  
//   const locationInfo = function(req, res) {
//     res.render('location-info', {
//       title: 'Starcups',
//       pageHeader: { title: 'Starcups' },
//       sidebar: {
//         context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
//         callToAction: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
//       },
//       location: {
//         name: 'Starcups',
//         address: '안성시, 중앙로 274, 1',
//         rating: 3,
//         facilities: ['Hot drinks', 'Food', 'Premium wifi'],
//         coords: { lng: 127.27979032841, lat: 37.0080705033718 },
//         openingTimes: [
//           { days: 'Monday - Friday', opening: '7:00am', closing: '7:00pm', closed: false },
//           { days: 'Saturday', opening: '8:00am', closing: '5:00pm', closed: false },
//           { days: 'Sunday', closed: true }
//         ],
//         reviews: [
//           { author: 'maenggyuno', rating: 5, timestamp: '16 July 2024', reviewText: "와이 파이가 잘 터짐!!" },
//           { author: '맹균오', rating: 3, timestamp: '16 June 2013', reviewText: "커피가 맛있음" }
//         ]
//       }
//     }
//   );
// };

// 6장 41페이지 애드리뷰 컨트롤러 변경

//   const addReview = function(req, res) {
//     res.render('location-review-form', {
//       title: 'Review Starcups on Loc8r',
//       pageHeader: { title: 'Review Starcups' }
//     });
//   };

//14장 12p

const getLocationInfo = (req, res, callback) => {  // 'getLocationInfo' 함수 정의, 세 번째 매개변수로 callback 함수 사용
    const path = `/api/locations/${req.params.locationid}`;  // API 경로 설정, URL의 'locationid' 파라미터를 동적으로 반영
    const requestOptions = {
      url: `${apiOptions.server}${path}`,  // API 서버 주소와 결합한 전체 URL 생성
      method: 'GET',  // HTTP GET 요청 사용
      json: {}  // JSON 형식의 빈 객체를 전송
    };
  
    // request를 통해 API 호출
    request(requestOptions, (err, { statusCode }, body) => {
      let data = body;  // API에서 받은 데이터를 'data' 변수에 저장
      if (statusCode === 200) {  // 상태 코드가 200일 경우에만 처리
        data.coords = {
          lng: body.coords[0],  // 'coords'의 첫 번째 값은 경도
          lat: body.coords[1]  // 'coords'의 두 번째 값은 위도
        };
        callback(req, res, data);  // 콜백 함수를 호출하며 데이터를 전달
      } else {
        showError(req, res, statusCode);  // 에러 발생 시 'showError' 함수 호출
      }
    });
  };

//콜백함수 버전때문에 못써서 프로미스방식으로 변경
//   const getLocationInfo = async (req, res, callback) => {
//     const path = `/api/locations/${req.params.locationid}`;
//     const requestOptions = {
//       url: `${apiOptions.server}${path}`,
//       method: 'GET',
//       json: {}
//     };
  
//     try {
//       const { statusCode, body } = await requestPromise(requestOptions); // Promise 형태로 요청 처리
//       let data = body;
      
//       if (statusCode === 200) {
//         data.coords = {
//           lng: body.coords[0],
//           lat: body.coords[1]
//         };
//         callback(req, res, data); // 정상적으로 가져온 데이터를 콜백으로 전달
//       } else {
//         showError(req, res, statusCode);
//       }
//     } catch (err) {
//       showError(req, res, err.statusCode || 500); // 에러 처리
//     }
//   };
  
  const locationInfo = (req, res) => {
    // 'locationInfo' 함수에서 'getLocationInfo' 호출 후, 응답 데이터를 사용해 페이지 렌더링
    getLocationInfo(req, res, (req, res, responseData) => renderDetailPage(req, res, responseData));
  };
  
  const addReview = (req, res) => {
    // 'addReview' 함수에서 'getLocationInfo' 호출 후, 응답 데이터를 사용해 리뷰 폼 렌더링
    getLocationInfo(req, res, (req, res, responseData) => renderReviewForm(req, res, responseData));
  };



// const doAddReview = (req, res) => {

// };

//14장 32p
const doAddReview = (req, res) => {
    const locationid = req.params.locationid;  // URL에서 'locationid'를 가져옴
    const path = `/api/locations/${locationid}/reviews`;  // API 요청 경로 설정
  
    const postdata = {
      author: req.body.name,  // 폼 데이터에서 'name'을 'author'로 설정
      rating: parseInt(req.body.rating, 10),  // 폼 데이터에서 'rating'을 정수로 변환하여 설정
      reviewText: req.body.review  // 폼 데이터에서 'review'를 'reviewText'로 설정
    };
  
    const requestOptions = {
      url: `${apiOptions.server}${path}`,  // API 서버 주소와 결합한 URL
      method: 'POST',  // HTTP POST 요청
      json: postdata  // JSON 형식의 'postdata' 전송
    };
  
    // 데이터 유효성 검사를 위한 조건문
    if (!postdata.author || !postdata.rating || !postdata.reviewText) {
      // 유효하지 않은 데이터가 있을 경우, 리뷰 작성 폼 페이지로 리디렉션
      res.redirect(`/location/${locationid}/review/new?err=val`);
    } else {
      // 요청 전송
      request(requestOptions, (err, { statusCode, name }) => {
        if (statusCode === 201) {
          // 성공적으로 리뷰가 추가된 경우, 해당 위치 페이지로 리디렉션
          res.redirect(`/location/${locationid}`);
        } else if (statusCode === 400 && name && name  === 'ValidationError') {
          // 유효성 검사 실패 시, 리뷰 작성 폼 페이지로 리디렉션
          res.redirect(`/location/${locationid}/review/new?err=val`);
        } else {
          // 기타 에러 처리
          showError(req, res, statusCode);
        }
      });
    }
  };

//콜백 못써서 변경함 14장
//   const doAddReview = async (req, res) => {
//     const locationid = req.params.locationid;
//     const path = `/api/locations/${locationid}/reviews`;
  
//     const postdata = {
//       author: req.body.name,
//       rating: parseInt(req.body.rating, 10),
//       reviewText: req.body.review
//     };
  
//     const requestOptions = {
//       url: `${apiOptions.server}${path}`,
//       method: 'POST',
//       json: postdata
//     };
  
//     // 데이터 유효성 검사
//     if (!postdata.author || !postdata.rating || !postdata.reviewText) {
//       res.redirect(`/location/${locationid}/review/new?err=val`);
//       return;
//     }
  
//     try {
//       const { statusCode, name } = await requestPromise(requestOptions); // request-promise 사용
  
//       if (statusCode === 201) {
//         res.redirect(`/location/${locationid}`);
//       } else if (statusCode === 400 && name === 'ValidationError') {
//         res.redirect(`/location/${locationid}/review/new?err=val`);
//       } else {
//         showError(req, res, statusCode);
//       }
//     } catch (err) {
//       showError(req, res, err.statusCode || 500);
//     }
//   };


//14장 10p
// const renderReviewForm = (req, res) => {  // 'renderReviewForm'이라는 함수를 정의하고, 요청(req)과 응답(res)을 매개변수로 받습니다.
//     res.render('location-review-form', {  // 'location-review-form'이라는 뷰(템플릿)를 렌더링합니다.
//       title: 'Review Starcups on Loc8r',  // 템플릿에 전달할 데이터로 'title' 속성에 'Review Starcups on Loc8r'를 설정합니다.
//       pageHeader: { title: 'Review Starcups' }  // 'pageHeader'라는 객체를 템플릿에 전달하며, 그 안의 'title' 속성으로 'Review Starcups'를 설정합니다.
//     });
//   };

// 14장 28p
  const renderReviewForm = function (req, res, {name}) {
    res.render('location-review-form', {  // 'location-review-form'이라는 템플릿을 렌더링함
      title: `Review ${name} on Loc8r`,  // 페이지 제목으로 'Review {name} on Loc8r'를 설정
      pageHeader: { title: `Review ${name}` },  // 페이지 헤더에 제목으로 'Review {name}'를 설정
      error: req.query.err  // 요청 쿼리에서 'err'를 가져와 에러 메시지로 전달
    });
  };

// 모듈 익스포트는 항상 마지막에 있어야 컨트롤러가 실행됨

  module.exports = {
    homelist,
    locationInfo,
    addReview,
    showError,
    renderDetailPage,
    renderHomepage,
    formatDistance,
    doAddReview,
    renderReviewForm,
    getLocationInfo
};
