import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageCarousel from "src/components/common/productCards/ImageCarouselProductDetails";
import { ScreensParamList } from "src/navigation/types";
import { getProductDetails } from "src/services/api/productApi";

const ProductDetails: React.FC = ({ route }: any) => {
  const { id } = route.params;
  const navigation = useNavigation<NavigationProp<ScreensParamList>>();
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState<any>(null);

  const fetchProductDetails = async (id) => {
    const data = await getProductDetails(id, setLoading);
    await setProductDetails(data.product);
  };

  useEffect(() => {
    fetchProductDetails(id);
  }, []);

    console.log(productDetails?.images, "id");
  return (
    <View style={styles.container}>
        <ImageCarousel images={productDetails?.images} />
      <Text style={styles.contentText}>{productDetails?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#white",
  },
  contentText: {
    fontSize: 18,
    paddingTop: 20,
    color: "#444",
    textAlign: "center",
  },
});

export default ProductDetails;
