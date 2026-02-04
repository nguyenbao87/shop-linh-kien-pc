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
  Alert,
  Dimensions
} from 'react-native';
import { colors } from '../constants/colors';
import { PRODUCTS_DATA } from '../data/products';
// Dữ liệu giả lập (Linh kiện điện tử)

const HomeScreen = ({ navigation }: any) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Xử lý Đăng xuất
  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { 
        text: "Đồng ý", 
        onPress: () => navigation.replace('Login') // Quay về Login
      }
    ]);
  };

  // Component hiển thị từng món hàng (Item)
const renderProductItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.productCard}
      // Khi bấm, chuyển sang trang Detail và gửi kèm dữ liệu sản phẩm (item)
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      {/* Sửa lại chỗ này: dùng item.images[0] vì images giờ là mảng */}
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          {/* Thanh tìm kiếm */}
          <View style={styles.searchBar}>
            {/* Bạn có thể thay bằng Image icon kính lúp local */}
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png' }} 
              style={styles.searchIcon} 
            />
            <TextInput 
              style={styles.searchInput}
              placeholder="Tìm kiếm"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Nút Menu (3 gạch) */}
          <TouchableOpacity onPress={() => setMenuVisible(!isMenuVisible)}>
             {/* Bạn có thể thay bằng Image icon menu local */}
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/57/57162.png' }} 
              style={styles.menuIcon} 
            />
          </TouchableOpacity>
        </View>

        {/* --- MENU DROPDOWN (Hiện ra khi bấm 3 gạch) --- */}
        {isMenuVisible && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert("Thông báo", "Thông tin người dùng")}>
              <Text style={styles.menuText}>👤 Thông tin người dùng</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Text style={[styles.menuText, { color: colors.error }]}>🚪 Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* --- DANH SÁCH SẢN PHẨM --- */}
        <FlatList
          data={PRODUCTS_DATA}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          numColumns={2} // Chia làm 2 cột
          columnWrapperStyle={styles.row} // Style cho hàng ngang
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

      </View>
    </SafeAreaView>
  );
};

// --- STYLES ---
const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2; // Tính toán chiều rộng để chia đều 2 bên

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Nền xám nhạt cho nổi sản phẩm
  },
  container: {
    flex: 1,
    padding: 16,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 10, // Đảm bảo header nổi lên trên
  },
  searchBar: {
    flex: 1, // Chiếm hết chỗ trống
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 45,
    marginRight: 10, // Cách nút menu ra
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#9CA3AF',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: 'black',
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: '#374151',
  },
  // Dropdown Menu Styles
  menuDropdown: {
    position: 'absolute',
    top: 60, // Nằm ngay dưới header
    right: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 20, // Nổi cao nhất
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  // Product List Styles
  listContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between', // Đẩy 2 item ra 2 đầu
  },
  productCard: {
    width: itemWidth,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1, // Hình vuông (Chiều cao = Chiều rộng)
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary, // Dùng màu chủ đạo
  },
});

export default HomeScreen;