// 공통 접근 보호 로직 파일

/**
 * 유저 접근 보호: userId가 없으면 로그인 페이지로 리다이렉트.
 */
function requireUser() {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('권한이 없습니다. 로그인 페이지로 이동합니다.');
    window.location.href = '/public/login.html';
  }
}

/**
 * 사장님 접근 보호: partnerId가 없으면 로그인 페이지로 리다이렉트.
 */
function requirePartner() {
  const partnerId = localStorage.getItem('partnerId');
  console.log('partnerId:', localStorage.getItem('partnerId'));
  if (!partnerId) {
    alert('권한이 없습니다. 로그인 페이지로 이동합니다.');
    window.location.href = '/public/login.html';
  }
}

/**
 * 유저와 사장님 중 하나라도 로그인된 상태인지 확인.
 * 로그인되지 않은 경우 로그인 페이지로 리다이렉트.
 */
function requireAuth() {
  const userId = localStorage.getItem('userId');
  const partnerId = localStorage.getItem('partnerId');
  if (!userId && !partnerId) {
    alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
    window.location.href = '/public/login.html';
  }
}

// 모듈 내보내기
export { requireUser, requirePartner, requireAuth };
