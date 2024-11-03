// 7장 37페이지 콘스트 몽구스 리콰이어 몽구스 이건 전체코드에 없어서 한줄 따로 추가

// const mongoose = require('mongoose')

// 7장 45p 전체 코드

var mongoose = require('mongoose');

// var reviewSchema = new mongoose.Schema({
//     author: String,
//     rating: {type: Number, required: true, min: 0, max: 5},
//     reviewText: String,
//     createdOn: {type: Date, default: Date.now}
// });

//14장 22p
// 리뷰 스키마 정의
const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true // 작성자는 필수 항목
  },
  rating: {
    type: Number,
    required: true, // 평점은 필수 항목
    min: 0, // 최소값 0
    max: 5 // 최대값 5
  },
  reviewText: {
    type: String,
    required: true // 리뷰 내용은 필수 항목
  },
  createdOn: {
    type: Date,
    default: Date.now // 생성 시간 기본값으로 현재 시간 설정
  }
});

var openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
});

// var locationSchema = new mongoose.Schema({
//     name: {type: String, required: true},
//     address: String,
//     rating: {type: Number, "default": 0, min: 0, max: 5},
//     facilities: [String],
//     coords: {type: [Number], index: '2dsphere'},
//     openingTimes: [openingTimeSchema],
//     reviews: [reviewSchema]
// });

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },  // 필수 속성으로 설정
    address: String,
    rating: { type: Number, 'default': 0, min: 0, max: 5 },
    facilities: [String],
    coords: {
      type: { type: String },
      coordinates: [Number]
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
  });

// 2줄 추가로 작성해야하는것
locationSchema.index({coords:'2dsphere'});
mongoose.model('Location',locationSchema);

//14장
module.exports = mongoose.model('Review', reviewSchema);