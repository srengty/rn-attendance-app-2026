import { Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
const FeatureHighlight = ({
  icon,
  title,
  description,
  color,
  handleFeaturePress = () => {},
}) => {
  const feature = {
    id: 1,
    title: title ?? "Digital Assignments",
    description: description ?? "Submit and track your homework online",
    icon:
      typeof icon == "string" ? (
        <Entypo name={icon} size={32} color={color ?? "#4A90E2"} />
      ) : (
        ""
      ),
    color: color ?? "#4A90E2",
  };
  return (
    <TouchableOpacity
      key={feature.id}
      style={[styles.featureCard, { borderLeftColor: feature.color }]}
      onPress={() => handleFeaturePress(feature)}
    >
      <Text style={styles.featureIcon}>{feature.icon}</Text>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{feature.title}</Text>
        <Text style={styles.featureDescription}>{feature.description}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  featureCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    elevation: 5,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
export default FeatureHighlight;
