import { API_URL } from "./config/constans";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
//TouchableOpacity 터치구현
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Alert } from "react-native";
// import Avatar from "./assets/icons/avatar.png";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; //한국어 가져오기 *은 전부
dayjs.locale("ko");
dayjs.extend(relativeTime);

import Carousel from "react-native-reanimated-carousel";

export default function App() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  const WIDTH = Dimensions.get(`window`).width;
  //Dimensions => width를 조정해주는 애 => window에 너비를 가져와 width 함수에 담음
  const [isVertical, setIsVertical] = useState(false);
  const COUNT = 2;

  useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        console.log(result.data.banners);
        setBanners(result.data.banners);
      })
      .catch((error) => console.log(error));
  }, []);

  const baseOptions = isVertical
    ? {
        vertical: true,
        width: WIDTH,
        height: WIDTH / 2 / COUNT,
        style: {
          height: WIDTH / 2,
        },
      } //지워도 되는 부분
    : {
        vertical: false,
        width: WIDTH / COUNT,
        height: WIDTH / 2,
        style: {
          width: WIDTH,
        },
      };

  return (
    <SafeAreaView>
      {/* SafeAreaView => ios 11상위버전부터 가능 보이는영역을 안전하게??? */}
      <StatusBar style="auto" />
      {/* ScrollView 스크롤영역 */}
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              //Alert 알림창에 관한 모든것
              Alert.alert("베너클릭");
            }}
          >
            <Carousel
              {...baseOptions}
              loop
              scrollAnimationDuration={2000}
              autoPlay={true}
              width={WIDTH}
              height={300}
              sliderWidth={Dimensions.get(`window`).width / 2}
              itemWidth={WIDTH / 2}
              itemHeight={300}
              data={banners}
              renderItem={(object) => {
                console.log(object.item, "object");
                return (
                  <View
                    onPress={() => {
                      setIsVertical(isVertical);
                    }}
                  >
                    <Image source={{ uri: `${API_URL}/${object.item.imageUrl}` }} style={styles.bannerImage} />
                  </View>
                );
              }}
            />
          </TouchableOpacity>
          <Text>😊와우</Text>
          {products &&
            products.map((data) => {
              return (
                <View style={styles.productCard} key={data.id}>
                  {data.soldout === 1 && <View style={styles.productBlur} />}
                  <View>
                    {/* uri: 외부의 이미지 사용 */}
                    <Image source={{ uri: `${API_URL}/${data.imageUrl}` }} style={styles.productImage} resizeMode={"contain"} />
                  </View>
                  <View style={styles.porductContent}>
                    <Text style={styles.productName}>{data.name}</Text>
                    <Text style={styles.productPrice}>{data.price}원</Text>
                  </View>
                  <View style={styles.productFooter}>
                    <View style={styles.productSeller}>
                      {/* <Image source={Avatar} style={styles.productAvatar} /> */}
                      <Image
                        source={{
                          uri: `https://img.freepik.com/free-vector/cute-dog-bites-bone-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3743.jpg?w=740&t=st=1680749629~exp=1680750229~hmac=db6d4a69dca3a50e1f62c28ca3d78f3974cfc262c95bd6d6e45a306babbb3bdf`,
                        }}
                        style={styles.productAvatar}
                      />
                      <Text style={styles.productSellerName}>{data.seller}</Text>
                    </View>
                    <Text style={styles.productDate}>{dayjs(data.createdAt).fromNow()}</Text>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
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
    marginBottom: 16,
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
    borderRadius: 20,
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
  productBlur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#ffffffaa",
    zIndex: 999,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
});
