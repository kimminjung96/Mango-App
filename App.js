import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import AccImg1 from "./assets/products/acc1.jpg";
import Avatar from "./assets/icons/avatar.png";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>😊와우</Text>
      <View style={styles.productCard}>
        <View>
          <Image source={AccImg1} style={styles.productImage} resizeMode={"contain"} />
        </View>
        <View style={styles.porductContent}>
          <Text style={styles.productName}>하네스</Text>
          <Text style={styles.productPrice}>50000원</Text>
        </View>
        <View style={styles.productFooter}>
          <View style={styles.productSeller}>
            <Image source={Avatar} style={styles.productAvatar} />
            <Text style={styles.productSellerName}>도기멍</Text>
          </View>
          <Text style={styles.productDate}>1분전</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  productCard: {
    width: 320,
    borderColor: "rgb(230,230,230)",
    borderWidth: 1,
    //8단위로 작성하기
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  productImage: {
    //숫자나 %만 사용 //px,em,rem등 사용안됌
    width: "100%",
    height: 210,
  },
  porductContent: {
    padding: 8,
  },
  productSeller: {
    flexDirection: "row",
    alignItems: "center",
  },
  productAvatar: {
    width: 24,
    height: 24,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    padding: 8,
  },
  /* 교안 => UX/UI 부분에 휴대폰개발시 가이드 확인 */
  /* 리엑트 네이티브는 폰트패밀리를 적용하지 않는다!!!=> 휴대폰내장되어있는 글씨체 사용(속도때문) */
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  productSellerName: {
    fontSize: 16,
  },
  productDate: {
    fontSize: 16,
  },
});
