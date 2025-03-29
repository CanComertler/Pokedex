import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface BadgeTrainerProps {
  name: string;
  title: string;
  avatar: any;
  badge: string;
  badgeImage: any;
  city: string;
  specialty: string;
  list: string;
  backgroundColor?: string;
  onClose?: () => void;
}

const getLightColor = (color: string): string => {
  if (color && color[0] === "#" && color.length === 7) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  }
  return color || "rgba(255,255,255,0.9)";
};

const BadgeTrainer: React.FC<BadgeTrainerProps> = ({
  name,
  title,
  avatar,
  badge,
  badgeImage,
  city,
  specialty,
  list,
  backgroundColor = "#ffffff",
  onClose,
}) => {
  const bgColor = getLightColor(backgroundColor);
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Image source={avatar} style={styles.avatar} resizeMode="contain" />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>City</Text>
        <Text style={styles.infoText}>{city}</Text>
        <Text style={styles.infoTitle}>Specialty</Text>
        <Text style={styles.infoText}>{specialty}</Text>
        <Text style={styles.infoTitle}>Pokémon</Text>
        <Text style={styles.infoText}>{list}</Text>
      </View>
      <Image source={badgeImage} style={styles.badgeImage} resizeMode="contain" />
      <Text style={styles.badgeName}>{badge}</Text>
      {onClose && (
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Kapat</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BadgeTrainer;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    paddingBottom: 30,
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 250,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  infoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  badgeImage: {
    width: 80,
    height: 80,
    marginTop: 10,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#CC0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
