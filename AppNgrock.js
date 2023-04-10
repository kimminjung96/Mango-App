// contans - > export const API_URL ="https://25da-58-72-80-3.jp.ngrok.io";
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AccImg1 from "./assets/products/acc1.jpg";
import Avatar from "./assets/icons/avatar.png";
import { API_URL } from './config/constans';

export default function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
    .get(`${API_URL}/products`)
    .then((result) => {
      //여기서 console.log(result.data.products)하면 처음에 undefined 나옴 => 비동기 통신이라 일부러 밖에 써줌
      setProducts(result.data.products);
    })
    .catch((error) => {console.error(error);})
  },[]);
  console.log(products)
  return (
    <View style={styles.container}>
      <Text>Product😈</Text>
      {products && products.map((product,idx) => {
        return(
      <View style={styles.productCard} key={idx}>
        <View>
          {/* 외부이미지 사용할대 */}
          <Image source ={{uri:`${API_URL}/${product.imageUrl}`}} style={styles.productImage}
          resizeMode={'contain'}
// 기본 이미지 태그에 제공되는 props
/>
        </View>
        <View style={styles.productContent}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}원</Text>
        </View>
        <View style={styles.productFooter}>
          <View style={styles.productSeller}>
            <Image source={Avatar} style = {styles.productAvatar}/>
            <Text style={styles.productSellerName}>{product.category}</Text>
          </View>
          <Text style={styles.productDate}>1분전</Text>
        </View>
      </View>
      )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"lightblue",
    justifyContent:"center",
    alignItems:"center",
  },
  productCard:{
    width:320,
    borderColor:"rgb(230,230,230)",
    borderWidth:1,
    borderRadius:16,//네이티브앱은 8단위로
    backgroundColor:"#fff",
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

});
