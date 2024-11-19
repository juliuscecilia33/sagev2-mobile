import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation, useRouter } from "expo-router"; // Import useRouter from expo-router
import { styles } from "./HomeScreen.styles"; // Import styles
import Background from "./assets/Background.png"; // Updated import path
import Character from "./assets/CharacterImage.png";
import NavButton from "@/components/Buttons/NavButton/NavButton";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window"); // Screen dimensions

export default function HomeScreen() {
  const router = useRouter();

  const navigation = useNavigation();
  const [characterPositionX] = useState(new Animated.Value(0));
  const [characterPositionY] = useState(new Animated.Value(0));

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const randomStartX = Math.random() * (screenWidth - 128);

    // Adjusting the Y position so the character is not too low
    const randomStartY = Math.random() * (screenHeight * 0.4 - 128); // Constrain to top 40% of the screen

    characterPositionX.setValue(randomStartX);
    characterPositionY.setValue(randomStartY);

    const moveCharacter = () => {
      const generateRandomTargetX = () => {
        const randomTarget = randomStartX + (Math.random() > 0.5 ? 40 : -40);
        return Math.max(0, Math.min(randomTarget, screenWidth - 128)); // Stay within screen bounds
      };

      const generateRandomTargetY = () => {
        let randomTarget = randomStartY + (Math.random() > 0.5 ? 30 : -30); // Move ±30 vertically

        // Ensure the target Y position doesn't go below the navButtons (bottom 50 of the screen)
        if (randomTarget > screenHeight - 100 - 128) {
          randomTarget = screenHeight - 100 - 128; // Adjust so it's above navButtons
        }

        // Ensure the target stays within the top 60% of the screen
        return Math.max(0, Math.min(randomTarget, screenHeight * 0.6 - 128)); // Constrain Y movement above the nav buttons
      };

      const animate = () => {
        Animated.parallel([
          Animated.timing(characterPositionX, {
            toValue: generateRandomTargetX(),
            duration: 4000, // Slow horizontal movement
            useNativeDriver: true,
          }),
          Animated.timing(characterPositionY, {
            toValue: generateRandomTargetY(),
            duration: 4000, // Slow vertical movement
            useNativeDriver: true,
          }),
        ]).start(() => {
          animate(); // Recursive call for continuous animation
        });
      };

      animate();
    };

    moveCharacter();
  }, [characterPositionX, characterPositionY]);

  return (
    <ImageBackground
      source={Background}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Wandering Character */}
      <Animated.View
        style={[
          styles.character,
          {
            transform: [
              { translateX: characterPositionX },
              { translateY: characterPositionY },
            ],
          },
        ]}
      >
        <Image source={Character} style={styles.characterImage} />
      </Animated.View>

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        <NavButton
          IconLibrary={FontAwesome5}
          iconName="play"
          iconSize={40}
          iconColor="#13A4FF"
          onPress={() => router.push("/(authed)/(home)")}
        />
        <NavButton
          IconLibrary={MaterialIcons}
          iconName="checklist"
          iconSize={40}
          iconColor="#AD79EB"
          onPress={() => router.push("/(authed)/(daily)")}
        />
        <NavButton
          IconLibrary={FontAwesome6}
          iconName="face-smile-beam"
          iconSize={40}
          iconColor="#E57C17"
          onPress={() => router.push("/(authed)/(profile)")}
        />
      </View>
    </ImageBackground>
  );
}