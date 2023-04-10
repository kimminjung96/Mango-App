import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { API_URL } from './config/constans';

import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
// import "dayjs/locale/*" -> 언어전부다가져옴
import "dayjs/locale/ko";
dayjs.locale("ko");

export default function App() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    axios
    .get(`${API_URL}/products`)
    .then((result) => {
      //여기서 console.log(result.data.products)하면 처음에 undefined 나옴 => 비동기 통신이라 일부러 밖에 써줌
      setProducts(result.data.products);
    })
    .catch((error) => {console.error(error);})
    axios
    .get(`${API_URL}/banners`)
    .then((result) => {
      setBanners(result.data.banners);
      console.log(result.data.banners)
    })
    .catch((error) => {console.error(error);})
  },[]);
  return (
    <View style={styles.container}>
      
      <SafeAreaView>
        <StatusBar style="auto"/>
        <ScrollView>
          <View style={styles.banners}>
            {banners.map((banner,idx) => {
              return(
                <Image source = {{uri:`${API_URL}/${banner.imageUrl}`}}
                style={styles.bannerImage}  key={idx}/>
              )
            })}
          </View>
          <Text>Product😈</Text>
          {products && products.map((product,idx) => {
            return(
          <View style={styles.productCard} key={idx}>
            {product.soldout === 1 && <View style={styles.productBlur} />}
            <View>
              {/* 외부이미지 사용할때 */}
              <Image source ={{uri:`${API_URL}/${product.imageUrl}`}} style={styles.productImage}
              resizeMode={'contain'}
// 기 본   이미지 태그에 제공되는 props 
/>    
            </View>
            <View style={styles.productContent}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}원</Text>
            </View>
            <View style={styles.productFooter}>
              <View style={styles.productSeller}>
                <Image source ={{uri:`https://cdn-icons-png.flaticon.com/512/10277/10277911.png`}} style = {styles.Avatar}/>
                <Text style={styles.productSellerName}>{product.seller}</Text>
              </View>
              <Text style={styles.productDate}>{dayjs(product.createdAt).fromNow()}</Text>
            </View>
          </View>
          )
          })}
        </ScrollView>
      </SafeAreaView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"lightblue",
    //justifyContent:"center",
    alignItems:"center",
  },
  productCard:{
    width:320,
    borderColor:"rgb(230,230,230)",
    borderWidth:1,
    borderRadius:16,//네이티브앱은 8단위로
    backgroundColor:"#fff",
  },
  productBlur:{
    position : "absolute",
    top:0,
    bottom:0,
    right:0,
    left:0,
    backgroundColor:"#ffffffaa",
    zIndex:999,
  },
  productImage:{
    width:"100%",
    height:210,
    borderRadius:16,
  },
  productContent:{
    padding : 8,
  },
  productFooter: {
    flexDirection:"row",
    justifyContent : "space-between",
    alignItems : "center",
    marginTop:12,
    padding:8,
  },
  productSeller:{
    flexDirection:"row",
    alignItems:"center",
  },
  Avatar:{
      width:24,
      height:24,
  },
  productName : {
    fontSize:16,
  },
  productPrice : {
    fontSize:18,
    fontWeight:600,
    marginTop:8,
  },
  productSellerName : {
    fontSize:16,
  },
  productDate : {
    fontSize:16,
  },
  bannerImage:{
    width:"100%",
    height:"100%",
    position : "absolute",
    top:0,
    left:0,
    resizeMode:"contain",
  },
  banners:{
    width:"100%",
    position:"relative",
    height:300,
  }
  
});
