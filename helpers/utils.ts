import { Platform, Dimensions } from "react-native";

const { width: Width, height: Height } = Dimensions.get("window");

export const isIOS = () => {
  return Platform.OS === "ios";
};

export const isAndroid = () => {
  return Platform.OS === "android";
};

export function getInitialsForFirstTwo(userNames: string): string {
  // Split the input string into an array of names
  const namesArray = userNames.split(" ");

  // Extract the first letter from the first two names and concatenate them
  const initials = namesArray
    .slice(0, 2) // Take only the first two names
    .map((name) => name.charAt(0).toUpperCase())
    .join("");

  return initials;
}

export const formatName = (value) => {
  const properName =
    value?.substring?.(0, 1)?.toUpperCase?.() +
    value?.substring?.(1)?.toLowerCase?.();

  return properName ?? "";
};

export const formatNames = (value) => {
  const arr = value.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] =
      arr[i]?.substring?.(0, 1)?.toUpperCase?.() +
      arr[i]?.substring?.(1)?.toLowerCase?.();
  }

  return (str2 = arr.join(" "));
};

export { Width, Height };
