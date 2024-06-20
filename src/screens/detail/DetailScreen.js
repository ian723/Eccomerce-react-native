// DetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useCart } from '../../context/CartContext';


const DetailScreen = ({ route }) => {
  const { productId } = route.params;
  const { addItemToCart } = useCart();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://0946-102-210-40-234.ngrok-free.app/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };


    fetchProduct();
  }, [productId]);


  if (!product) {
    return <Text>Loading...</Text>;
  }


  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Button title="Add to Cart" onPress={() => addItemToCart(product)} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
});


export default DetailScreen;





