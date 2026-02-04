// src/components/CustomInput.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TextInputProps, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { colors } from '../constants/colors';

interface Props extends TextInputProps {
  label: string; 
  isPassword?: boolean;
  errorText?: string; // <--- MỚI: Nhận nội dung lỗi từ bên ngoài
}

const CustomInput = ({ label, isPassword, errorText, ...props }: Props) => {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      
      {/* Nếu có lỗi (errorText) thì đổi viền thành màu đỏ, không thì màu xám */}
      <View style={[
        styles.inputContainer, 
        errorText ? { borderColor: colors.error } : null 
      ]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.grayText}
          secureTextEntry={isPassword ? isSecure : props.secureTextEntry}
          {...props} 
        />

        {isPassword && (
          <TouchableOpacity 
            style={styles.eyeButton}
            onPress={() => setIsSecure(!isSecure)}
          >
            <Text style={styles.eyeText}>{isSecure ? "HIỆN" : "ẨN"}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* MỚI: Nếu có lỗi thì hiện dòng chữ đỏ bên dưới */}
      {errorText ? (
        <Text style={styles.errorText}>{errorText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    color: colors.textPrimary,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grayBorder, // Màu viền mặc định
    borderRadius: 8,
    backgroundColor: colors.grayLight,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: colors.black,
    height: '100%',
  },
  eyeButton: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  eyeText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  // Style cho dòng chữ đỏ
  errorText: {
    color: colors.error, // Màu đỏ (đã định nghĩa trong file colors)
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  }
});

export default CustomInput;