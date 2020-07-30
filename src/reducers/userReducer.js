import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOADING,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  UPDATE_LOADING,
  CHANGE_PASS_SUCCESS,
  CHANGE_PASS_FAIL,
  CHANGE_PASS_LOADING,
  UPLOAD_LOADING,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
} from '../actions/types';

const initialState = {
  info: {},
  loading: {
    login: false,
    register: false,
    update: false,
    changePassword: false,
    uploadFile: false,
  },
  error: {
    login: '',
    register: '',
    update: '',
    changePassword: '',
    uploadFile: '',
  },
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  //   console.log('USER REDUCER');
  const { loading: loadingValue } = state;
  const { error: errorValue } = state;

  switch (type) {
    case LOGIN_LOADING: {
      console.log('LOGIN LOADING');
      return {
        ...state,
        loading: {
          ...loadingValue,
          login: true,
        },
        error: {
          ...errorValue,
          login: '',
        },
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        info: payload,
        loading: {
          ...loadingValue,
          login: false,
        },
        error: {
          ...errorValue,
          login: '',
        },
      };
    }

    case LOGIN_FAIL: {
      return {
        ...state,
        loading: {
          ...loadingValue,
          login: false,
        },
        error: {
          ...errorValue,
          login: payload,
        },
      };
    }

    case REGISTER_LOADING: {
      return {
        ...state,
        loading: {
          ...loadingValue,
          register: true,
        },
        error: {
          ...errorValue,
          register: '',
        },
      };
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        loading: {
          ...loadingValue,
          register: false,
        },
        error: {
          ...errorValue,
          register: '',
        },
      };
    }

    case REGISTER_FAIL: {
      return {
        ...state,
        loading: {
          ...loadingValue,
          register: false,
        },
        error: {
          ...errorValue,
          register: payload,
        },
      };
    }

    case UPDATE_LOADING: {
      return {
        ...state,
        loading: {
          ...loadingValue,
          update: true,
        },
        error: {
          ...errorValue,
          update: '',
        },
      };
    }

    case UPDATE_SUCCESS: {
      return {
        ...state,
        info: payload,
        loading: {
          ...loadingValue,
          update: false,
        },
        error: {
          ...errorValue,
          update: '',
        },
      };
    }

    case UPDATE_FAIL: {
      return {
        ...state,
        loading: {
          ...loadingValue,
          update: false,
        },
        error: {
          ...errorValue,
          update: payload,
        },
      };
    }

    case CHANGE_PASS_LOADING: {
      return {
        ...state,
        loading: {
          ...loadingValue,
          changePassword: true,
        },
        error: {
          ...errorValue,
          changePassword: '',
        },
      };
    }

    case CHANGE_PASS_SUCCESS: {
      return {
        ...state,
        loading: {
          ...loadingValue,
          changePassword: false,
        },
        error: {
          ...errorValue,
          changePassword: '',
        },
      };
    }

    case CHANGE_PASS_FAIL: {
      return {
        ...state,
        loading: {
          ...loadingValue,
          changePassword: false,
        },
        error: {
          ...errorValue,
          changePassword: payload,
        },
      };
    }

    case UPLOAD_LOADING: {
      return {
        ...state,
        loading: {
          ...loadingValue,
          uploadFile: true,
        },
        error: {
          ...errorValue,
          uploadFile: '',
        },
      };
    }

    case UPLOAD_SUCCESS: {
      return {
        ...state,
        // info: payload,
        loading: {
          ...loadingValue,
          uploadFile: false,
        },
        error: {
          ...errorValue,
          uploadFile: '',
        },
      };
    }

    case UPLOAD_FAIL: {
      return {
        ...state,
        loading: {
          ...loadingValue,
          uploadFile: false,
        },
        error: {
          ...errorValue,
          uploadFile: payload,
        },
      };
    }

    default:
      return state;
  }
};

export default userReducer;
