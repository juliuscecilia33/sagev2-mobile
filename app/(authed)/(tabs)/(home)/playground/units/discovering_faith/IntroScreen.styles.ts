import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DarkSkyBluePrimary,
    paddingVertical: 65,
    paddingHorizontal: 20,
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    bottom: "-35%",
    left: 0,
    width: "115%",
    // height: "40%", // Adjust height as needed
    zIndex: -1, // Push the image behind other elements
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative", // Ensures absolute positioning works within the row
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressWrapper: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }], // Center horizontally
  },
  progressCount: {
    borderRadius: 20,
    backgroundColor: colors.DarkSkyBlueBacking,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 6,
  },
});
