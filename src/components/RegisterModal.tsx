import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { colors } from '../constants/colors';

// --- 1. ĐỊNH NGHĨA SCHEMA VALIDATION (ZOD) ---
const registerSchema = z.object({
  fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  
  // Logic validate Ngày sinh phức tạp
  dob: z.string()
    // Kiểm tra định dạng cơ bản dd/mm/yyyy
    .regex(/^([0-2][0-9]|(3)[0-1])\/((0)[0-9]|(1)[0-2])\/\d{4}$/, 'Định dạng phải là dd/mm/yyyy (VD: 01/01/2000)')
    .refine((dateString) => {
      // Phân tách ngày, tháng, năm
      const [day, month, year] = dateString.split('/').map(Number);
      const currentYear = new Date().getFullYear();

      // Kiểm tra năm không quá hiện tại
      if (year > currentYear) return false;
      if (year < 1900) return false; // Giới hạn năm quá cũ

      // Kiểm tra tính hợp lệ của ngày trong tháng (VD: 30/02 là sai)
      const dateObject = new Date(year, month - 1, day);
      return (
        dateObject.getFullYear() === year &&
        dateObject.getMonth() === month - 1 &&
        dateObject.getDate() === day
      );
    }, { message: 'Ngày tháng năm không tồn tại hoặc lớn hơn năm hiện tại' }),

  email: z.string().email('Email không đúng định dạng'),
  
  phone: z.string()
    .regex(/^(0)(3|5|7|8|9)([0-9]{8})$/, 'Số điện thoại VN không hợp lệ (10 số, đầu 03,05...)'),
    
  address: z.string().min(5, 'Địa chỉ phải chi tiết hơn (tối thiểu 5 ký tự)'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
}

const RegisterModal = ({ visible, onClose }: RegisterModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onRegisterSubmit = (data: RegisterFormData) => {
    console.log('Thông tin đăng ký:', data);
    Alert.alert('Thành công', 'Đăng ký tài khoản thành công! Vui lòng đăng nhập.', [
      { 
        text: 'OK', 
        onPress: () => {
          reset(); // Xóa trắng form
          onClose(); // Đóng modal
        } 
      }
    ]);
  };

  // Component render ô nhập liệu để tái sử dụng
  const renderInput = (name: keyof RegisterFormData, label: string, placeholder: string, keyboardType: any = 'default') => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label} <Text style={{color: 'red'}}>*</Text></Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors[name] && styles.inputError]}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
          />
        )}
      />
      {errors[name] && <Text style={styles.errorText}>{errors[name]?.message}</Text>}
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true} // Để nhìn xuyên thấu nền tối phía sau
      animationType="slide" // Hiệu ứng trượt từ dưới lên
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.modalContent}>
            
            {/* Header Modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Đăng Ký Tài Khoản</Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20}}>
              {renderInput('fullName', 'Họ và tên', 'Nguyễn Văn A')}
              {renderInput('dob', 'Ngày sinh (dd/mm/yyyy)', '01/01/2000', 'numeric')}
              {renderInput('phone', 'Số điện thoại', '0901234567', 'phone-pad')}
              {renderInput('email', 'Email', 'example@gmail.com', 'email-address')}
              {renderInput('address', 'Địa chỉ', 'Số nhà, đường, phường...')}

              <TouchableOpacity 
                style={styles.submitButton} 
                onPress={handleSubmit(onRegisterSubmit)}
              >
                <Text style={styles.submitButtonText}>Đăng Ký Ngay</Text>
              </TouchableOpacity>
            </ScrollView>

          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Nền đen mờ 50%
    justifyContent: 'center',
    padding: 20,
  },
  keyboardView: { flex: 1, justifyContent: 'center' },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    maxHeight: '85%', // Không cho modal cao quá màn hình
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
    borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: colors.primary },
  closeButton: { fontSize: 24, color: '#999', fontWeight: 'bold' },
  
  // Input Styles
  inputGroup: { marginBottom: 12 },
  label: { marginBottom: 5, fontWeight: '500', color: '#333' },
  input: {
    height: 45, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, backgroundColor: '#f9f9f9'
  },
  inputError: { borderColor: 'red', backgroundColor: '#fff5f5' },
  errorText: { color: 'red', fontSize: 11, marginTop: 2 },

  // Button Styles
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10
  },
  submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default RegisterModal;