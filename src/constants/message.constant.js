import { MIN_PASSWORD_LENGTH } from './auth.constant.js';

export const MESSAGES = {
  AUTH: {
    COMMON: {
      EMAIL: {
        REQUIRED: '이메일을 입력해 주세요.',
        INVALID_FORMAT: '이메일 형식이 올바르지 않습니다.',
        DUPLICATED: '이미 가입 된 사용자입니다.',
      },
      PASSWORD: {
        REQURIED: '비밀번호를 입력해 주세요.',
        MIN_LENGTH: `비밀번호는 ${MIN_PASSWORD_LENGTH}자리 이상이어야 합니다.`,
        PATTERN: '비밀번호는 영문자와 숫자를 모두 포함해야 합니다.',
      },
      PASSWORD_CONFIRM: {
        REQURIED: '비밀번호 확인을 입력해 주세요.',
        NOT_MACHTED_WITH_PASSWORD: '입력 한 두 비밀번호가 일치하지 않습니다.',
      },
      NAME: {
        REQURIED: '이름을 입력해 주세요.',
      },
      INTEREST: {
        INVALID_FORMAT: '관심사는 문자열로 입력해 주세요.',
      },
      UNAUTHORIZED: '인증 정보가 유효하지 않습니다.',
      JWT: {
        NO_TOKEN: '인증 정보가 없습니다.',
        NOT_SUPPORTED_TYPE: '지원하지 않는 인증 방식입니다.',
        EXPIRED: '인증 정보가 만료되었습니다.',
        NO_USER: '인증 정보와 일치하는 사용자가 없습니다.',
        INVALID: '인증 정보가 유효하지 않습니다.',
      },
    },
    SIGN_UP: {
      SUCCEED: '회원가입에 성공했습니다.',
    },
    SIGN_IN: {
      SUCCEED: '로그인에 성공했습니다.',
      FAILED: '로그인에 실패했습니다.',
    },
  },
  USERS: {
    READ_ME: {
      SUCCEED: '내 정보 조회에 성공했습니다.',
    },
  },
  REVIEWS: {
    COMMON: {
      NOT_FOUND: '리뷰를 찾을 수 없습니다.',
      ALREADY_EXISTS: '이미 리뷰가 작성되었습니다.',
      NOT_AUTHORIZED: '자신이 작성한 리뷰만 수정/삭제할 수 있습니다.',
    },
    CREATE: {
      SUCCEED: '리뷰 작성에 성공했습니다.',
      FAILED: '리뷰 작성에 실패했습니다.',
    },
    READ_LIST: {
      SUCCEED: '리뷰 목록 조회에 성공했습니다.',
      FAILED: '리뷰 목록 조회에 실패했습니다.',
    },
    UPDATE: {
      SUCCEED: '리뷰 수정에 성공했습니다.',
      FAILED: '리뷰 수정에 실패했습니다.',
    },
    DELETE: {
      SUCCEED: '리뷰 삭제에 성공했습니다.',
      FAILED: '리뷰 삭제에 실패했습니다.',
    },
  },
  COMMENTS: {
    COMMON: {
      NOT_FOUND: '댓글을 찾을 수 없습니다.',
      NOT_AUTHORIZED: '자신의 레스토랑 리뷰에만 댓글을 작성할 수 있습니다.',
    },
    CREATE: {
      SUCCEED: '댓글 작성에 성공했습니다.',
      FAILED: '댓글 작성에 실패했습니다.',
    },
    UPDATE: {
      SUCCEED: '댓글 수정에 성공했습니다.',
      FAILED: '댓글 수정에 실패했습니다.',
    },
    DELETE: {
      SUCCEED: '댓글 삭제에 성공했습니다.',
      FAILED: '댓글 삭제에 실패했습니다.',
    },
  },
  RESTAURANTS: {
    NOT_FOUND: '업장이 존재하지 않습니다.',
    NO_PERMISSION: '해당 업장에 대한 권한이 없습니다.',
    CREATE_SUCCESS: '업장 등록에 성공했습니다.',
    UPDATE_SUCCESS: '업장 정보가 수정되었습니다.',
    DELETE_SUCCESS: '업장이 삭제되었습니다.',
    REQUIRED_FIELDS: '필수 정보가 누락되었습니다.',
  },
};
