import officeReducer from '../../../../reducers/offices.reducers';
import actions from '../../../../constants/actionTypes';

describe('office reducers', () => {
  it('should return the initial state', () => {
    expect(officeReducer(undefined, {})).toEqual({
      loading: false,
      officeList: [],
    });
  });

  it('should handle BEGIN_LOADING', () => {
    expect(
      officeReducer([], {
        type: actions.BEGIN_LOADING,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('should handle FETCH_OFFICE_SUCCESS', () => {
    expect(
      officeReducer([], {
        type: actions.FETCH_OFFICES_SUCCESS,
        offices: [{ office: 'APC' }],
      })
    ).toEqual({
      loading: false,
      officeList: [{ office: 'APC' }],
    });
  });

  it('should handle FETCH_OFFICES_FAILURE', () => {
    expect(
      officeReducer([], {
        type: actions.FETCH_OFFICES_FAILURE,
      })
    ).toEqual({
      loading: false,
    });
  });
});
