import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BannnerCarousel from "src/components/common/productCards/Carousel ";
import {
  getBestSellersHome,
  getProductsWithCategoryHome,
} from "src/services/api/productApi";
import { useProductStore } from "src/services/storage/productStore";
import HomeBestOf from "src/components/common/productCards/HomeBestOf";
import HomeBestOfAll from "src/components/common/productCards/HomeBestOfAll";

const Home: React.FC = () => {
  const {
    productsWithCategory,
    setProductsWithCategory,
    BestSellersHome,
    setBestSellersHome,
  } = useProductStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setIsLoading(true);
        const productsData = await getProductsWithCategoryHome();
        const bestSellerData = await getBestSellersHome();
        setProductsWithCategory(productsData.data);
        setBestSellersHome(bestSellerData || []); // Ensure we're setting an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (isLoading) {
  //   return null;
  // }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <BannnerCarousel />
        {BestSellersHome && <HomeBestOfAll products={BestSellersHome} />}
        {Array.isArray(productsWithCategory) &&
          productsWithCategory.map((category) => (
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
