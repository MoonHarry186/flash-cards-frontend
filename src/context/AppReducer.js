// reducer
export default (state, action) => {
  switch(action.type) {
    case 'LOGIN': {
      return {...state, isLogin: true};
    }
    default: {
      return state;
    }
  }
}