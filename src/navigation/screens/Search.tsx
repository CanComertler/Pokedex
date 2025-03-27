import React, { useState, useEffect } from "react";
import { View, TextInput, Text, FlatList, Image, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native";
import useAxios from "../../hooks/useAxios";
import PokemonCard from "../../components/PokemonCard";

interface Pokemon {
  name: string;
  url: string;
}

const screenHeight = Dimensions.get("window").height;

const Search = () => {
  const [query, setQuery] = useState("");
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(null);
  const [translateY] = useState(new Animated.Value(screenHeight));
  const { data, loading, error } = useAxios<{ results: Pokemon[] }>("pokemon?limit=500");


  useEffect(() => {
    if (selectedPokemonId) {
      Animated.timing(translateY, {
        toValue: screenHeight * 0.2, 
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedPokemonId]);


  const closeCard = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setSelectedPokemonId(null));
  };

  const filteredPokemons = data?.results.filter((pokemon) =>
    pokemon.name.includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <TextInput
        placeholder="Search Pokémon..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      {!loading && !error && query && filteredPokemons && filteredPokemons.length === 0 && (
        <Text style={styles.notFound}>Pokemon Bulunamadı</Text>
      )}
      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.name}
        numColumns={3}
        renderItem={({ item }) => {
          const pokemonId = item.url.split("/").filter(Boolean).pop() || "unknown";
          return (
            <TouchableOpacity onPress={() => setSelectedPokemonId(pokemonId)}>
              <View style={styles.card}>
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
                  }}
                  style={styles.image}
                />
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.list}
      />

      {selectedPokemonId && (
        <Animated.View
          style={[
            styles.cardWrapper,
            { transform: [{ translateY }] },
          ]}
        >
          <PokemonCard pokemonId={selectedPokemonId} onClose={closeCard} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    padding: 10,
    paddingTop: 50,
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    textAlign: "left",
    backgroundColor: "#fff",
    elevation: 5, // Android için gölge
    shadowColor: "#000", // iOS için gölge
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  error: {
    color: "red",
  },
  notFound: {
    marginVertical: 10,
    fontSize: 16,
    color: "#555",
  },
  list: {
    alignItems: "center",
  },
  card: {
    width: 110,
    padding: 10,
    margin: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5, // Android gölge
    shadowColor: "#000", // iOS gölge
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  cardWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: screenHeight * 0.2, 
    height: screenHeight * 0.6, 
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

export default Search;
