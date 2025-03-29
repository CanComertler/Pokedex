import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity, 
  Animated,
  Dimensions 
} from "react-native";
import useAxios from "../../hooks/useAxios";
import PokemonCard from "../../components/PokemonCard";

const ASH_POKEMON = [
  "pikachu", "caterpie", "pidgeotto", "bulbasaur", "charmander", "squirtle", 
  "raticate", "kingler", "muk", "tauros", "lapras", "snorlax", "heracross", 
  "bayleef", "cyndaquil", "totodile", "noctowl", "donphan", "aipom", "treecko", 
  "torchic", "mudkip", "corphish", "torkoal", "swellow", "starly", "turtwig", 
  "chimchar", "buizel", "gligar", "snivy", "tepig", "oshawott", "pidove", "scraggy", 
  "axew", "froakie", "fletchinder", "honedge", "rowlet", "litten", "popplio", 
  "rockruff", "poipole", "riolu"
];

type PokemonData = {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
};

const TYPE_COLORS: Record<string, string> = {
  fire: "#f08030",
  water: "#6890f0",
  grass: "#78c850",
  electric: "#f8d030",
  psychic: "#f85888",
  normal: "#a8a878",
  bug: "#a8b820",
  dragon: "#7038f8",
  ghost: "#705898",
  ice: "#98d8d8",
  fighting: "#c03028",
  poison: "#a040a0",
  rock: "#b8a038",
  fairy: "#ee99ac",
  steel: "#b8b8d0",
  dark: "#705848",
};

const PokemonItem: React.FC<{ pokemonName: string; onPress: () => void }> = ({ pokemonName, onPress }) => {
  const { loading, data, error } = useAxios<PokemonData>(`pokemon/${pokemonName}`);

  if (loading) return <ActivityIndicator size="small" color="#000" />;
  if (error || !data) return <Text style={styles.error}>Error</Text>;

  const pokemonTypeColors = data.types.map((t) => TYPE_COLORS[t.type.name] || "#ccc");

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.pokemonItem}>
        <Image
          source={{ uri: data.sprites.front_default }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />
        <View style={styles.pokemonInfo}>
          <Text style={styles.pokemonName}>
            {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
          </Text>
          <View style={styles.typeContainer}>
            {data.types.map((type, index) => (
              <View
                key={index}
                style={[styles.typeBadge, { backgroundColor: pokemonTypeColors[index] }]}
              >
                <Text style={styles.typeText}>{type.type.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const screenHeight = Dimensions.get("window").height;

const Ash: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [translateY] = useState(new Animated.Value(screenHeight));

  useEffect(() => {
    if (selectedPokemon) {
      Animated.timing(translateY, {
        toValue: screenHeight * 0.2,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedPokemon]);

  const closeCard = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setSelectedPokemon(null));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Trainer/Ash.png")}
        style={styles.ashImage}
        resizeMode="contain"
      />
      <Text style={styles.headerText}>Ash's Pokémon</Text>
      <FlatList
        data={ASH_POKEMON}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PokemonItem 
            pokemonName={item} 
            onPress={() => setSelectedPokemon(item)}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />

      {selectedPokemon && (
        <Animated.View
          style={[
            styles.cardWrapper,
            { transform: [{ translateY }] },
          ]}
        >
          <PokemonCard pokemonId={selectedPokemon} onClose={closeCard} />
        </Animated.View>
      )}
    </View>
  );
};

export default Ash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  ashImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  pokemonItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  pokemonInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  typeBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  typeText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
  cardWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: screenHeight * 0.05,
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
