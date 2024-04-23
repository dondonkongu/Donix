import { StyleSheet,  View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const DieuKhoanDichVu = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Điều Khoản Dịch Vụ</Text>
        
        <View style={styles.termsContainer}>
          <Text style={styles.content}>
            1. **Chấp Nhận Điều Khoản:** {'\n'}
               Bằng cách truy cập hoặc sử dụng ứng dụng, bạn đồng ý và cam kết tuân thủ tất cả các điều khoản và điều kiện mà chúng tôi quy định trong tài liệu này.{'\n'}

            2. **Sử Dụng Của Bạn:** {'\n'}
               Bạn cam kết sử dụng ứng dụng chỉ cho mục đích cá nhân và không sử dụng nó để vi phạm bất kỳ pháp luật nào. Bạn không được phép phá hủy, can thiệp, hoặc làm hại đến ứng dụng hoặc dữ liệu liên quan.{'\n'}

            3. **Bảo Mật Thông Tin:** {'\n'}
               Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Tuy nhiên, bạn chịu trách nhiệm về việc giữ an toàn thông tin đăng nhập của mình và không chia sẻ nó với bất kỳ người nào khác.{'\n'}

            4. **Thay Đổi Trong Ứng Dụng:** {'\n'}
               Chúng tôi có quyền thay đổi, cập nhật hoặc ngừng cung cấp bất kỳ tính năng hoặc dịch vụ nào trong ứng dụng mà không cần thông báo trước.{'\n'}

            5. **Bản Quyền và Sở Hữu Trí Tuệ:** {'\n'}
               Mọi quyền sở hữu trí tuệ và bản quyền của ứng dụng đều thuộc sở hữu của chúng tôi. Bạn không được phép sao chép, sửa đổi, phân phối hoặc sử dụng bất kỳ nội dung nào của ứng dụng mà không có sự cho phép bằng văn bản từ chúng tôi.{'\n'}

            6. **Chấm Dứt Dịch Vụ:** {'\n'}
               Chúng tôi có quyền chấm dứt hoặc tạm ngừng cung cấp dịch vụ cho bạn nếu chúng tôi nghi ngờ rằng bạn đã vi phạm bất kỳ điều khoản nào trong tài liệu này.{'\n'}

            7. **Thay Đổi Điều Khoản:** {'\n'}
               Chúng tôi có quyền thay đổi điều khoản dịch vụ này bất kỳ lúc nào. Những thay đổi sẽ có hiệu lực ngay khi chúng được đăng trên ứng dụng. Việc sử dụng tiếp tục của bạn sau những thay đổi này đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  termsContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  content: {
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
  },
});

export default DieuKhoanDichVu;
