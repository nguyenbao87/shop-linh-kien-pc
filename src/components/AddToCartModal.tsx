import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ProductType } from '../data/products';
import { colors } from '../constants/colors';

const { width } = Dimensions.get('window');

interface AddToCartModalProps {
  visible: boolean;
  product: ProductType | null;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  visible,
  product,
  onClose,
  onConfirm,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleClose = () => {
    setQuantity(1); // Reset về 1
    onClose();
  };

  const handleConfirm = () => {
    onConfirm(quantity);
    setQuantity(1); // Reset về 1
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (text: string) => {
    const num = parseInt(text);
    if (!isNaN(num) && num >= 1) {
      setQuantity(num);
    } else if (text === '') {
      setQuantity(1);
    }
  };

  if (!product) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.contentContainer}>
                {/* Hình ảnh sản phẩm bên trái */}
                <Image
                  source={{ uri: product.images[0] }}
                  style={styles.productImage}
                  resizeMode="contain"
                />

                {/* Thông tin bên phải */}
                <View style={styles.infoContainer}>
                  {/* Giá */}
                  <Text style={styles.price}>{product.price}</Text>

                  {/* Số lượng */}
                  <View style={styles.quantityContainer}>
                    <Text style={styles.quantityLabel}>Số lượng:</Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={decreaseQuantity}
                      >
                        <Text style={styles.quantityButtonText}>−</Text>
                      </TouchableOpacity>

                      <TextInput
                        style={styles.quantityInput}
                        value={quantity.toString()}
                        onChangeText={handleQuantityChange}
                        keyboardType="number-pad"
                        selectTextOnFocus
                      />

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={increaseQuantity}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* Nút xác nhận */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmButtonText}>Thêm vào giỏ</Text>
                </TouchableOpacity>
              </View>
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
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    minHeight: '33%',
    maxHeight: '40%',
  },
  contentContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 16,
  },
  quantityContainer: {
    marginTop: 8,
  },
  quantityLabel: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#374151',
    fontWeight: 'bold',
  },
  quantityInput: {
    width: 80,
    height: 36,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    paddingVertical: 0,
    color: '#1F2937',
    fontWeight: '600',
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddToCartModal;
