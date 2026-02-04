import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { colors } from '../constants/colors';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const LANGUAGES = [
  { code: 'vi', label: '🇻🇳 Tiếng Việt' },
  { code: 'en', label: '🇺🇸 English' },
  { code: 'jp', label: '🇯🇵 Japanese' },
];

const UserProfileScreen = ({ navigation }: any) => {
  const initialData = {
    name: 'Nguyễn Văn Admin',
    address: '123 Đường Số 1, TP. Hồ Chí Minh',
    phone: '0901234567',
    email: 'admin@shopai.com',
  };

  const [userInfo, setUserInfo] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // State cài đặt
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);

  // --- (MỚI) ĐỊNH NGHĨA MÀU SẮC DỰA THEO CHẾ ĐỘ ---
  const theme = {
    background: isDarkMode ? '#111827' : '#F9FAFB',      // Nền tổng: Đen xám / Xám nhạt
    card: isDarkMode ? '#1F2937' : 'white',             // Nền thẻ: Đen nhạt / Trắng
    text: isDarkMode ? '#F9FAFB' : '#1F2937',           // Chữ: Trắng / Đen
    subText: isDarkMode ? '#9CA3AF' : '#4B5563',        // Chữ phụ: Xám sáng / Xám đậm
    inputBg: isDarkMode ? '#374151' : 'white',          // Nền ô nhập: Xám đậm / Trắng
    border: isDarkMode ? '#4B5563' : '#E5E7EB',         // Viền: Xám / Xám nhạt
  };

  useEffect(() => {
    const isChanged = 
      userInfo.name !== initialData.name ||
      userInfo.address !== initialData.address ||
      userInfo.phone !== initialData.phone ||
      userInfo.email !== initialData.email;
    setHasChanges(isChanged);
  }, [userInfo]);

  const validatePhone = (phone: string) => {
    const vnPhoneRegex = /^(0)(3|5|7|8|9)([0-9]{8})$/;
    if (!phone) return true; 
    if (!/^\d+$/.test(phone)) return false; 
    return vnPhoneRegex.test(phone);
  };

  const handleSave = () => {
    if (!validatePhone(userInfo.phone)) {
      Alert.alert("Lỗi", "Số điện thoại không đúng định dạng Việt Nam!");
      return;
    }
    Alert.alert("Thành công", "Đã cập nhật thông tin!", [{ text: "OK", onPress: () => navigation.goBack() }]);
  };

  const renderInputRow = (label: string, value: string, key: string, keyboardType: any = 'default') => (
    <View style={styles.inputContainer}>
      {/* Sửa màu chữ Label */}
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <TextInput
        style={[
          styles.input, 
          // Sửa màu nền Input và màu chữ Input
          { backgroundColor: theme.inputBg, borderColor: theme.border, color: theme.text }
        ]}
        value={value}
        onChangeText={(text) => {
          if (key === 'phone') {
             if (!validatePhone(text) && text.length > 0) {
               setPhoneError('SĐT không hợp lệ');
             } else {
               setPhoneError('');
             }
          }
          setUserInfo({ ...userInfo, [key]: text });
        }}
        placeholder={`Nhập ${label.toLowerCase()}`}
        placeholderTextColor={theme.subText} // Màu chữ gợi ý
        keyboardType={keyboardType}
      />
      {key === 'phone' && phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
    </View>
  );

  return (
    // Áp dụng màu nền tổng thể
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      
      {/* HEADER: Áp dụng màu nền thẻ và viền */}
      <View style={[styles.header, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Image 
             source={{ uri: 'https://cdn-icons-png.flaticon.com/512/271/271220.png' }} 
             // Đổi màu icon mũi tên (Trắng nếu nền đen)
             style={[styles.backIcon, { tintColor: theme.text }]} 
           />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Hồ sơ cá nhân</Text>
        <View style={{width: 40}} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* AVATAR */}
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }} 
            style={[styles.avatar, { borderColor: theme.card }]} 
          />
          <TouchableOpacity style={[styles.editAvatarBtn, { backgroundColor: theme.border, borderColor: theme.card }]}>
            <Text style={styles.editAvatarText}>📷</Text>
          </TouchableOpacity>
        </View>

        {/* FORM THÔNG TIN */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.subText }]}>Thông tin cơ bản</Text>
          {renderInputRow("Họ và tên", userInfo.name, 'name')}
          {renderInputRow("Địa chỉ", userInfo.address, 'address')}
          {renderInputRow("Số điện thoại", userInfo.phone, 'phone', 'numeric')}
          {renderInputRow("Email", userInfo.email, 'email', 'email-address')}
        </View>

        {/* NÚT LƯU */}
        <View style={styles.saveBtnContainer}>
           <TouchableOpacity 
             disabled={!hasChanges} 
             style={[styles.saveButton, !hasChanges && styles.saveButtonDisabled]}
             onPress={handleSave}
           >
             <Text style={styles.saveButtonText}>
               {hasChanges ? "Lưu thay đổi" : "Chưa có thay đổi"}
             </Text>
           </TouchableOpacity>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* CÀI ĐẶT */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.subText }]}>Cài đặt ứng dụng</Text>
          
          {/* A. Ngôn ngữ */}
          <View style={[styles.settingRow, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>Ngôn ngữ</Text>
            <TouchableOpacity 
              style={styles.dropdownHeader}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setLangDropdownOpen(!isLangDropdownOpen);
              }}
            >
              <Text style={styles.dropdownValue}>{language.label}</Text>
              <Text style={{fontSize: 12, color: theme.text}}>▼</Text>
            </TouchableOpacity>
          </View>

          {isLangDropdownOpen && (
            <View style={[styles.dropdownList, { backgroundColor: theme.card, borderColor: theme.border }]}>
              {LANGUAGES.map((lang) => (
                <TouchableOpacity 
                  key={lang.code} 
                  style={[styles.dropdownItem, { borderBottomColor: theme.background }]}
                  onPress={() => {
                    setLanguage(lang);
                    setLangDropdownOpen(false); 
                  }}
                >
                  <Text style={[
                    styles.dropdownItemText, 
                    { color: theme.text },
                    language.code === lang.code && { color: colors.primary, fontWeight: 'bold' }
                  ]}>
                    {lang.label}
                  </Text>
                  {language.code === lang.code && <Text style={{color: colors.primary}}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* B. Chế độ tối */}
          <View style={[styles.settingRow, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>Chế độ nền tối</Text>
            <Switch
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
              onValueChange={() => setIsDarkMode(!isDarkMode)}
              value={isDarkMode}
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// Styles cơ bản (Màu sắc động đã được xử lý inline ở trên)
const styles = StyleSheet.create({
  safeArea: { flex: 1 }, // Đã bỏ backgroundColor cứng
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingHorizontal: 16, paddingVertical: 12, 
    borderBottomWidth: 1
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  backButton: { padding: 5 },
  backIcon: { width: 24, height: 24 },
  
  scrollContent: { padding: 20 },
  
  avatarContainer: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3 },
  editAvatarBtn: { 
    position: 'absolute', bottom: 0, right: 120, // Chỉnh lại vị trí cho chuẩn
    padding: 6, borderRadius: 15,
    borderWidth: 2
  },
  editAvatarText: { fontSize: 16 },

  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 12, textTransform: 'uppercase' },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 14, marginBottom: 6, fontWeight: '500' },
  input: {
    borderWidth: 1, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16
  },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },

  saveBtnContainer: { marginVertical: 10 },
  saveButton: {
    backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 8, alignItems: 'center',
    shadowColor: colors.primary, shadowOpacity: 0.3, shadowRadius: 5, shadowOffset: { width: 0, height: 4 }, elevation: 4
  },
  saveButtonDisabled: { backgroundColor: '#9CA3AF', shadowOpacity: 0, elevation: 0 },
  saveButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  divider: { height: 1, marginVertical: 20 },

  settingRow: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    padding: 14, borderRadius: 8, marginBottom: 10,
    borderWidth: 1
  },
  settingLabel: { fontSize: 16 },
  
  dropdownHeader: { flexDirection: 'row', alignItems: 'center' },
  dropdownValue: { fontSize: 16, color: colors.primary, marginRight: 8, fontWeight: '500' },
  dropdownList: { 
    marginTop: -5, marginBottom: 15, 
    borderRadius: 8, borderWidth: 1, overflow: 'hidden'
  },
  dropdownItem: { 
    flexDirection: 'row', justifyContent: 'space-between', padding: 12, 
    borderBottomWidth: 1
  },
  dropdownItemText: { fontSize: 16 },
});

export default UserProfileScreen;