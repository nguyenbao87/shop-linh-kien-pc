// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  Platform, 
  Alert, 
  StyleSheet,
  ScrollView // Thêm ScrollView để cuộn được trên màn hình nhỏ
} from 'react-native';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { colors } from '../constants/colors';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({
    username: '', // Lỗi của ô username
    password: ''  // Lỗi của ô password
  });

  const handleLogin = () => {
    // 2. Reset lỗi cũ trước khi kiểm tra
    let newErrors = { username: '', password: '' };
    let hasError = false;

    // 3. Đặt điều kiện kiểm tra (Validation)
    if (username.trim() === '') {
      newErrors.username = 'Vui lòng nhập tên đăng nhập';
      hasError = true;
    }

    if (password.trim() === '') {
      newErrors.password = 'Vui lòng nhập mật khẩu';
      hasError = true;
    }
    setErrors(newErrors);

    // 4. Nếu có lỗi thì DỪNG LẠI (return), không chạy code login bên dưới nữa
    if (hasError) {
      return; 
    }
    setIsLoading(true);
    setTimeout(() => {
setIsLoading(false);
      
      // KIỂM TRA TÀI KHOẢN VÀ MẬT KHẨU
      if (username === 'admin' && password === '1111') {
        // Chuyển sang trang Home và không cho quay lại Login bằng nút Back (replace)
        navigation.replace('Home'); 
      } else {
        // Nếu sai thì báo lỗi
        Alert.alert("Lỗi đăng nhập", "Tài khoản hoặc mật khẩu không đúng!");
      }
      
    }, 1000); // Đợi 1 giây cho cảm giác loading
  };

  const handleGoogleLogin = () => {
    Alert.alert("Thông báo", "Chức năng đăng nhập bằng Google đang được phát triển.");
    };
  const handlePhoneLogin = () => {
    Alert.alert("Thông báo", "Chức năng đăng nhập bằng Số điện thoại đang được phát triển.");
    };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          
          {/* TIÊU ĐỀ */}
          <Text style={styles.title}>Shopbi</Text>

          {/* INPUT FORM */}
          {/* 5. Truyền lỗi vào component */}
          <CustomInput 
            label="Tên đăng nhập"
            placeholder="Nhập email hoặc tài khoản"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setErrors({...errors, username: ''});
            }}
            errorText={errors.username}
          />

          <CustomInput 
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            isPassword={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors({...errors, password: ''});
            }}
            errorText={errors.password}
          />
          {/* QUÊN MẬT KHẨU */}
          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          {/* NÚT ĐĂNG NHẬP */}
          <CustomButton 
            title="Đăng nhập" 
            onPress={handleLogin} 
            isLoading={isLoading}
          />
          

          {/* PHÂN CÁCH (Hoặc) */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Hoặc đăng nhập với</Text>
            <View style={styles.line} />
          </View>

          {/* CÁC NÚT SOCIAL */}
          <CustomButton 
            title="📱 Số điện thoại" 
            onPress={handlePhoneLogin}
            borderColor='gray' 
            bgColor='white'
            textColor='black'
          />
          
          <CustomButton
            title="🌐 Google" 
            onPress={handleGoogleLogin}
            borderColor='gray'
            bgColor='white'
            textColor='black'
          />

          {/* APPLE ID (Chỉ hiện trên iOS) */}
          {Platform.OS === 'ios' && (
            <TouchableOpacity style={styles.appleButton}>
              <Text style={styles.appleText}> Apple ID</Text>
            </TouchableOpacity>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ĐỊNH NGHĨA STYLE
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24, // Padding bao quanh màn hình
    justifyContent: 'center', // Căn giữa nội dung theo chiều dọc
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 40, // Cách form nhập liệu 40 đơn vị
  },
  forgotButton: {
    alignSelf: 'flex-end', // Căn phải
    marginBottom: 24,
  },
  forgotText: {
    color: colors.primary,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row', // Xếp ngang
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1, // Chiếm hết khoảng trống còn lại
    height: 1,
    backgroundColor: colors.grayBorder,
  },
  dividerText: {
    marginHorizontal: 16, // Cách 2 đường kẻ 2 bên
    color: colors.grayText,
  },
  appleButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'black', // Nút Apple màu đen
  },
  appleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;