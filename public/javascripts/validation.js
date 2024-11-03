
$('#addReview').submit(function (e) {
    e.preventDefault(); // 폼의 기본 제출 동작을 방지
    $('.alert.alert-danger').hide(); // 기존 경고 메시지가 있을 경우 숨김
  
    // 이름, 평점, 리뷰 텍스트 필드의 값을 검사
    if (!$('#input#name').val() || !$('#select#rating').val() || !$('#textarea#review').val()) {
      // 경고 메시지가 이미 존재하는지 확인
      if ($('.alert.alert-danger').length) {
        $('.alert.alert-danger').show(); // 경고 메시지가 이미 있으면 표시
      } else {
        // 경고 메시지가 없으면 새로 추가
        $(this).prepend('<div role="alert" class="alert alert-danger">All fields required, please try again</div>');
      }
    } else {
      // 모든 필드가 입력되었을 경우 폼 제출
      this.submit();
    }
  
    return false; // 폼 제출을 막음 (유효성 검사가 실패했을 경우)
  });