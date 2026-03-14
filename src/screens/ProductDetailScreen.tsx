import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  Alert
} from 'react-native';
import { colors } from '../constants/colors';
import { PRODUCTS_DATA, ProductType, SpecItem, ReviewType } from '../data/products';
import { useCart } from '../context/CartContext';
import AddToCartModal from '../components/AddToCartModal';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 300;

const ProductDetailScreen = ({ route, navigation }: any) => {
  const { product } = route.params;
  const { addToCart } = useCart();
  
  // Lọc sản phẩm liên quan
  const relatedProducts = PRODUCTS_DATA.filter(item => item.id !== product.id);
  
  // State cho slide ảnh
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // State cho modal thêm vào giỏ hàng
  const [isAddToCartModalVisible, setAddToCartModalVisible] = useState(false);

  const onScrollChange = (nativeEvent: any) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== activeImageIndex) {
      setActiveImageIndex(slide);
    }
  };

  const handleAddToCart = () => {
    setAddToCartModalVisible(true);
  };

  const handleConfirmAddToCart = (quantity: number) => {
    addToCart(product, quantity);
    setAddToCartModalVisible(false);
    Alert.alert('Thành công', `Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  // --- CÁC HÀM RENDER (HIỂN THỊ) ---

  // 1. Hiển thị Bảng thông số kỹ thuật
  const renderSpecsTable = () => {
    if (!product.specs || product.specs.length === 0) return null;
    return (
      <View style={styles.specsContainer}>
        {product.specs.map((spec: SpecItem, index: number) => (
          <View 
            key={index} 
            style={[
              styles.specRow, 
              index % 2 === 0 ? styles.specRowEven : styles.specRowOdd
            ]}
          >
            <View style={styles.specLabelCol}>
              <Text style={styles.specLabelText}>{spec.label}</Text>
            </View>
            <View style={styles.specValueCol}>
              <Text style={styles.specValueText}>{spec.value}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  // 2. Hiển thị từng Đánh giá (Review) <-- ĐÂY LÀ PHẦN BẠN CẦN
  const renderReview = (review: ReviewType) => (
    <View key={review.id} style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUser}>{review.user}</Text>
        <Text style={styles.reviewRating}>{'⭐'.repeat(review.rating)}</Text>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );

  // 3. Hiển thị Item sản phẩm liên quan
  const renderRelatedItem = ({ item }: { item: ProductType }) => (
    <TouchableOpacity 
      style={styles.relatedCard}
      onPress={() => navigation.push('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.relatedImage} resizeMode="contain" />
      <Text style={styles.relatedName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.relatedPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* --- NÚT BACK (Chỉ mũi tên, không nền) --- */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/271/271220.png' }} 
          style={styles.backIcon} 
        />
      </TouchableOpacity>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} 
      >
        {/* A. SLIDE ẢNH */}
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => onScrollChange(nativeEvent)}
            scrollEventThrottle={16}
            style={styles.imageSlider}
          >
            {product.images.map((img: string, index: number) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.productImage}
                resizeMode="contain"
              />
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {product.images.map((_: any, index: number) => (
              <Text key={index} style={index === activeImageIndex ? styles.dotActive : styles.dot}>
                ⬤
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* B. TÊN & GIÁ */}
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
          <View style={styles.divider} />

          {/* C. THÔNG SỐ KỸ THUẬT */}
          <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>
          {renderSpecsTable()}
          <View style={styles.divider} />

          {/* D. MÔ TẢ */}
          <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.divider} />

          {/* E. ĐÁNH GIÁ (Đã thêm lại phần này) */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Đánh giá ({product.reviews ? product.reviews.length : 0})</Text>
          </View>
          
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((r: ReviewType) => renderReview(r))
          ) : (
            <Text style={{ color: colors.grayText, fontStyle: 'italic' }}>Chưa có đánh giá nào cho sản phẩm này.</Text>
          )}
          
          <View style={styles.divider} />

          {/* F. SẢN PHẨM KHÁC */}
          <Text style={styles.sectionTitle}>Sản phẩm khác</Text>
          <FlatList
            data={relatedProducts}
            horizontal
            renderItem={renderRelatedItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.btnCart} 
          onPress={handleAddToCart}
        >
          <Text style={styles.btnCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
        <View style={{ width: 12 }} /> 
        <TouchableOpacity 
          style={styles.btnBuy}
          onPress={() => Alert.alert('Thanh toán', 'Trang thanh toán đang phát triển ')}
        >
          <Text style={styles.btnBuyText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>

      {/* Modal thêm vào giỏ hàng */}
      <AddToCartModal
        visible={isAddToCartModalVisible}
        product={product}
        onClose={() => setAddToCartModalVisible(false)}
        onConfirm={handleConfirmAddToCart}
      />
    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  
  // Style Nút Back (Trong suốt)
  backButton: {
    position: 'absolute',
    top: 20,            
    left: 5,           
    zIndex: 10,         
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#1F2937', 
    resizeMode: 'contain',
  },

  // Slide ảnh
  imageSlider: { width: width, height: IMAGE_HEIGHT, backgroundColor: '#fff' },
  productImage: { width: width, height: IMAGE_HEIGHT },
  pagination: { flexDirection: 'row', position: 'absolute', bottom: 10, alignSelf: 'center' },
  dot: { color: '#D1D5DB', margin: 3, fontSize: 8 },
  dotActive: { color: colors.primary, margin: 3, fontSize: 8 },
  
  // Nội dung chung
  contentContainer: { padding: 16 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  price: { fontSize: 24, fontWeight: 'bold', color: '#DC2626', marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 12 },
  description: { fontSize: 15, color: '#4B5563', lineHeight: 24, textAlign: 'justify' },

  // Style Bảng thông số
  specsContainer: {
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden',
  },
  specRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  specRowEven: { backgroundColor: '#F9FAFB' },
  specRowOdd: { backgroundColor: 'white' },
  specLabelCol: { width: '40%', padding: 10, borderRightWidth: 1, borderRightColor: '#E5E7EB' },
  specValueCol: { flex: 1, padding: 10 },
  specLabelText: { fontSize: 14, fontWeight: '600', color: '#374151' },
  specValueText: { fontSize: 14, color: '#111827', fontWeight: '500' },

  // Style Đánh giá (Review)
  reviewItem: { 
    backgroundColor: '#F3F4F6', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 10 
  },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  reviewUser: { fontWeight: '600', color: '#374151' },
  reviewRating: { fontSize: 12 },
  reviewComment: { color: '#4B5563', fontSize: 14 },

  // Style Sản phẩm liên quan
  relatedCard: { width: 150, marginRight: 12, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 8 },
  relatedImage: { width: '100%', height: 100, marginBottom: 8 },
  relatedName: { fontSize: 13, color: '#374151', marginBottom: 4, height: 36 },
  relatedPrice: { fontSize: 14, fontWeight: 'bold', color: '#DC2626' },

  // Footer
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', padding: 16, backgroundColor: 'white',
    borderTopWidth: 1, borderTopColor: '#E5E7EB',
    shadowColor: "#000", shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 5,
  },
  btnCart: { flex: 1, backgroundColor: '#EFF6FF', borderWidth: 1, borderColor: colors.primary, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  btnCartText: { color: colors.primary, fontWeight: 'bold', fontSize: 16 },
  btnBuy: { flex: 1, backgroundColor: colors.primary, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  btnBuyText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default ProductDetailScreen;