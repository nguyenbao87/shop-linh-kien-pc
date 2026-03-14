import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { colors } from '../constants/colors';
import { PRODUCTS_DATA, ProductType, CATEGORY_BRANDS } from '../data/products';
import {useCart } from '../context/CartContext';
import CartModal from '../components/CartModal';
import BannerCarousel from '../components/BannerCarousel';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2.2;

// Danh mục với tiêu đề tiếng Việt
const CATEGORY_CONFIG = [
  { id: 'cpu', name: 'Vi xử lý CPU', icon: '🖥️' },
  { id: 'vga', name: 'Card màn hình', icon: '🎮' },
  { id: 'ram', name: 'RAM Bộ nhớ', icon: '💾' },
  { id: 'ssd', name: 'Ổ cứng SSD', icon: '💿' },
  { id: 'monitor', name: 'Màn hình', icon: '🖥️' },
  { id: 'mouse', name: 'Chuột', icon: '🖱️' },
  { id: 'keyboard', name: 'Bàn phím', icon: '⌨️' },
  { id: 'headphone', name: 'Tai nghe', icon: '🎧' },
  { id: 'psu', name: 'Nguồn PSU', icon: '⚡' },
  { id: 'hdd', name: 'Ổ cứng HDD', icon: '💽' },
];

const CATEGORY_NAME_MAP = CATEGORY_CONFIG.reduce<Record<string, string>>((acc, category) => {
  acc[category.id] = category.name;
  return acc;
}, {});

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const isProductMatchKeyword = (product: ProductType, keyword: string) => {
  const normalizedKeyword = normalizeText(keyword);

  if (!normalizedKeyword) return true;

  const searchableFields = [
    product.name,
    product.brand,
    product.category,
    CATEGORY_NAME_MAP[product.category] || '',
    product.description,
  ].map(normalizeText);

  return searchableFields.some(field => field.includes(normalizedKeyword));
};

