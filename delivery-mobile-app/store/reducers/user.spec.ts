import reducer from "./user";
import * as userActions from "@/store/actions/user";
import { defaultUser } from "@/__test/data/user";
import RequestStatus from "@/constants/RequestStatus";
describe("User reducer", () => {
  describe(`handle ${userActions.loginUserAsync.success}`, () => {
    it("should add the product to the state if the product is not in the state", () => {
      const action = userActions.loginUserAsync.success(defaultUser);

      const initialState = {
        data: {},
        error: {},
        loadingStatus: RequestStatus.REQUEST_NOT_LOADED,
      };
      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        loadingStatus: RequestStatus.REQUEST_LOADED,
        data: defaultUser,
      });
    });
  });

  it(`handle ${userActions.logOut}`, () => {
    const initialState = {
      data: defaultUser,
      error: {},
      loadingStatus: RequestStatus.REQUEST_LOADED,
    };

    const action = userActions.logOut();
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      data: {},
      loadingStatus: RequestStatus.REQUEST_NOT_LOADED,
      error: {},
    });
  });
});
