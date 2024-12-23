import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface BannerItem {
  id: number;
  title: string;
  description: string;
  image: string;
  productId: number;
}

interface CarouselProps {
  data: BannerItem[];
  autoScrollInterval?: number;
}

const BannnerCarousel: React.FC<CarouselProps> = ({
  data,
  autoScrollInterval = 3000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const getAdjustedIndex = (index: number) => {
    if (data.length === 0) return 0;
    return index % data.length;
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const startAutoScroll = () => {
      if (data.length <= 1) return;

      intervalId = setInterval(() => {
        if (isAutoScrolling && flatListRef.current) {
          const nextIndex = getAdjustedIndex(activeIndex + 1);
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          setActiveIndex(nextIndex);
        }
      }, autoScrollInterval);
    };

    startAutoScroll();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [activeIndex, isAutoScrolling, data.length, autoScrollInterval]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setActiveIndex(getAdjustedIndex(index));
  };

  const onScrollBeginDrag = () => {
    setIsAutoScrolling(false);
  };

  const onScrollEndDrag = () => {
    setIsAutoScrolling(true);
  };

  const renderItem = ({ item }: { item: BannerItem }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {data.map((_, index) => {
          const inputRange = [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ];

          const dotWidth: Animated.AnimatedInterpolation<number> =
            scrollX.interpolate({
              inputRange,
              outputRange: [8, 16, 8],
              extrapolate: "clamp",
            });

          const opacity: Animated.AnimatedInterpolation<number> =
            scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: "clamp",
            });

          const scale: Animated.AnimatedInterpolation<number> =
            scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.2, 1],
              extrapolate: "clamp",
            });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                  transform: [{ scale }],
                  backgroundColor:
                    index === getAdjustedIndex(activeIndex)
                      ? "#ffffff"
                      : "rgba(255, 255, 255, 0.6)",
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: handleScroll,
    }
  );

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id.toString()}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        initialNumToRender={data.length}
        maxToRenderPerBatch={data.length}
        windowSize={3}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.6,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "white",
    fontSize: 14,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default BannnerCarousel;
