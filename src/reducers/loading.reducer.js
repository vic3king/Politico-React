const initialState = {
  loader: false,
};

const isLoadingReducer = (state = initialState, action) => {
  const { type } = action;
  const matches = /(.*)_(LOADING|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    loader: requestState === 'LOADING',
    [requestName]: requestState,
  };
};

export default isLoadingReducer;
