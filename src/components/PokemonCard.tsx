import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Animated, TouchableOpacity } from "react-native";

interface PokemonCardProps {
  pokemonId: string;
  onClose: () => void;
}

interface PokemonData {
  name: string;
  base_experience: number;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{ slot: number; type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  moves: Array<{ move: { name: string } }>;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonId, onClose }) => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [statAnimations, setStatAnimations] = useState<Animated.Value[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await response.json();
        setPokemon(data);
      } catch (e) {
        setError("Pokemon verileri alınamadı");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  useEffect(() => {
    if (pokemon) {
      const animValues = pokemon.stats.map(() => new Animated.Value(0));
      setStatAnimations(animValues);
      Animated.stagger(
        100,
        animValues.map((anim, index) => {
          const finalValue = Math.min(pokemon!.stats[index].base_stat, 100);
          return Animated.timing(anim, {
            toValue: finalValue,
            duration: 800,
            useNativeDriver: false,
          });
        })
      ).start();
    }
  }, [pokemon]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "Pokemon verisi mevcut değil"}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.cardContainer} contentContainerStyle={styles.cardContent} showsVerticalScrollIndicator={true}>
      <Text style={styles.pokemonName}>{pokemon.name.toUpperCase()}</Text>
      <Image
        source={{
          uri:
            pokemon.sprites.other["official-artwork"].front_default ||
            pokemon.sprites.front_default,
        }}
        style={styles.pokemonImage}
      />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipler</Text>
        <View style={styles.typesContainer}>
          {pokemon.types.map((typeObj) => (
            <View key={typeObj.slot} style={[styles.typeBadge, { backgroundColor: getTypeColor(typeObj.type.name) }]}>
              <Text style={styles.typeText}>{typeObj.type.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yetenekler</Text>
        <View style={styles.abilitiesContainer}>
          {pokemon.abilities.map((abilityObj, index) => (
            <View key={index} style={styles.abilityBadge}>
              <Text style={styles.abilityText}>{abilityObj.ability.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>İstatistikler</Text>
        {pokemon.stats.map((statObj, index) => {
          const finalValue = Math.min(statObj.base_stat, 100);
          const animatedWidth = statAnimations[index]?.interpolate({
            inputRange: [0, finalValue],
            outputRange: ["0%", `${finalValue}%`],
            extrapolate: "clamp",
          });
          return (
            <View key={index} style={styles.statRow}>
              <Text style={styles.statName}>{statObj.stat.name.toUpperCase()}</Text>
              <View style={styles.statBarContainer}>
                <Animated.View style={[styles.statBarFill, { width: animatedWidth }]} />
              </View>
              <Text style={styles.statValue}>{statObj.base_stat}</Text>
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Kapat</Text>
      </TouchableOpacity>
    </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    margin: 10,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContent: {
    flexGrow: 1,
    padding: 15,
    alignItems: "center",
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  pokemonImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginVertical: 20,
  },
  section: {
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#007BFF",
    marginBottom: 10,
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  typeBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  typeText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  abilitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  abilityBadge: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  abilityText: {
    color: "#555",
    fontSize: 14,
    textTransform: "capitalize",
  },
  statRow: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "80%",
  },
  statName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "left",
  },
  statBarContainer: {
    flex: 2,
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  statBarFill: {
    height: "100%",
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  closeButton: {
    marginBottom: 50,  
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 35,
    alignItems: "center",
    marginTop: 15,
    width: "80%",
  },
  closeButtonText: {  
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "right",
  },
});

export default PokemonCard;
