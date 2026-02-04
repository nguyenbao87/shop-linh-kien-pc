/// <reference types="nativewind/types" />

// 1. Import React Native để định nghĩa này được coi là module mở rộng
import 'react-native';

// 2. Mở rộng định nghĩa gốc của React Native
declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
    placeholderClassName?: string; // Thêm cái này cho Input
  }
  interface TouchableOpacityProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
  }
}