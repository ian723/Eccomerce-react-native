// CartScreen.js
import React, { useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';


const CartScreen = ({ navigation }) => {
  const { cartItems, removeItemFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { user } = useAuth();


  useEffect(() => {
    if (!user) {
      navigation.navigate('AccountScreen');
    }
  }, [user, navigation]);


  return (
    <View style={styles.container}>
      {cartItems.map(item => (
        <View key={item.id} style={styles.itemContainer}>
          <Image source={item.image} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>Price: {item.price}</Text>
            <View style={styles.quantityContainer}>
              <Button title="-" onPress={() => decreaseQuantity(item.id)} color="#FF6347" />
              <Text style={styles.productQuantity}>{item.quantity}</Text>
              <Button title="+" onPress={() => increaseQuantity(item.id)} color="#FF6347" />
            </View>
          </View>
          <Button title="Remove" onPress={() => removeItemFromCart(item.id)} color="#FF6347" />
        </View>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  productQuantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});


export default CartScreen;





