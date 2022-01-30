// actions
const INITIAL = "INITIAL";

// action creators
export const fetchInitial = (data) => ({
  type: INITIAL,
  data,
});

export const initialReducer = (state, action) => {
  switch (action.type) {
    case INITIAL:
      return [...action.data];
    default:
      return state;
  }
};
