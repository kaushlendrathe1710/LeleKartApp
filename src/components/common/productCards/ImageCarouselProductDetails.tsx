import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  StatusBar,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;

const ImageCarousel = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [fullScreenIndex, setFullScreenIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState([]);
  const flatListRef = useRef<FlatList>(null);
  const fullScreenFlatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (modalVisible && images.length > 0) {
      const preload = images.map((uri) => Image.prefetch(uri));
      Promise.all(preload).then(() => {
        setPreloadedImages(images);
      });
    }
  }, [modalVisible, images]);

  if (!images || !Array.isArray(images) || images.length === 0) {
    return null;
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setFullScreenIndex(index);
        setModalVisible(true);
      }}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
  );

  const renderFullScreenItem = ({ item }) => (
    <View style={styles.fullScreenImageContainer}>
      <Image
        source={{ uri: item }}
        style={styles.fullScreenImage}
        resizeMode="contain"
      />
    </View>
  );

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / WINDOW_WIDTH);
    setActiveIndex(index);
  };

  const handleFullScreenScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / WINDOW_WIDTH);
    setFullScreenIndex(index);
  };

  const Pagination = ({ currentIndex, items }) => {
    if (items.length <= 1) return null;

    return (
      <View style={styles.paginationContainer}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    );
  };

  const scrollToIndex = (index: number) => {
    if (fullScreenFlatListRef.current) {
      fullScreenFlatListRef.current.scrollToIndex({
        index,
        animated: false,
      });
    }
  };

  if (images.length === 1) {
    return (
      <View style={styles.container}>
        <View
          style={{ borderRadius: 30, overflow: "hidden", }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: images[0] }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.fullScreenImageWrapper}>
              <Image
                source={{ uri: images[0] }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{ borderRadius: 30, overflow: "hidden",}}
      >
        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          keyExtractor={(item, index) => index.toString()}
          bounces={images.length > 1}
          scrollEnabled={images.length > 1}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
        />
        <Pagination currentIndex={activeIndex} items={images} />
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
        onShow={() => scrollToIndex(fullScreenIndex)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.fullScreenImageWrapper}>
            <FlatList
              ref={fullScreenFlatListRef}
              data={images}
              renderItem={renderFullScreenItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleFullScreenScroll}
              keyExtractor={(item, index) => index.toString()}
              initialScrollIndex={fullScreenIndex}
              getItemLayout={(data, index) => ({
                length: WINDOW_WIDTH,
                offset: WINDOW_WIDTH * index,
                index,
              })}
              bounces={images.length > 1}
              scrollEnabled={images.length > 1}
              initialNumToRender={3}
              maxToRenderPerBatch={3}
              windowSize={5}
              removeClippedSubviews={false}
              decelerationRate="fast"
            />
          </View>

          <Pagination currentIndex={fullScreenIndex} items={images} />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  image: {
    width: WINDOW_WIDTH,
    height: 300,
  },
  modalContainer: {
    marginTop: -60,
    flex: 1,
    backgroundColor: "black",
  },
  fullScreenImageContainer: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT - STATUS_BAR_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  fullScreenImageWrapper: {
    flex: 1,
    marginTop: STATUS_BAR_HEIGHT,
  },
  fullScreenImage: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT - STATUS_BAR_HEIGHT * 2,
  },
  closeButton: {
    position: "absolute",
    top: STATUS_BAR_HEIGHT + 10,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(211, 209, 209, 0.9)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "grey",
  },
});

export default ImageCarousel;
