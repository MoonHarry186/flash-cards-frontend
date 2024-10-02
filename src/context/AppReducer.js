// reducer
export default (state, action) => {
  switch(action.type) {
    case 'LOGIN': {
      return true;
    }
    default: {
      return state;
    }
  }
}