// 9장 32p

// const mongoose = require('mongoose');
// const Loc = mongoose.model('Location');

// //리뷰 크리에이트는 10장 전에 한거 같은데 못찾음 해야할 것같음
// // const reviewsCreate = (req, res) => {};

// //11장 12p


// const reviewsCreate = (req, res) => {
//   const locationId = req.params.locationid;
  
//   if (locationId) {
//     Loc
//       .findById(locationId)
//       .select('reviews')  // 'reviews' 필드만 선택
//       .exec((err, location) => {
//         if (err) {
//           res
//             .status(400)
//             .json(err);  // 에러 발생 시 400 상태 코드 반환
//         } else {
//           doAddReview(req, res, location);  // 리뷰 추가 함수 호출
//         }
//       });
//   } else {
//     res
//       .status(404)
//       .json({ "message": "Location not found" });  // locationId가 없는 경우 404 반환
//   }
// };



// const reviewsReadOne = (req, res) => {
//   Loc.findById(req.params.locationid)
//     .select('name reviews')  // 'name'과 'reviews' 필드만 선택적으로 조회
//     .exec((err, location) => {
//       if (!location) {
//         return res
//           .status(404)
//           .json({ message: "location not found" });
//       } else if (err) {
//         return res
//           .status(400)
//           .json(err);
//       }

//       if (location.reviews && location.reviews.length > 0) {
//         const review = location.reviews.id(req.params.reviewid);
//         if (!review) {
//           return res
//             .status(404)
//             .json({ message: "review not found" });
//         } else {
//           const response = {
//             location: {
//               name: location.name,
//               id: req.params.locationid
//             },
//             review
//           };
//           return res
//             .status(200)
//             .json(response);
//         }
//       } else {
//         return res
//           .status(404)
//           .json({ message: "No reviews found" });
//       }
//     });
// };

// const doAddReview = (req, res, location) => {
//   if (!location) {
//     res
//       .status(404)
//       .json({ "message": "Location not found" });
//   } else {
//     const { author, rating, reviewText } = req.body;  // 클라이언트로부터 받은 데이터
//     location.reviews.push({  // 새 리뷰 데이터를 장소의 reviews 배열에 추가
//       author,
//       rating,
//       reviewText
//     });
    
//     location.save((err, location) => {  // MongoDB에 저장
//       if (err) {
//         res
//           .status(400)
//           .json(err);  // 에러 발생 시 400 상태 코드 반환
//       } else {
//         updateAverageRating(location._id);  // 장소의 평균 평점을 업데이트
//         const thisReview = location.reviews.slice(-1).pop();  // 추가된 최신 리뷰 반환
//         res
//           .status(201)
//           .json(thisReview);  // 201 상태 코드와 함께 생성된 리뷰를 클라이언트에 반환
//       }
//     });
//   }
// };



// // const doAddReview = (req, res, location) => {
// //   if (!location) {
// //     res
// //       .status(404)
// //       .json({ "message": "Location not found" });
// //   } else {
// //     const { author, rating, reviewText } = req.body;  // 클라이언트로부터 받은 데이터
// //     location.reviews.push({  // 새 리뷰 데이터를 장소의 reviews 배열에 추가
// //       author,
// //       rating,
// //       reviewText
// //     });
    
// //     location.save((err, location) => {  // MongoDB에 저장
// //       if (err) {
// //         res
// //           .status(400)
// //           .json(err);  // 에러 발생 시 400 상태 코드 반환
// //       } else {
// //         updateAverageRating(location._id);  // 장소의 평균 평점을 업데이트
// //         let thisReview = location.reviews[location.reviews.length - 1];  // 추가된 최신 리뷰 반환
// //         res
// //           .status(201)
// //           .json(thisReview);  // 201 상태 코드와 함께 생성된 리뷰를 클라이언트에 반환
// //       }
// //     });
// //   }
// // };


// const doSetAverageRating = (location) => {
//   if (location.reviews && location.reviews.length > 0) {
//     const count = location.reviews.length;
//     const total = location.reviews.reduce((acc, { rating }) => {
//       return acc + rating;
//     }, 0);

//     location.rating = parseInt(total / count, 10);  // 평균 평점을 계산
//     location.save((err) => {
//       if (err) {
//         console.log(err);  // 에러 로그 출력
//       } else {
//         console.log(`Average rating updated to ${location.rating}`);  // 성공 시 로그 출력
//       }
//     });
//   }
// };

// const updateAverageRating = (locationId) => {
//   Loc.findById(locationId)
//     .select('rating reviews')  // 'rating'과 'reviews' 필드만 선택
//     .exec((err, location) => {
//       if (!err) {
//         doSetAverageRating(location);  // 평균 평점 계산 함수 호출
//       }
//     });
// };


