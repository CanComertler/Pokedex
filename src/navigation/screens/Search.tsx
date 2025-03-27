import React, { useState } from "react";
import { View, TextInput, Text, FlatList, Image, StyleSheet } from "react-native";
import useAxios from "../../hooks/useAxios";

interface Pokemon {
  name: string;
  url: string;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const { data, loading, error } = useAxios<{ results: Pokemon[] }>("pokemon?limit=500");

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
          return <PokemonCard name={item.name} id={pokemonId} />;
        }}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const PokemonCard = ({ name, id }: { name: string; id: string }) => {
  const { data } = useAxios<{ sprites: { front_default: string }; types: { type: { name: string } }[] }>(`pokemon/${id}`);

  
  const filledTypes = data?.types.slice(0, 2) || [];
  while (filledTypes.length < 2) {
    filledTypes.push(null);
  }

  return (
    <View style={styles.card}>
      {data ? (
        <>
          <Image source={{ uri: data.sprites.front_default }} style={styles.image} />
          <Text style={styles.name}>{name}</Text>
          <View style={styles.typeContainer}>
            {filledTypes.map((t, index) =>
              t ? (
                <View key={index} style={[styles.typeBadge, { backgroundColor: getTypeColor(t.type.name) }]}>
                  <Text style={styles.typeText}>{t.type.name}</Text>
                </View>
              ) : (

                <View key={index} style={styles.typeBadgeEmpty} />
              )
            )}
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
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
    normal: "#A8A878",
  };
  return colors[type] || "#68A090";
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 20,
    marginTop: 20,
    resizeMode: "contain",
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    textAlign: "left",
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
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
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
  typeContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    marginVertical: 2,
    minWidth: 50,
    alignItems: "center",
  },
  typeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  typeBadgeEmpty: {
    marginVertical: 2,
    minWidth: 50,
    height: 24,
  },
});

export default Search;
