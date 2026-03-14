import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Text,
} from 'react-native';
import { BANNERS_DATA } from '../data/banners';
import { colors } from '../constants/colors';

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 180;
const AUTO_PLAY_INTERVAL = 3000;
const BANNER_PADDING = 16;

const BannerCarousel = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const totalBanners = BANNERS_DATA.length;
  
  // Tạo array với duplicate để tạo infinite loop
  // [lastBanner, ...allBanners, firstBanner]
  const extendedBanners = [
    BANNERS_DATA[totalBanners - 1], // Banner cuối thêm vào đầu
    ...BANNERS_DATA,                  // Tất cả banners
    BANNERS_DATA[0]                   // Banner đầu thêm vào cuối
  ];

  // Scroll về vị trí đúng khi component mount
  useEffect(() => {
    // Scroll to the first real banner (index 1 in extendedBanners)
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: width,
        animated: false,
      });
    }, 0);
  }, []);

  // Xử lý khi scroll để cập nhật index
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    
    // Tính real index (không tính banner duplicate)
    let realIndex = currentIndex - 1; // Trừ 1 vì banner đầu là duplicate
    if (realIndex < 0) realIndex = totalBanners - 1;
    if (realIndex >= totalBanners) realIndex = 0;
    
    setActiveIndex(realIndex);
  };

  // Xử lý khi kết thúc scroll để tạo infinite loop
  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    
    // Nếu ở banner duplicate đầu tiên (index 0), jump về banner thật cuối
    if (currentIndex === 0) {
      scrollViewRef.current?.scrollTo({
        x: totalBanners * width,
        animated: false,
      });
      setActiveIndex(totalBanners - 1);
    }
    // Nếu ở banner duplicate cuối cùng (index = totalBanners + 1), jump về banner thật đầu
    else if (currentIndex === totalBanners + 1) {
      scrollViewRef.current?.scrollTo({
        x: width,
        animated: false,
      });
      setActiveIndex(0);
    }
  };

  // Auto-play
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [activeIndex]);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayTimerRef.current = setTimeout(() => {
      // Tính scroll index hiện tại (activeIndex + 1 vì có duplicate ở đầu)
      const currentScrollIndex = activeIndex + 1;
      const nextScrollIndex = currentScrollIndex + 1;
      
      // Scroll tới vị trí tiếp theo
      scrollViewRef.current?.scrollTo({
        x: nextScrollIndex * width,
        animated: true,
      });
    }, AUTO_PLAY_INTERVAL);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };

  return (
    <View style={styles.outerContainer}>
      
      <View style={styles.container}>
        {/* Carousel ScrollView */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
          onTouchStart={stopAutoPlay}
          onTouchEnd={startAutoPlay}
          nestedScrollEnabled={true}
          scrollEnabled={true}
          directionalLockEnabled={true}
          decelerationRate="fast"
          snapToInterval={width}
          snapToAlignment="center"
        >
          {extendedBanners.map((banner, index) => (
            <View key={`banner-${index}`} style={styles.bannerSlide}>
              <View style={styles.bannerWrapper}>
                <Image
                  source={{ uri: banner.image }}
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {BANNERS_DATA.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
      
      {/* Tiêu đề "Sản phẩm" */}
      <Text style={styles.sectionTitle}>SẢN PHẨM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
    textDecorationStyle: 'solid',
  },
  container: {
    marginBottom: 16,
  },
  bannerSlide: {
    width: width,
    height: BANNER_HEIGHT,
    paddingHorizontal: BANNER_PADDING,
  },
  bannerWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
  },
  dot: {
    marginHorizontal: 4,
    borderRadius: 10,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    width: 24,
    height: 10,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default BannerCarousel;
