import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from "react-native";
import { USERS } from "../../data/badgeTrainer";
import BadgeTrainer from "../../components/BadgeTrainer";

const { height } = Dimensions.get("window");

const Badge = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const onUserPress = (user: any) => {
    setSelectedUser(user);
  };

  const closeSheet = () => {
    setSelectedUser(null);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => onUserPress(item)}
      style={[styles.card, { backgroundColor: item.color }]}
    >
      <Image source={item.avatar} style={styles.avatar} resizeMode="contain" />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Image
        source={item.badgeImage}
        style={styles.badgeImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={USERS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />

      {selectedUser && (
        <View style={styles.detailOverlay}>
          <BadgeTrainer
            name={selectedUser.name}
            title={selectedUser.title}
            avatar={selectedUser.avatar}
            city={selectedUser.city}
            specialty={selectedUser.specialty}
            list={selectedUser.list}  
            badge={selectedUser.badge}
            badgeImage={selectedUser.badgeImage}                 
            backgroundColor={selectedUser.color}          
            onClose={closeSheet}
          />
        </View>
      )}
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",

  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0, 
      height: 0, 
    },
    shadowOpacity: 0.5,
    shadowRadius: 10, 
    elevation: 10, 
    flexDirection: "row",
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 15,
    marginBottom: 15,
    alignItems: "center",
},
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
  },
  title: {
    fontSize: 16,
    color: "#eee",
    marginTop: 2,
  },
  badgeImage: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  logo: {
    justifyContent: "center",
    marginTop: 50,
    resizeMode: "contain",
    width: 250,
    height: 100,
    marginBottom: 10,
    alignSelf: "center",
  },
  detailOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
