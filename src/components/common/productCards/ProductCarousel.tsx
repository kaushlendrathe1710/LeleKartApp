// import React, { useRef, useState, useEffect } from "react";
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   Dimensions,
//   StyleSheet,
//   Image,
//   Animated,
//   NativeSyntheticEvent,
//   NativeScrollEvent,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// const { width } = Dimensions.get("window");
// const ITEM_WIDTH = width * 0.6;
// const SPACING = 10;

// interface Product {
//   name: string;
//   price: string;
//   description: string;
//   image: string;
// }

// interface ProductCarouselProps {
//   products: Product[];
// }

// const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
//   const scrollViewRef = useRef<ScrollView>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const scrollX = useRef(new Animated.Value(0)).current;

//   // Create a circular array of products for infinite scroll
//   const extendedProducts = [...products, ...products, ...products];
//   const initialScrollIndex = products.length;

//   const renderItem = (product: Product) => (
//     <View style={styles.productCard}>
//       <TouchableOpacity
//         style={{
//           position: "absolute",
//           right: 10,
//           top: 10,
//           zIndex: 1,
//           backgroundColor: "rgba(151, 151, 151, 0.2)", // White with 50% opacity
//           padding: 2,
//           borderRadius: 10,
//         }}
//       >
//         <Icon name="heart-outline" size={25} color="black" />
//       </TouchableOpacity>

//       <Image
//         source={{ uri: product.image }}
//         style={styles.productImage}
//         resizeMode="cover"
//       />
//       <View style={styles.productInfo}>
//         <Text style={styles.productName} numberOfLines={1}>
//           {product.name}
//         </Text>
//         <Text style={styles.productPrice}>${product.price}</Text>
//         <Text style={styles.productDescription} numberOfLines={1}>
//           {product.description}
//         </Text>
//       </View>
//     </View>
//   );

