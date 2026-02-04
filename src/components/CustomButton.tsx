// src/components/CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../constants/colors';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  isLoading?: boolean;
  bgColor?: string;      // Tùy chỉnh màu NỀN
  borderColor?: string;  // Tùy chỉnh màu VIỀN (Mới)
  textColor?: string;    // Tùy chỉnh màu CHỮ
}

const CustomButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  isLoading,
  bgColor,
  borderColor,
  textColor
}: Props) => {
  const isOutline = variant === 'outline';

  // 1. Lấy style gốc dựa trên variant
  const baseButtonStyle = isOutline ? styles.buttonOutline : styles.buttonPrimary;
  const baseTextStyle = isOutline ? styles.textOutline : styles.textPrimary;

  // 2. Style tùy chỉnh (Ưu tiên cao nhất)
  // Chỉ tạo object style nếu người dùng có truyền màu vào
  const customStyle: ViewStyle = {};
  if (bgColor) customStyle.backgroundColor = bgColor;
  if (borderColor) {
    customStyle.borderColor = borderColor;
    customStyle.borderWidth = 1; // Đảm bảo có độ dày viền để hiện màu
  } else if (bgColor && !isOutline) {
    // Nếu là nút đặc (primary) mà đổi màu nền, ta đổi luôn viền cho đồng bộ (trừ khi user muốn khác)
    customStyle.borderColor = bgColor;
  }

  const customTextStyle: TextStyle = {};
  if (textColor) customTextStyle.color = textColor;

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={isLoading}
      style={[styles.button, baseButtonStyle, customStyle]} 
    >
      {isLoading ? (
        <ActivityIndicator color={isOutline ? colors.primary : colors.white} />
      ) : (
        <Text style={[styles.text, baseTextStyle, customTextStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderWidth: 1,            // Thêm viền ẩn cho đồng bộ kích thước
    borderColor: colors.primary, 
  },
  buttonOutline: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayBorder,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textPrimary: {
    color: colors.white,
  },
  textOutline: {
    color: colors.textPrimary,
  },
});

export default CustomButton;