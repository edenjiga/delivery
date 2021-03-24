import { RootState } from "@/store";
import { logOut as userLogOutAction } from "@/store/actions/user";
import { IuserState } from "@/types";
import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabAccountScreen from "./TabAccountScreen";

const TabAccountScreenContainer: FC = () => {
  const dispatch = useDispatch();
  const { loadingStatus } = useSelector<RootState, IuserState>(
    (state) => state.user
  );
  const onPressLogOut = useCallback(() => {
    dispatch(userLogOutAction());
  }, []);
  return (
    <TabAccountScreen
      onPressLogOut={onPressLogOut}
      loadingStatus={loadingStatus}
    />
  );
};

export default TabAccountScreenContainer;
