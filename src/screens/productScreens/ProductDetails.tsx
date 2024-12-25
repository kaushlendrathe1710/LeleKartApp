import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  ActivityIndicator,
} from "react-native";
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import ImageCarousel from "src/components/common/productCards/ImageCarouselProductDetails";
import SkeletonLoading from "src/components/common/SkeletonLoading";
import { ScreensParamList } from "src/navigation/types";
import {
  getProductDetails,
  getProductsByCategory,
} from "src/services/api/productApi";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "src/components/common/CBackBotton";
import ProductCarousel from "src/components/common/productCards/ProductCarousel";
import FastImage from "react-native-fast-image";
import ShowMoreText from "src/components/common/productCards/ShowMoreText";

interface DetailType {
  key: string;
  value: string;
}

interface ProductType {
  id: string;
  name: string;
  price: number;
  description: string;
  images: any;
  categories: any;
  features: any;
  tags:any;
}

const ProductDetails: React.FC = ({ route }: any) => {
  const colors = { text: "#020003", background: "#020003", primary: "#fff" };
  const { id } = route.params;
  const navigation = useNavigation<NavigationProp<ScreensParamList>>();
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );
  const [bottomRecommendation, setBottomRecommendation] = useState<any[]>();
  const [quantity, setQuantity] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [buttonScale] = useState(new Animated.Value(1));
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [heartScale] = useState(new Animated.Value(0));
  const [heartOpacity] = useState(new Animated.Value(0));

  const fetchProductDetails = async (id: string) => {
    try {
      setLoading(true);
      // Fetch product details
      const data = await getProductDetails(id, setLoading);
      // Set product details state
      await setProductDetails(data.product);
      // Directly access the data instead of relying on the updated state
      const categoryId = data.product?.categories?.id;
      const productId = data.product?.id;
      // Fetch products by category
      const productByCategoryData = await getProductsByCategory(
        categoryId,
        productId,
        setLoading
      );
      // Set bottom recommendation state
      await setBottomRecommendation(productByCategoryData.product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    if (isWishlisted) {
      return null;
    } else {
      animateHeart();
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      setQuantity(1);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (increment: boolean) => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setQuantity((prev) => (increment ? prev + 1 : Math.max(0, prev - 1)));
  };

  const animateHeart = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(heartOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(heartScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(heartOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  if (loading) {
    return (
      <View>
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </View>
    );
  }
console.log(productDetails?.tags)
  return (
    <View style={[styles.container]}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageCarousel images={productDetails?.images} />
        <View style={styles.contentContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
              marginHorizontal: 10,
            }}
          >
            <Text style={[styles.name, { color: colors.text, width: "80%" }]}>
              {productDetails?.name}
            </Text>
            <Text
              style={[
                styles.price,
                { color: colors.text, width: "20%", textAlign: "right" },
              ]}
            >
              ₹{productDetails?.price?.toLocaleString("en-IN")}
            </Text>
          </View>

          <View style={styles.actionContainer}>
            <Pressable
              onPress={toggleWishlist}
              style={styles.wishlistIconContainer}
            >
              <Icon
                name={isWishlisted ? "heart" : "heart-outline"}
                size={28}
                color={isWishlisted ? "red" : "white"}
              />
            </Pressable>

            <Animated.View
              style={[
                styles.cartContainer,
                { transform: [{ scale: buttonScale }] },
              ]}
            >
              {quantity > 0 ? (
                <View style={styles.quantityContainer}>
                  <Pressable
                    onPress={() => handleQuantityChange(false)}
                    style={[
                      styles.quantityButton,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Text style={styles.quantityButtonText}>−</Text>
                  </Pressable>

                  <Text style={[styles.quantityText, { color: "#fff" }]}>
                    {quantity}
                  </Text>

                  <Pressable
                    onPress={() => handleQuantityChange(true)}
                    style={[
                      styles.quantityButton,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={handleAddToCart}
                  style={[styles.addButton, { backgroundColor: "#020003" }]}
                  disabled={addingToCart}
                >
                  {addingToCart ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.buttonText}>Add to Cart</Text>
                  )}
                </Pressable>
              )}
            </Animated.View>
          </View>

          {productDetails && productDetails?.description && (
            <View style={styles.descriptionContainer}>
              <Text style={{ fontWeight: 500 }}>Description:</Text>
              <ShowMoreText
                text={productDetails?.description || " "}
                wordLimit={15}
                fontSize={14}
                lineHeight={23}
              />
            </View>
          )}

          {productDetails && productDetails?.tags && (
            <View style={styles.descriptionContainer}>
              <Text style={{ fontWeight: "500" }}>Tags:</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop:5
                }}
              >
                {productDetails?.tags
                  .filter((tag) => tag.trim() !== "") // Filter out blank tags
                  .map((tag, index) => (
                    <Text
                      style={{
                        width: "20%",
                        backgroundColor: "#020003",
                        borderRadius: 25,
                        color: "white",
                        textAlign: "center",
                        padding: 5,
                      }}
                      key={index}
                    >
                      {tag}
                    </Text>
                  ))}
              </View>
            </View>
          )}

          {productDetails && productDetails?.features && (
            <View style={[styles.descriptionContainer]}>
              <Text style={{ fontWeight: 500 }}>Features:</Text>
              <ShowMoreText
                text={
                  productDetails?.features
                    ? productDetails.features.join(" ")
                    : " "
                }
                wordLimit={20}
                fontSize={14}
                lineHeight={23}
              />
            </View>
          )}
        </View>

        {/* best of related to category of product  */}
        <View>
          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#282C35" }}
            >
              Best Of {productDetails?.categories?.name}
            </Text>
          </View>
          {bottomRecommendation && (
            <ProductCarousel
              products={bottomRecommendation || []}
              forWhat="bottomrecommendation"
            />
          )}
        </View>
      </ScrollView>
      {/* Animated Heart Overlay */}
      <Animated.View
        style={[
          styles.heartOverlay,
          {
            transform: [{ scale: heartScale }],
            opacity: heartOpacity,
          },
        ]}
      >
        <Icon name="heart" size={200} color="red" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  contentContainer: {
    padding: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
  },
  price: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  wishlistIconContainer: {
    marginRight: 12,
    backgroundColor: "#020003",
    padding: 11,
    borderRadius: "100%",
  },
  cartContainer: {
    flex: 1,
  },
  addButton: {
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#020003",
    borderRadius: 30,
    padding: 8,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "#020003",
    fontSize: 24,
    fontWeight: "600",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "600",
  },
  descriptionContainer: {
    marginTop: 12,
  },
  mainText: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 16,
    fontWeight: 400,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  detailItem: {
    width: "33.33%",
    paddingHorizontal: 8,
    marginBottom: 5,
  },
  detailKey: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: "#666",
  },
  heartOverlay: {
    position: "absolute",
    top: "40%",
    left: "27%",
    zIndex: 10,
  },
});

export default ProductDetails;
