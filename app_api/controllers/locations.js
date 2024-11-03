// 9장 32p

// const locationsReadOne = (req, res) => {
//     res
//         .status(200)
//         .json({ "status": "success 2024810100_맹균오" });
// };

//10장 8p


const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

//로케이션 리드원 완성본


// const mongoose = require('mongoose');
// const Loc = mongoose.model('Location');

// const locationsReadOne = (req, res) => {
//   Loc.findById(req.params.locationid)
//     .exec((err, location) => {
//       if (!location) {
//         return res
//           .status(404)
//           .json({ message: "location not found" });
//       } else if (err) {
//         return res
//           .status(404)  // 서버 에러가 아닌 데이터 조회 실패로 처리
//           .json(err);
//       }
//       res
//         .status(200)
//         .json(location);
//     });
// };



// const locationsListByDistance = (req, res) => {};

//10장 22p 31p에서 바꿈

// const locationsListByDistance = async (req, res) => {
//     const lng = parseFloat(req.query.lng);
//     const lat = parseFloat(req.query.lat);
//     const near = {
//       type: "Point",
//       coordinates: [lng, lat]
//     };
  
//     const geoOptions = {
//       distanceField: "distance.calculated",
//       spherical: true,
//       maxDistance: 20000
//     };
  
//     try {
//       const results = await Loc.aggregate([
//         {
//           $geoNear: {
//             near,
//             ...geoOptions  // Spread operator를 사용하여 geoOptions 객체의 속성을 추가
//           }
//         }
//       ]);
//       res.status(200).json(results);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ error: 'An error occurred while fetching locations by distance' });
//     }
//   };

//10장 31p 로케이션 리스트 바이 디스턴스 완성본
  const locationsListByDistance = async (req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const near = {
      type: "Point",
      coordinates: [lng, lat]
    };
  
    const geoOptions = {
      distanceField: "distance.calculated",
      key: 'coords', // 검색할 좌표 필드
      spherical: true,
      maxDistance: 20000 // 최대 거리 (단위: 미터)
    };
  
    // 경도와 위도가 제공되지 않은 경우 처리
    if (!lng || !lat) {
      return res
        .status(404)
        .json({ message: "lng and lat query parameters are required" });
    }
  
    try {
      const results = await Loc.aggregate([
        {
          $geoNear: {
            near,
            ...geoOptions
          }
        }
      ]);
  
      const locations = results.map(result => {
        return {
          _id: result._id,
          name: result.name,
          address: result.address,
          rating: result.rating,
          facilities: result.facilities,
          distance: `${result.distance.calculated.toFixed()}` // 거리를 미터 단위로 고정
        };
      });
  
      res
        .status(200)
        .json(locations);
    } catch (err) {
      res
        .status(404)
        .json(err);
    }
  };



// const locationsCreate = (req, res) => {};

//11장 6p
const locationsCreate = (req, res) => {
  Loc.create({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(","),  // 문자열을 배열로 변환
    coords: {
      type: "Point",
      coordinates: [
        parseFloat(req.body.lng),  // 경도
        parseFloat(req.body.lat)   // 위도
      ]
    },
    openingTimes: [
      {
        days: req.body.days1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1
      },
      {
        days: req.body.days2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2
      },
      {
        days: req.body.days3,
        opening: req.body.opening3,
        closing: req.body.closing3,
        closed: req.body.closed3
      }
    ]
  }, (err, location) => {
    if (err) {
      res.status(400).json(err);  // 에러 발생 시 400 상태 반환
    } else {
      res.status(201).json(location);  // 성공 시 201 상태 코드와 생성된 데이터 반환
    }
  });
};




const locationsReadOne = async (req, res) => {
  try {
    const location = await Loc.findById(req.params.locationid).exec();
    res.status(200).json(location);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred.' });
  }
};

const locationsUpdateOne = (req, res) => {};

const locationsDeleteOne = (req, res) => {};

module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
};

