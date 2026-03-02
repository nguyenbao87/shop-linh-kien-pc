import React, { useState } from 'react'; // Nhớ thêm useState
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { colors } from '../constants/colors';
import RegisterModal from '../components/RegisterModal';

const loginSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập tên đăng nhập'),
  password: z.string().min(4, 'Mật khẩu phải có ít nhất 4 ký tự'),
});
type LoginFormData = z.infer<typeof loginSchema>;

const LoginScreen = ({ navigation }: any) => {
  // STATE ĐỂ BẬT/TẮT MODAL ĐĂNG KÝ
  const [isRegisterVisible, setRegisterVisible] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginFormData) => {
    // Kiểm tra tài khoản admin
    if (data.email === 'admin' && data.password === '1111') {
      console.log('Login successful:', data);
      navigation.replace('Home');
    } else {
      Alert.alert('Đăng nhập thất bại', 'Tài khoản hoặc mật khẩu không đúng!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Đăng Nhập</Text>

        {/* ... (Các ô nhập Email/Password giữ nguyên) ... */}
        
        {/* --- Copy lại phần input cũ vào đây nếu bạn lỡ xóa --- */}
        <View style={styles.inputGroup}>
           <Text style={styles.label}>Tên đăng nhập</Text>
           <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Nhập tên đăng nhập"
                onBlur={onBlur} onChangeText={onChange} value={value}
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
        </View>

        <View style={styles.inputGroup}>
           <Text style={styles.label}>Mật khẩu</Text>
           <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Nhập mật khẩu"
                onBlur={onBlur} onChangeText={onChange} value={value}
                secureTextEntry
              />
            )}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Đăng Nhập</Text>
        </TouchableOpacity>

        {/* --- DÒNG CHỮ ĐĂNG KÝ (MỚI) --- */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => setRegisterVisible(true)}>
            <Text style={styles.registerLink}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>

        {/* --- NHÚNG MODAL ĐĂNG KÝ VÀO ĐÂY (Nó ẩn mặc định) --- */}
        <RegisterModal 
          visible={isRegisterVisible} 
          onClose={() => setRegisterVisible(false)} 
        />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (Các style cũ giữ nguyên) ...
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  content: { padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.primary, marginBottom: 30, textAlign: 'center' },
  inputGroup: { marginBottom: 15 },
  label: { marginBottom: 5, fontWeight: '500', color: '#333' },
  input: { height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, backgroundColor: '#f9f9f9' },
  inputError: { borderColor: 'red', backgroundColor: '#fff0f0' },
  errorText: { color: 'red', fontSize: 12, marginTop: 5 },
  button: { backgroundColor: colors.primary, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  // Style cho phần Đăng ký mới
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: { color: '#666' },
  registerLink: { color: colors.primary, fontWeight: 'bold' },
});

export default LoginScreen;