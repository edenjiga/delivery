import { CommonActions, NavigationState } from "@react-navigation/native";

export const RemoveLastTwoAndAddGoTo = (goTo?: string) => (
  state: NavigationState
) => {
  const routes = [...state.routes.slice(0, state.routes.length - 2)];

  if (goTo) {
    routes.push({
      name: goTo,
    });
  }

  return CommonActions.reset({
    ...state,
    routes,
    index: routes.length - 1,
  });
};
