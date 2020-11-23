export const initialState = {
  user: null,
  loading: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER' :
      return {
        ...state,
        user: action.user,
        loading: false
      }
    default :
      return state;
  }
};

export default reducer;