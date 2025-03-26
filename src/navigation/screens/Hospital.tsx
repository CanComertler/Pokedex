import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, PanResponder } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

interface MarkerData {
  id: number;
  title: string;
  coordinate: { latitude: number; longitude: number };
  address: string;
  image: string;
}

export function Hospital() {
  const [markers] = useState<MarkerData[]>([
    {
      id: 1,
      title: "PokeCenter",
      coordinate: { latitude: 36.87424, longitude: 30.65714 },
      address: "Konyaaltı, Antalya, Turkey",
      image:
        "https://www.dexerto.com/cdn-image/wp-content/uploads/2022/09/04/pokemon-center-header.jpg?width=1200&quality=60&format=auto",
    },
    {
      id: 2,
      title: "PokeCenter",
      coordinate: { latitude: 36.87907, longitude: 30.71859 },
      address: "Muratpaşa, Antalya, Turkey",
      image:
        "https://www.dexerto.com/cdn-image/wp-content/uploads/2022/09/04/pokemon-center-header.jpg?width=1200&quality=60&format=auto",
    },
  ]);

  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [translateY] = useState(new Animated.Value(-500));
  const [cardHeight, setCardHeight] = useState(0);
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    if (cardHeight === 0 && selectedMarker) {
      setCardHeight(screenHeight * 0.4);
    }
  }, [selectedMarker, cardHeight]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 150) {
        closeCard();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleMarkerPress = (marker: MarkerData) => {
    setSelectedMarker(marker);
    Animated.timing(translateY, {
      toValue: Math.min(0, screenHeight / 2 - cardHeight / 2),
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closeCard = () => {
    Animated.timing(translateY, {
      toValue: -500,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setSelectedMarker(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 36.8885,
          longitude: 30.7056,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            onPress={() => handleMarkerPress(marker)}
          >
            <View style={styles.marker}>
              <MaterialIcons
                name="local-hospital"
                size={30}
                color="white"
                style={styles.icon}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      {selectedMarker && (
        <Animated.View style={[styles.card, { transform: [{ translateY }] }]} {...panResponder.panHandlers}>
          <Text style={styles.cardTitle}>PokeCenter</Text>
          <Image source={{ uri: selectedMarker.image }} style={styles.cardImage} />
          <Text style={styles.cardAddress}>{selectedMarker.address}</Text>

          <View style={styles.cardInfo}>
            <View style={styles.infoRow}>
              <MaterialIcons name="phone" size={24} color="#007BFF" style={styles.infoIcon} />
              <Text style={styles.infoText}>+90 555 123 45 67</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="email" size={24} color="#007BFF" style={styles.infoIcon} />
              <Text style={styles.infoText}>poke@poke.com</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="info" size={24} color="#007BFF" style={styles.infoIcon} />
              <Text style={styles.infoText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={closeCard}>
            <Text style={styles.buttonText}>7/24 Açık</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    position: "absolute",
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardAddress: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
    textAlign: "center",
  },
  cardInfo: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Hospital;