// // const reviewsUpdateOne = (req, res) => {};

// //11장 26p
// const reviewsUpdateOne = (req, res) => {
//   if (!req.params.locationid || !req.params.reviewid) {
//     return res
//       .status(404)
//       .json({
//         "message": "Not found, locationid and reviewid are both required"
//       });
//   }

//   Loc
//     .findById(req.params.locationid)
//     .select('reviews')  // 'reviews' 필드를 선택
//     .exec((err, location) => {
//       if (!location) {
//         return res
//           .status(404)
//           .json({
//             "message": "Location not found"
//           });
//       } else if (err) {
//         return res
//           .status(400)
//           .json(err);
//       }

//       if (location.reviews && location.reviews.length > 0) {
//         const thisReview = location.reviews.id(req.params.reviewid);

//         if (!thisReview) {
//           res
//             .status(404)
//             .json({
//               "message": "Review not found"
//             });
//         } else {
//           thisReview.author = req.body.author;
//           thisReview.rating = req.body.rating;
//           thisReview.reviewText = req.body.reviewText;

//           location.save((err, location) => {  // 부모 다큐먼트 저장
//             if (err) {
//               res
//                 .status(404)
//                 .json(err);
//             } else {
//               updateAverageRating(location._id);  // 평균 평점 업데이트
//               res
//                 .status(200)
//                 .json(thisReview);  // 저장된 리뷰를 반환
//             }
//           });
//         }
//       } else {
//         res
//           .status(404)
//           .json({
//             "message": "No review to update"
//           });
//       }
//     });
// };


// // const reviewsDeleteOne = (req, res) => {};

// //11장 30p
// const reviewsDeleteOne = (req, res) => {
//   const { locationid, reviewid } = req.params;

//   if (!locationid || !reviewid) {
//     return res
//       .status(404)
//       .json({
//         "message": "Not found, locationid and reviewid are both required"
//       });
//   }

//   Loc
//     .findById(locationid)
//     .select('reviews')  // 'reviews' 필드만 선택
//     .exec((err, location) => {
//       if (!location) {
//         return res
//           .status(404)
//           .json({ "message": "Location not found" });
//       } else if (err) {
//         return res
//           .status(400)
//           .json(err);
//       }

//       if (location.reviews && location.reviews.length > 0) {
//         if (!location.reviews.id(reviewid)) {
//           return res
//             .status(404)
//             .json({ "message": "Review not found" });
//         } else {
//           location.reviews.id(reviewid).remove();  // 해당 리뷰 삭제
//           location.save((err) => {
//             if (err) {
//               return res
//                 .status(404)
//                 .json(err);
//             } else {
//               updateAverageRating(location._id);  // 평균 평점 업데이트
//               res
//                 .status(204)  // 성공적으로 삭제 후 204 상태 반환
//                 .json(null);
//             }
//           });
//         }
//       } else {
//         res
//           .status(404)
//           .json({ "message": "No review to delete" });
//       }
//     });
// };

// module.exports = {
//     reviewsCreate,
//     reviewsReadOne,
//     doAddReview,
//     doSetAverageRating,
//     updateAverageRating,
//     reviewsUpdateOne,
//     reviewsDeleteOne
// };



// 9장 32p

const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

//리뷰 크리에이트는 10장 전에 한거 같은데 못찾음 해야할 것같음
// const reviewsCreate = (req, res) => {};

//11장 12p

