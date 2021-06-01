import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { CODE_ERRORS } from "@/constants";
export const getLocation = async () => {
  try {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      throw new Error(CODE_ERRORS.LOCATION_PERMISSION_DENIED);
    }
    const location = await Location.getLastKnownPositionAsync();
    return location;
  } catch (error) {
    console.log(error, "error");
    throw error;
  }
};