//   useEffect(() => {
//     // Initialize scroll position to middle set of items
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollTo({
//         x: initialScrollIndex * (ITEM_WIDTH + SPACING * 2),
//         animated: false,
//       });
//     }
//   }, []);

//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//     { useNativeDriver: false }
//   );

//   const handleMomentumScrollEnd = (
//     event: NativeSyntheticEvent<NativeScrollEvent>
//   ) => {
//     const position = event.nativeEvent.contentOffset.x;
//     const index = Math.round(position / (ITEM_WIDTH + SPACING * 2));

//     // Calculate the actual index within the original products array
//     const normalizedIndex = index % products?.length;
//     setCurrentIndex(normalizedIndex);

//     // If we're in the last set, jump to middle set
//     if (index >= products?.length * 2) {
//       scrollViewRef.current?.scrollTo({
//         x: (normalizedIndex + products?.length) * (ITEM_WIDTH + SPACING * 2),
//         animated: false,
//       });
//     }
//     // If we're in the first set, jump to middle set
//     else if (index < products?.length) {
//       scrollViewRef.current?.scrollTo({
//         x: (normalizedIndex + products?.length) * (ITEM_WIDTH + SPACING * 2),
//         animated: false,
//       });
//     }
//   };

//   const goToNext = () => {
//     const nextIndex = currentIndex + 1;
//     const normalizedIndex = nextIndex % products?.length;
//     const scrollToIndex = normalizedIndex + products?.length;

//     scrollViewRef.current?.scrollTo({
//       x: scrollToIndex * (ITEM_WIDTH + SPACING * 2),
//       animated: true,
//     });
//     setCurrentIndex(normalizedIndex);
//   };

//   const goToPrevious = () => {
//     const prevIndex = currentIndex - 1;
//     const normalizedIndex = prevIndex < 0 ? products?.length - 1 : prevIndex;
//     const scrollToIndex = normalizedIndex + products?.length;

//     scrollViewRef.current?.scrollTo({
//       x: scrollToIndex * (ITEM_WIDTH + SPACING * 2),
//       animated: true,
//     });
//     setCurrentIndex(normalizedIndex);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         horizontal
//         ref={scrollViewRef}
//         onScroll={handleScroll}
//         onMomentumScrollEnd={handleMomentumScrollEnd}
//         showsHorizontalScrollIndicator={false}
//         scrollEventThrottle={16}
//         snapToInterval={ITEM_WIDTH + SPACING * 2}
//         decelerationRate="fast"
//         contentContainerStyle={styles.scrollContent}
//       >
//         {extendedProducts.map((product, index) => (
//           <View
//             key={index}
//             style={[styles.itemContainer, { width: ITEM_WIDTH }]}
//           >
//             {renderItem(product)}
//           </View>
//         ))}
//       </ScrollView>

//       {/* <View style={styles.navigation}>
//         <TouchableOpacity onPress={goToPrevious} style={styles.navButton}>
//           <Text style={styles.navButtonText}>←</Text>
//         </TouchableOpacity>

//         <Text style={styles.pageIndicator}>
//           {currentIndex + 1} / {products.length}
//         </Text>

//         <TouchableOpacity onPress={goToNext} style={styles.navButton}>
//           <Text style={styles.navButtonText}>→</Text>
//         </TouchableOpacity>
//       </View> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // marginVertical: 20,
//   },
//   scrollContent: {
//     // paddingHorizontal: SPACING,
//   },
//   itemContainer: {
//     paddingHorizontal: SPACING,
//   },
//   productCard: {
//     // backgroundColor: "#fafafa",
//     backgroundColor: "#f0f0f0",
//     // backgroundColor: "#fff7f7",
//     borderRadius: 12,
//     padding: 5,
//   },
//   productImage: {
//     width: "100%",
//     height: 200,
//     borderRadius: 12,
//   },
//   productInfo: {
//     padding: 10,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   productPrice: {
//     fontSize: 16,
//     color: "#0066CC",
//     marginBottom: 5,
//   },
//   productDescription: {
//     fontSize: 14,
//     color: "#666",
//   },
//   navigation: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 10,
//   },
//   navButton: {
//     backgroundColor: "#0066CC",
//     padding: 10,
//     borderRadius: 20,
//     marginHorizontal: 10,
//   },
//   navButtonDisabled: {
//     backgroundColor: "#CCCCCC",
//   },
//   navButtonText: {
//     color: "white",
//     fontSize: 18,
//   },
//   pageIndicator: {
//     fontSize: 16,
//     marginHorizontal: 15,
//   },
// });

// export default ProductCarousel;
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ScreensParamList } from "src/navigation/types";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.6;
const SPACING = 10;

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const navigation = useNavigation<NavigationProp<ScreensParamList>>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = (product: Product) => (
    <TouchableOpacity
      style={styles.productCard}
      // onPress={() => {
      //   console.log("Product Clicked");
      // }}
      onPress={() => navigation.navigate("ProductDetails", { id: product?.id })}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          zIndex: 1,
          backgroundColor: "rgba(151, 151, 151, 0.2)", // White with 50% opacity
          padding: 2,
          borderRadius: 10,
        }}
      >
        <Icon name="heart-outline" size={25} color="black" />
      </TouchableOpacity>

      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.productPrice}>₹{product.price}</Text>
        <Text style={styles.productDescription} numberOfLines={1}>
          {product.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const position = event.nativeEvent.contentOffset.x;
    const index = Math.round(position / (ITEM_WIDTH + SPACING * 2));
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={ITEM_WIDTH + SPACING * 2}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
      >
        {products.map((product, index) => (
          <View
            key={index}
            style={[styles.itemContainer, { width: ITEM_WIDTH }]}
          >
            {renderItem(product)}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  scrollContent: {},
  itemContainer: {
    paddingHorizontal: SPACING,
  },
  productCard: {
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    padding: 5,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#0066CC",
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default ProductCarousel;
