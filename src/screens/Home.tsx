import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BannnerCarousel from "src/components/common/productCards/Carousel ";
import { getBanners } from "src/services/api/productApi";
const Home: React.FC = () => {
  const [banners, setBanners] = useState<any>([]);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {banners?.banners?.length === 0 && (
          <Text style={styles.title}>No Banners Found</Text>
        )}
        <BannnerCarousel data={banners?.banners || []} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default Home;
