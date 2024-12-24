import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BannnerCarousel from "src/components/common/productCards/Carousel ";
import { getProductsWithCategoryHome } from "src/services/api/productApi";
import { useProductStore } from "src/services/storage/productStore";
import HomeBestOf from "src/components/common/productCards/HomeBestOf";

const Home: React.FC = () => {
  const { productsWithCategory, setProductsWithCategory } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductsWithCategoryHome();
      setProductsWithCategory(data.data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <BannnerCarousel />
        {productsWithCategory?.map((category) => (
          <HomeBestOf
            key={category.id}
            category={category.name}
            categoryId={category.id.toString()}
            products={category.products}
          />
        ))}
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
