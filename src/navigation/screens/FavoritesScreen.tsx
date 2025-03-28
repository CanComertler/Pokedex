import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromFavorites } from "../../redux/favoritesSlice";
import { Ionicons } from "@expo/vector-icons";

const FavoritesScreen = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const [pokemonDetails, setPokemonDetails] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavoritesDetails = async () => {
      const details = await Promise.all(
        favorites.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          return response.json();
        })
      );
      setPokemonDetails(details);
    };

    if (favorites.length > 0) {
      fetchFavoritesDetails();
    }
  }, [favorites]);

  const handleRemove = (id: string) => {
    dispatch(removeFromFavorites(id));
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.sprites.other["official-artwork"].front_default || item.sprites.front_default,
        }}
        style={styles.image}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name.toUpperCase()}</Text>
        <View style={styles.itemTypes}>
          {item.types.map((type: { type: { name: string } }) => (
            <View
              key={type.type.name}
              style={[styles.typeBadge, { backgroundColor: getTypeColor(type.type.name) }]}
            >
              <Text style={styles.typeText}>{type.type.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={() => handleRemove(item.id.toString())} style={styles.iconContainer}>
        <Ionicons name="trash-bin" size={32} color="gray" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favori Pokémonlar</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Henüz favoriye eklenmiş Pokémon yok.</Text>
      ) : (
        <FlatList
          data={pokemonDetails}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };
  return colors[type] || "#68A090";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f8f8f8",
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  itemTypes: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  typeBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 5,
    marginTop: 5,
  },
  typeText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  iconContainer: {
    marginLeft: 10,
  },
});

export default FavoritesScreen;
