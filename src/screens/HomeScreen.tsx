import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { colors } from '../constants/colors';
import { PRODUCTS_DATA, ProductType } from '../data/products';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2;

// Danh mục lọc (Sidebar bên trái)
const CATEGORIES = [
  { id: 'all', name: '🏠 Trang chủ' },
  { id: 'ram', name: 'RAM Bộ nhớ' },
  { id: 'ssd', name: 'Ổ cứng SSD' },
  { id: 'hdd', name: 'Ổ cứng HDD' },
  { id: 'cpu', name: 'Vi xử lý CPU' },
  { id: 'vga', name: 'Card màn hình' },
  { id: 'psu', name: 'Nguồn PSU' },
];

const HomeScreen = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState('');
  
  // 1. QUẢN LÝ SIDEBAR (BÊN TRÁI - LỌC)
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 2. QUẢN LÝ USER MENU (BÊN PHẢI - ĐĂNG XUẤT)
  const [isUserMenuVisible, setUserMenuVisible] = useState(false);

  // --- LOGIC LỌC SẢN PHẨM ---
  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(item => item.category === selectedCategory);

  const finalProducts = filteredProducts.filter(item => 
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const currentCategoryName = CATEGORIES.find(c => c.id === selectedCategory)?.name || '';

  // Hàm chọn danh mục (Sidebar)
  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
    setSideMenuVisible(false); // Đóng sidebar
  };

  // Hàm xử lý đăng xuất (User Menu)
  const handleLogout = () => {
    setUserMenuVisible(false);
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đồng ý", onPress: () => navigation.replace('Login') }
    ]);
  };

  const renderProductItem = ({ item }: { item: ProductType }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Khi mở Sidebar hoặc User Menu thì bấm ra ngoài sẽ đóng lại */}
      <TouchableWithoutFeedback onPress={() => setUserMenuVisible(false)}>
        <View style={styles.container}>
          
          {/* --- 1. HEADER (3 PHẦN: MENU TRÁI - TÌM KIẾM - USER PHẢI) --- */}
          <View style={styles.header}>
            
            {/* A. Nút Menu Trái (Mở Sidebar Lọc) */}
            <TouchableOpacity onPress={() => setSideMenuVisible(true)}>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/57/57162.png' }} 
                style={styles.iconButton} 
              />
            </TouchableOpacity>

            {/* B. Thanh tìm kiếm (Ở giữa) */}
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
              />
            </View>

            {/* C. Nút User Phải (Mở Menu Đăng xuất) */}
            <TouchableOpacity onPress={() => setUserMenuVisible(!isUserMenuVisible)}>
              <Image 
                // Icon người dùng (Avatar)
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }} 
                style={styles.iconButton} 
              />
            </TouchableOpacity>
          </View>

          {/* --- MENU USER DROPDOWN (Hiện khi bấm nút phải) --- */}
          {isUserMenuVisible && (
            <View style={styles.userDropdown}>
              <TouchableOpacity style={styles.userMenuItem} onPress={() => {
        setUserMenuVisible(false); // Đóng menu trước
        navigation.navigate('UserProfile'); // Chuyển trang
      }}>
                <Text style={styles.userMenuText}>👤 Thông tin</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.userMenuItem} onPress={handleLogout}>
                <Text style={[styles.userMenuText, { color: colors.error }]}>🚪 Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* --- 2. TIÊU ĐỀ DANH MỤC (Khi lọc) --- */}
          {selectedCategory !== 'all' && (
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{currentCategoryName.replace(/🏠|💾|🖥️/g, '').trim()}</Text>
              <TouchableOpacity onPress={() => setSelectedCategory('all')}>
                <Text style={styles.clearFilterText}>Xóa lọc ✕</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* --- 3. DANH SÁCH SẢN PHẨM --- */}
          <FlatList
            data={finalProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào.</Text>
            }
          />

          {/* --- 4. SIDEBAR MENU (MODAL BÊN TRÁI) --- */}
          <Modal
            visible={isSideMenuVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setSideMenuVisible(false)}
          >
            <TouchableOpacity 
              style={styles.modalOverlay} 
              activeOpacity={1} 
              onPress={() => setSideMenuVisible(false)}
            >
              <TouchableWithoutFeedback>
                <View style={styles.sidebarContainer}>
                  
                  {/* Sidebar Header */}
                  <View style={styles.sidebarHeader}>
                    <Text style={styles.sidebarTitle}>Danh mục</Text>
                    <TouchableOpacity onPress={() => setSideMenuVisible(false)}>
                      <Text style={styles.closeMenuText}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  {/* List Danh mục */}
                  {CATEGORIES.map((cat) => (
                    <TouchableOpacity 
                      key={cat.id} 
                      style={[
                        styles.sidebarItem,
                        selectedCategory === cat.id && styles.sidebarItemActive
                      ]}
                      onPress={() => handleSelectCategory(cat.id)}
                    >
                      <Text style={[
                        styles.sidebarText,
                        selectedCategory === cat.id && styles.sidebarTextActive
                      ]}>
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  ))}

                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>

        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  container: { flex: 1, padding: 16 },
  
  // Header Styles
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', // Chia đều khoảng cách
    marginBottom: 16 
  },
  iconButton: { width: 30, height: 30, tintColor: '#374151' },
  
  searchBar: { 
    flex: 1, // Chiếm hết phần giữa
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderRadius: 8, 
    alignItems: 'center', 
    paddingHorizontal: 10, 
    height: 40, 
    borderWidth: 1, 
    borderColor: '#E5E7EB',
    marginHorizontal: 12 // Cách 2 nút 2 bên ra
  },
  searchIcon: { width: 18, height: 18, tintColor: '#9CA3AF', marginRight: 8 },
  searchInput: { flex: 1, height: '100%', color: 'black', fontSize: 14 },

  // User Dropdown (Menu phải)
  userDropdown: {
    position: 'absolute',
    top: 60, // Nằm dưới header
    right: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 180,
    zIndex: 20, // Nổi lên trên cùng
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

  // Danh mục Header
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 4 },
  categoryTitle: { fontSize: 24, fontWeight: 'bold', color: colors.primary, textTransform: 'uppercase' },
  clearFilterText: { color: '#6B7280', fontSize: 14 },

  // Grid Sản phẩm
  listContent: { paddingBottom: 20 },
  row: { justifyContent: 'space-between' },
  productCard: { width: itemWidth, backgroundColor: 'white', borderRadius: 12, marginBottom: 16, overflow: 'hidden', shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  productImage: { width: '100%', aspectRatio: 1, resizeMode: 'contain', backgroundColor: '#fff' }, 
  productInfo: { padding: 10 },
  productName: { fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 4 },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: colors.primary },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#6B7280' },

  // --- STYLE SIDEBAR (MENU TRÁI) ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  sidebarContainer: {
    width: width * 0.75, 
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  sidebarHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 20, marginTop: 10, paddingBottom: 15,
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  sidebarTitle: { fontSize: 22, fontWeight: 'bold', color: '#1F2937' },
  closeMenuText: { fontSize: 24, color: '#6B7280', fontWeight: 'bold' },
  
  sidebarItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  sidebarItemActive: { backgroundColor: '#EFF6FF', borderRadius: 8, paddingHorizontal: 10, borderBottomWidth: 0 },
  sidebarText: { fontSize: 16, color: '#374151', fontWeight: '500' },
  sidebarTextActive: { color: colors.primary, fontWeight: 'bold' },
});

export default HomeScreen;