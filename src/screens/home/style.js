import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderColor: 'tomato',
    color: 'white',
  },
  tabText: {
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1,
  },
  cartIcon: {
    fontSize: 30,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
  },
  productList: {
    flex: 1,
  },
  productItem: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
  },
  addedToCartText: {
    color: 'green',
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cartItemName: {
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 14,
    color: 'gray',
  },
});