const HomeScreen = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { getTotalItems } = useCart();
  
  const [isUserMenuVisible, setUserMenuVisible] = useState(false);
  const [isCartModalVisible, setCartModalVisible] = useState(false);

  const searchSuggestions = useMemo(() => {
    const keyword = searchText.trim();
    if (!keyword) return [];

    return PRODUCTS_DATA.filter(product => isProductMatchKeyword(product, keyword)).slice(0, 5);
  }, [searchText]);

  const handleSubmitSearch = () => {
    const keyword = searchText.trim();
    if (!keyword) return;

    const matchedProducts = PRODUCTS_DATA.filter(product => isProductMatchKeyword(product, keyword));
    setIsSearchFocused(false);
    navigation.navigate('ProductList', {
      products: matchedProducts,
      title: `Kết quả cho "${keyword}"`,
    });
  };

  const handleSelectSuggestion = (product: ProductType) => {
    setSearchText('');
    setIsSearchFocused(false);
    navigation.navigate('ProductDetail', { product });
  };

  // Lấy sản phẩm nổi bật (rating 5 sao)
  const featuredProducts = PRODUCTS_DATA.filter(p => p.rating === 5);

  // Hàm render sản phẩm ngang
  const renderProductItem = ({ item }: { item: ProductType }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        {item.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  // Hàm render brand box
  const renderBrandBox = (brand: string, category: string) => (
    <TouchableOpacity 
      key={brand}
      style={styles.brandBox}
      onPress={() => {
        // Navigate to filtered products screen
        const filteredProducts = PRODUCTS_DATA.filter(
          p => p.category === category && p.brand === brand
        );
        navigation.navigate('ProductList', { 
          products: filteredProducts,
          title: `${brand} - ${CATEGORY_CONFIG.find(c => c.id === category)?.name}`
        });
      }}
    >
      <Text style={styles.brandText}>{brand}</Text>
    </TouchableOpacity>
  );

  // Hàm render mỗi category section
  const renderCategorySection = (categoryId: string, categoryName: string, icon: string) => {
    const products = PRODUCTS_DATA.filter(p => p.category === categoryId);
    const brands = CATEGORY_BRANDS[categoryId] || [];
    
    if (products.length === 0) return null;

    return (
      <View key={categoryId} style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>{icon} {categoryName}</Text>
          <TouchableOpacity 
            onPress={() => {
              // Xem tất cả sản phẩm của category
              navigation.navigate('ProductList', { 
                products: products,
                title: categoryName
              });
            }}
          >
            <Text style={styles.seeAllText}>Xem tất cả →</Text>
          </TouchableOpacity>
        </View>

        {/* Brands Row */}
        {brands.length > 0 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.brandsRow}
          >
            {brands.map(brand => renderBrandBox(brand, categoryId))}
          </ScrollView>
        )}

        {/* Products Row */}
        <FlatList
          horizontal
          data={products}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsRow}
        />
      </View>
    );
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    setUserMenuVisible(false);
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đồng ý", onPress: () => navigation.replace('Login') }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
            <Text style={styles.logoText}>🛒 BPTECH</Text>
          </TouchableOpacity>

          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png' }} 
                style={styles.searchIcon} 
              />
              <TextInput 
                style={styles.searchInput}
                placeholder="Tìm linh kiện..."
                value={searchText}
                onChangeText={setSearchText}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
                onSubmitEditing={handleSubmitSearch}
                returnKeyType="search"
              />
            </View>

            {isSearchFocused && searchText.trim().length > 0 && (
              <View style={styles.suggestionDropdown}>
                {searchSuggestions.length > 0 ? (
                  searchSuggestions.map(product => (
                    <TouchableOpacity
                      key={product.id}
                      style={styles.suggestionItem}
                      activeOpacity={0.85}
                      onPress={() => handleSelectSuggestion(product)}
                    >
                      <View style={styles.suggestionInfo}>
                        <Text style={styles.suggestionName} numberOfLines={2}>{product.name}</Text>
                        <Text style={styles.suggestionPrice}>{product.price}</Text>
                      </View>
                      <Image source={{ uri: product.images[0] }} style={styles.suggestionImage} />
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.suggestionEmpty}>Không có gợi ý, nhấn Enter để tìm tất cả kết quả liên quan.</Text>
                )}
              </View>
            )}
          </View>

          <TouchableOpacity onPress={() => setUserMenuVisible(!isUserMenuVisible)}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }} 
              style={styles.iconButton} 
            />
          </TouchableOpacity>
        </View>

        {/* --- USER MENU DROPDOWN --- */}
        {isUserMenuVisible && (
          <View style={styles.userDropdown}>
            <TouchableOpacity style={styles.userMenuItem} onPress={() => {
              setUserMenuVisible(false);
              navigation.navigate('UserProfile');
            }}>
              <Text style={styles.userMenuText}>👤 Thông tin</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.userMenuItem} onPress={handleLogout}>
              <Text style={[styles.userMenuText, { color: colors.error }]}>🚪 Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* --- MAIN CONTENT --- */}
        <ScrollView 
          style={styles.mainContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Banner */}
          <BannerCarousel />

          {/* Featured Products Section */}
          {featuredProducts.length > 0 && (
            <View style={styles.featuredSection}>
              <View style={styles.categoryHeader}>
                <Text style={styles.featuredTitle}>⭐ Sản phẩm nổi bật</Text>
              </View>
              <FlatList
                horizontal
                data={featuredProducts}
                renderItem={renderProductItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsRow}
              />
            </View>
          )}

          {/* Categories Sections */}
          {CATEGORY_CONFIG.map(cat => 
            renderCategorySection(cat.id, cat.name, cat.icon)
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* --- FLOATING CART BUTTON --- */}
        <TouchableOpacity
          style={styles.floatingCartButton}
          onPress={() => setCartModalVisible(true)}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/263/263142.png' }}
            style={styles.cartIcon}
          />
          {getTotalItems() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* --- CART MODAL --- */}
        <CartModal
          visible={isCartModalVisible}
          onClose={() => setCartModalVisible(false)}
        />

      </View>
    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  container: { flex: 1 },
  
  // Header
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  iconButton: { width: 30, height: 30, tintColor: '#374151' },

  searchContainer: {
    flex: 1,
    marginHorizontal: 12,
    position: 'relative',
    zIndex: 30,
  },
  
  searchBar: { 
    flexDirection: 'row', 
    backgroundColor: '#F3F4F6', 
    borderRadius: 8, 
    alignItems: 'center', 
    paddingHorizontal: 10, 
    height: 40,
  },
  searchIcon: { width: 18, height: 18, tintColor: '#9CA3AF', marginRight: 8 },
  searchInput: { flex: 1, height: '100%', color: 'black', fontSize: 14 },

  suggestionDropdown: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 50,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  suggestionInfo: {
    flex: 1,
    paddingRight: 10,
  },
  suggestionName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  suggestionPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  suggestionImage: {
    width: 46,
    height: 46,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  suggestionEmpty: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: '#6B7280',
    fontSize: 13,
  },

  // User Dropdown
  userDropdown: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 180,
    zIndex: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 5,
  },
  userMenuItem: { paddingVertical: 12, paddingHorizontal: 10 },
  userMenuText: { fontSize: 15, color: '#374151', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#E5E7EB' },

  // Main Content
  mainContent: { flex: 1 },

  // Featured Section
  featuredSection: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF9E6',
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F59E0B',
  },

  // Category Section
  categorySection: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },

  // Brands Row
  brandsRow: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  brandBox: {
    width: 70,
    height: 30,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  brandText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
  },

  // Products Row
  productsRow: {
    paddingHorizontal: 16,
  },
  productCard: {
    width: itemWidth,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  productInfo: {
    padding: 10,
  },
  productBrand: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
    marginBottom: 2,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    minHeight: 36,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 11,
    color: '#F59E0B',
    fontWeight: '600',
  },

  // Floating Cart Button
  floatingCartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    zIndex: 100,
  },
  cartIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#DC2626',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
