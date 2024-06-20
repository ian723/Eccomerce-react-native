import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { styles } from './style';


const HomeScreen = ({ navigation }) => {
  const { cartItems, addItemToCart } = useCart();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [cartStatus, setCartStatus] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!user) {
      navigation.navigate('AccountScreen');
    }
  }, [user, navigation]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://0946-102-210-40-234.ngrok-free.app/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products', error);
        setLoading(false);
      }
    };


    fetchProducts();
  }, []);


  const handleAddToCart = (product) => {
    if (!user) {
      navigation.navigate('AccountScreen');
      return;
    }
    addItemToCart(product);
    setCartStatus((prevStatus) => ({
      ...prevStatus,
      [product.id]: true,
    }));


    setTimeout(() => {
      setCartStatus((prevStatus) => ({
        ...prevStatus,
        [product.id]: false,
      }));
    }, 1500);
  };


  const filteredProducts = selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory);


  const navigateToProduct = (product) => {
    navigation.navigate('DetailScreen', { product });
  };


  const navigateToCart = () => {
    navigation.navigate('CartScreen');
  };


  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => navigateToProduct(item)}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      {cartStatus[item.id] ? (
        <Text style={styles.addedToCartText}>Added to Cart</Text>
      ) : (
        <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
      )}
    </TouchableOpacity>
  );


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>
      <TouchableOpacity style={styles.cartIconContainer} onPress={navigateToCart}>
        <Text style={styles.cartIcon}>🛒</Text>
        {cartItems.length > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setSelectedCategory('All')} style={[styles.tab, selectedCategory === 'All' && styles.selectedTab]}>
          <Text style={styles.tabText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('fashion')} style={[styles.tab, selectedCategory === 'fashion' && styles.selectedTab]}>
          <Text style={styles.tabText}>Fashion</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('groceries')} style={[styles.tab, selectedCategory === 'groceries' && styles.selectedTab]}>
          <Text style={styles.tabText}>Grocery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('beauty')} style={[styles.tab, selectedCategory === 'beauty' && styles.selectedTab]}>
          <Text style={styles.tabText}>Beauty</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('electronics')} style={[styles.tab, selectedCategory === 'electronics' && styles.selectedTab]}>
          <Text style={styles.tabText}>Electronics</Text>
        </TouchableOpacity>
        {/* Add more tabs for other categories */}
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        style={styles.productList}
        numColumns={2}
      />
    </View>
  );
};


export default HomeScreen;





