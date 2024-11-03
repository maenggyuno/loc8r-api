// main.js 컨트롤러를 만듬 4장 14페이지* 이걸 5장 12페이지에서 others.js 로 이름을 바꿔서 사용
// const index = (req, res) => {
//     res.render('index', {title: 'Express' })
//   };
  
//   module.exports = {
//     index
//   };

// 5장 13페이지 others.js 컨트롤러로 이름 바꾼 후에 몇가지 수정해서 사용

// const about = (req, res) => {
//     res.render('index', {title: 'About' })
//   };
  
//   module.exports = {
//     about
//   };

// 5장 55페이지
 
  // const about = (req, res) => {
  //   res.render('generic-text', {title: 'About' })
  // };
  
  // module.exports = {
  //   about
  // };

  // 6장 43페이지에서 어바웃 컨트롤러 변경

  const about = function(req, res) {
    res.render('generic-text', {
      title: 'About Loc8r',
      content: `Loc8r was created to help people find places to sit down and get a bit of work done.<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. Nullam sit amet interdum magna. Morbi quis f aucibus nisi. Vestibulum mollis purus quis eros adipiscing tristique. Proin posuere semper tellus, id placerat augue dapibus ornare. Aenean leo metus, tempus in nisl eget, accumsan interdum dui. Pellentesque sollicitudin volutpat ullamcorper.`
    });
  };
  
  module.exports = {
    about
  };

