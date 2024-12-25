import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProductCarousel from "./ProductCarousel";
import SkeletonLoader from "../SkeletonProps";
import SkeletonLoading from "../SkeletonLoading";

// Define types for product data
interface productDataProps {
  sku: string;
  description: string;
  price: number;
  stock: number;
  images: string[] | null;
  id: number;
  name: string;
  brand: string;
  isApproved: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  vendorEmail: string;
  categoryId: number;
  subCategoryId: number;
  discountedPrice: number | null;
  videoUrl: string | null;
  tags: string[] | null;
  preOrder: string | null;
  minOrderQty: number | null;
  productMeasurement: string | null;
  allowWholesale: boolean | null;
  variants: VariantProps[];
}

interface VariantProps {
  id: number;
  color: string;
  size: string;
  description: string | null;
  price: number;
  sku: string;
  stock: number;
  productId: number;
  productName: string;
  sales: number;
  variantImages: {
    id: number;
    variantId: number;
    imageUrl: string;
  }[];
}
const HomeBestOfAll = ({
  products,
}: {
  products?: productDataProps[] | any; // temporarily widen type for debugging
}) => {
  // Only proceed if we have products
  if (products?.length === 0) {
    return (
      <>
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </>
    );
  }

  const transformedProducts = products.products.map((product) => ({
    id: product.id?.toString() || "",
    name: product?.name || "",
    price:
      product.variants?.length > 0
        ? product.variants[0].price?.toString()
        : product.price?.toString() || "0",
    description: product?.description || "",
    image:
      product.variants?.length > 0
        ? product.variants[0]?.variantImages?.[0]?.imageUrl
        : product.images?.[0] ?? "",
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Best Of All</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            width: "85%",
            opacity: 0.8,
            color: "#282C35",
          }}
        >
          Our best products where classic and contemporary style converge in
          perfect harmony
        </Text>
      </View>

      {transformedProducts?.length > 0 && (
        <ProductCarousel products={transformedProducts} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 15,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#282C35",
  },
  viewMore: {
    color: "#007BFF",
    fontSize: 16,
  },
});

export default HomeBestOfAll;
