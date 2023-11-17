// fontLoader.js
import * as Font from "expo-font";


export const loadCustomFont = async () => {
  try {
    await Font.loadAsync({
      GloryExtraBold:require("../assets/GloryFont/Glory-ExtraBold.ttf"),
      GloryBold:require("../assets/GloryFont/Glory-Bold.ttf"),
      GloryExtraLight:require("../assets/GloryFont/Glory-ExtraLight.ttf"),
      GloryLight:require("../assets/GloryFont/Glory-Light.ttf"),
      GloryMedium:require("../assets/GloryFont/Glory-Medium.ttf"),
      GloryRegular:require("../assets/GloryFont/Glory-Regular.ttf"),
      GlorySemiBold:require("../assets/GloryFont/Glory-SemiBold.ttf"),
      GloryThin:require("../assets/GloryFont/Glory-Thin.ttf")
    });
    return true;
  } catch (error) {
    console.error("Error loading custom font:", error);
    return false;
  }
};
