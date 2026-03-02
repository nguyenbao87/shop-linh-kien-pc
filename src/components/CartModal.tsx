import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

interface CartModalProps {
  visible: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ visible, onClose }) => {
  const { cartItems, updateQuantity, getTotalPrice } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Giỏ hàng trống', 'Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
      return;
    }
    Alert.alert('Thanh toán', 'Chức năng thanh toán đang được phát triển...');
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Giỏ hàng của bạn</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Danh sách sản phẩm */}
              {cartItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Giỏ hàng trống</Text>
                  <Text style={styles.emptySubtext}>Hãy thêm sản phẩm vào giỏ hàng!</Text>
                </View>
              ) : (
                <>
                  <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
                    {cartItems.map((item) => (
                      <View key={item.product.id} style={styles.cartItem}>
                        {/* Hình ảnh */}
                        <Image
                          source={{ uri: item.product.images[0] }}
                          style={styles.itemImage}
                          resizeMode="contain"
                        />

                        {/* Thông tin sản phẩm */}
                        <View style={styles.itemInfo}>
                          <Text style={styles.itemName} numberOfLines={2}>
                            {item.product.name}
                          </Text>
                          <Text style={styles.itemPrice}>{item.product.price}</Text>

                          {/* Điều chỉnh số lượng */}
                          <View style={styles.quantityContainer}>
                            <TouchableOpacity
                              style={styles.quantityButton}
                              onPress={() =>
                                handleQuantityChange(item.product.id, item.quantity - 1)
                              }
                            >
                              <Text style={styles.quantityButtonText}>−</Text>
                            </TouchableOpacity>

                            <TextInput
                              style={styles.quantityInput}
                              value={item.quantity.toString()}
                              onChangeText={(text) => {
                                const num = parseInt(text);
                                if (!isNaN(num) && num >= 0) {
                                  handleQuantityChange(item.product.id, num);
                                } else if (text === '') {
                                  handleQuantityChange(item.product.id, 0);
                                }
                              }}
                              keyboardType="number-pad"
                              selectTextOnFocus
                            />

                            <TouchableOpacity
                              style={styles.quantityButton}
                              onPress={() =>
                                handleQuantityChange(item.product.id, item.quantity + 1)
                              }
                            >
                              <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))}
                  </ScrollView>

                  {/* Footer với tổng tiền và nút thanh toán */}
                  <View style={styles.footer}>
                    <View style={styles.totalContainer}>
                      <Text style={styles.totalLabel}>Tổng cộng:</Text>
                      <Text style={styles.totalPrice}>{formatPrice(getTotalPrice())}</Text>
                    </View>
                    <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                      <Text style={styles.checkoutButtonText}>Tiến hành thanh toán</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: width * 0.9,
    maxHeight: height * 0.8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    fontSize: 24,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  itemsContainer: {
    maxHeight: height * 0.5,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: 'white',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: 'bold',
  },
  quantityInput: {
    width: 65,
    height: 28,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    marginHorizontal: 8,
    paddingHorizontal: 6,
    paddingVertical: 0,
    color: '#1F2937',
    fontWeight: '600',
    backgroundColor: 'white',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartModal;