/*
const reviewsCreate = (req, res) => {
  const locationId = req.params.locationid;
  
  if (locationId) {
    Loc
      .findById(locationId)
      .select('reviews')  // 'reviews' 필드만 선택
      .exec((err, location) => {
        if (err) {
          res
            .status(400)
            .json(err);  // 에러 발생 시 400 상태 코드 반환
        } else {
          doAddReview(req, res, location);  // 리뷰 추가 함수 호출
        }
      });
  } else {
    res
      .status(404)
      .json({ "message": "Location not found" });  // locationId가 없는 경우 404 반환
  }
};
*/
const reviewsCreate = async (req, res) => {
  const locationId = req.params.locationid;
      if (!locationId) {
      return res.status(404).json({ "message": "Location not found" });
      } try {
          const location = await Loc.findById(locationId).select('reviews').exec();
          if (location) {
              await doAddReview(req, res, location);
          } else {
              return res.status(404).json({ "message": "Location not found" });
          }
      } catch (err) {
          return res.status(400).json(err);
      }
};
/*
const reviewsReadOne = (req, res) => {
  Loc.findById(req.params.locationid)
    .select('name reviews')  // 'name'과 'reviews' 필드만 선택적으로 조회
    .exec((err, location) => {
      if (!location) {
        return res
          .status(404)
          .json({ message: "location not found" });
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }

      if (location.reviews && location.reviews.length > 0) {
        const review = location.reviews.id(req.params.reviewid);
        if (!review) {
          return res
            .status(404)
            .json({ message: "review not found" });
        } else {
          const response = {
            location: {
              name: location.name,
              id: req.params.locationid
            },
            review
          };
          return res
            .status(200)
            .json(response);
        }
      } else {
        return res
          .status(404)
          .json({ message: "No reviews found" });
      }
    });
};
*/
const reviewsReadOne = async (req, res) => {
  try {
      const location = await Loc.findById(req.params.locationid).select('name reviews').exec();
      if (!location) {
          return res
              .status(404)
              .json({ "message": "location not found" });
      }
      if (location.reviews && location.reviews.length > 0) {
          const review = location.reviews.id(req.params.reviewid);
          if (!review) {
              return res
              .status(404)
              .json({ "message": "review not found" });
          }
          const response = {
              location: {
                  name: location.name,
                  id: req.params.locationid
          },
              review
          };
          return res
              .status(200)
              .json(response);
      } else {
          return res
              .status(404)
              .json({ "message": "No reviews found" });
      }
      } catch (err) {
          return res
              .status(400)
              .json(err);
      }
};
/*
const doAddReview = (req, res, location) => {
  if (!location) {
    res
      .status(404)
      .json({ "message": "Location not found" });
  } else {
    const { author, rating, reviewText } = req.body;  // 클라이언트로부터 받은 데이터
    location.reviews.push({  // 새 리뷰 데이터를 장소의 reviews 배열에 추가
      author,
      rating,
      reviewText
    });
    
    location.save((err, location) => {  // MongoDB에 저장
      if (err) {
        res
          .status(400)
          .json(err);  // 에러 발생 시 400 상태 코드 반환
      } else {
        updateAverageRating(location._id);  // 장소의 평균 평점을 업데이트
        const thisReview = location.reviews.slice(-1).pop();  // 추가된 최신 리뷰 반환
        res
          .status(201)
          .json(thisReview);  // 201 상태 코드와 함께 생성된 리뷰를 클라이언트에 반환
      }
    });
  }
};
*/
/*
const doAddReview = async (req, res, location) => {
  if (!location) {
      return res.status(404).json({ "message": "Location not found" });
  }
  const { author, rating, reviewText } = req.body;
  location.reviews.push({ author, rating, reviewText });
  try {
      const updatedLocation = await location.save();
      await updateAverageRating(updatedLocation._id);
      const thisReview = updatedLocation.reviews.slice(-1).pop();
      return res.status(201).json(thisReview);
  } catch (err) {
      return res.status(400).json(err);
  }
};
*/
const doAddReview = async (req, res, location) => {
  if (!location) {
      return res.status(404).json({ "message": "Location not found" });
  }
  const { author, rating, reviewText } = req.body;
  location.reviews.push({ author, rating, reviewText });
  try {
      const updatedLocation = await location.save();
      await updateAverageRating(updatedLocation._id);
      const thisReview = updatedLocation.reviews.slice(-1).pop();
      return res.status(201).json(thisReview);
  } catch (err) {
      return res.status(400).json(err);
  }
};
/*
const doSetAverageRating = (location) => {
  if (location.reviews && location.reviews.length > 0) {
    const count = location.reviews.length;
    const total = location.reviews.reduce((acc, { rating }) => {
      return acc + rating;
    }, 0);

    location.rating = parseInt(total / count, 10);  // 평균 평점을 계산
    location.save((err) => {
      if (err) {
        console.log(err);  // 에러 로그 출력
      } else {
        console.log(`Average rating updated to ${location.rating}`);  // 성공 시 로그 출력
      }
    });
  }
};
*/
const doSetAverageRating = async (location) => {
  if (location.reviews && location.reviews.length > 0) {
      const count = location.reviews.length;
      const total = location.reviews.reduce((acc, {rating}) => {
          return acc + rating;
      }, 0);
      location.rating = parseInt(total / count, 10);
      try {
          await location.save();
          console.log(`Average rating updated to ${location.rating}`);
      } catch (err) {
          console.log(err);
      }
  }
};
/*
const updateAverageRating = (locationId) => {
  Loc.findById(locationId)
    .select('rating reviews')  // 'rating'과 'reviews' 필드만 선택
    .exec((err, location) => {
      if (!err) {
        doSetAverageRating(location);  // 평균 평점 계산 함수 호출
      }
    });
};
*/
const updateAverageRating = async (locationId) => {
  try {
      const location = await Loc.findById(locationId).select('rating reviews').exec();
      if (location) {
          await doSetAverageRating(location);
      }
  } catch (err) {
      console.log(err);
  }
};


