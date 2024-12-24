import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ProductCarousel from "./ProductCarousel";

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

const HomeBestOf = ({
  category,
  categoryId,
  products,
}: {
  category: string;
  categoryId: string;
  products: productDataProps[];
}) => {
  // Transform the products data to match the ProductCarousel component's expected format
  const transformedProducts = products.map((product) => ({
    id: product.id.toString(),
    name: product.name,
    price:
      product.variants.length > 0
        ? product.variants[0].price.toString()
        : product.price.toString(),
    description: product.description,
    image:
      product.variants.length > 0
        ? product.variants[0].variantImages[0]?.imageUrl
        : product.images?.[0] ?? "",
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Best Of {category}</Text>
        <TouchableOpacity
          onPress={() => console.log(`Go to category ${categoryId}`)}
        >
          <Text style={styles.viewMore}>View More</Text>
        </TouchableOpacity>
      </View>

      <ProductCarousel products={transformedProducts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginTop:15,
    paddingHorizontal: 5,

  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  viewMore: {
    color: "#007BFF",
    fontSize: 16,
  },
});

export default HomeBestOf;