/*
const reviewsUpdateOne = (req, res) => {
  if (!req.params.locationid || !req.params.reviewid) {
    return res
      .status(404)
      .json({
        "message": "Not found, locationid and reviewid are both required"
      });
  }

  Loc
    .findById(req.params.locationid)
    .select('reviews')  // 'reviews' 필드를 선택
    .exec((err, location) => {
      if (!location) {
        return res
          .status(404)
          .json({
            "message": "Location not found"
          });
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }

      if (location.reviews && location.reviews.length > 0) {
        const thisReview = location.reviews.id(req.params.reviewid);

        if (!thisReview) {
          res
            .status(404)
            .json({
              "message": "Review not found"
            });
        } else {
          thisReview.author = req.body.author;
          thisReview.rating = req.body.rating;
          thisReview.reviewText = req.body.reviewText;

          location.save((err, location) => {  // 부모 다큐먼트 저장
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              updateAverageRating(location._id);  // 평균 평점 업데이트
              res
                .status(200)
                .json(thisReview);  // 저장된 리뷰를 반환
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No review to update"
          });
      }
    });
};
*/
const reviewsUpdateOne = async (req, res) => {
  if (!req.params.locationid || !req.params.reviewid) {
      return res.status(404).json({ "message": "Not found, locationid and reviewid are both required" });
  }

  try {
      const location = await Loc.findById(req.params.locationid).select('reviews').exec();
      if (!location) {
          return res.status(404).json({ "message": "Location not found" });
      }
      
      if (location.reviews && location.reviews.length > 0) {
          const thisReview = location.reviews.id(req.params.reviewid);
      if (!thisReview) {
          return res.status(404).json({ "message": "Review not found" });
      }

      thisReview.author = req.body.author;
      thisReview.rating = req.body.rating;
      thisReview.reviewText = req.body.reviewText;

      const updatedLocation = await location.save();
      await updateAverageRating(updatedLocation._id);
      return res.status(200).json(thisReview);
    } else {
      return res.status(404).json({ "message": "No review to update" });
      }
  } catch (err) {
      return res.status(400).json(err);
  }
};

/*
//11장 30p
const reviewsDeleteOne = (req, res) => {
  const { locationid, reviewid } = req.params;

  if (!locationid || !reviewid) {
    return res
      .status(404)
      .json({
        "message": "Not found, locationid and reviewid are both required"
      });
  }

  Loc
    .findById(locationid)
    .select('reviews')  // 'reviews' 필드만 선택
    .exec((err, location) => {
      if (!location) {
        return res
          .status(404)
          .json({ "message": "Location not found" });
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }

      if (location.reviews && location.reviews.length > 0) {
        if (!location.reviews.id(reviewid)) {
          return res
            .status(404)
            .json({ "message": "Review not found" });
        } else {
          location.reviews.id(reviewid).remove();  // 해당 리뷰 삭제
          location.save((err) => {
            if (err) {
              return res
                .status(404)
                .json(err);
            } else {
              updateAverageRating(location._id);  // 평균 평점 업데이트
              res
                .status(204)  // 성공적으로 삭제 후 204 상태 반환
                .json(null);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({ "message": "No review to delete" });
      }
    });
};
*/
const reviewsDeleteOne = async (req, res) => {
  const { locationid, reviewid } = req.params;
  if (!locationid || !reviewid) {
      return res.status(404).json({ 'message': 'Not found, locationid and reviewid are both required' });
  }

  try {
      const location = await Loc.findById(locationid).select('reviews').exec();
      if (!location) {
          return res.status(404).json({ 'message': 'Location not found' });
      }

      if (location.reviews && location.reviews.length > 0) {
          const review = location.reviews.id(reviewid);
          if (!review) {
              return res.status(404).json({ 'message': 'Review not found' });
          }
          
          review.deleteOne();
          await location.save();
          await updateAverageRating(location._id);
          return res.status(204).json(null);
      } else {
      return res.status(404).json({ 'message': 'No Review to delete' });
      }
  } catch (err) {
      return res.status(400).json(err);
  }
};
module.exports = {
    reviewsCreate,
    reviewsReadOne,
    doAddReview,
    doSetAverageRating,
    updateAverageRating,
    reviewsUpdateOne,
    reviewsDeleteOne
};