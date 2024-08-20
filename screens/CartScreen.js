import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Modal, TextInput, Dimensions,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

export default function CartScreen({ route, navigation }) {
  const [cartItems, setCartItems] = useState(route.params.cart);
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [preciseLocation, setPreciseLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      const initialLocation = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setLocation(initialLocation);
      setSelectedLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleRecenter = async () => {
    let loc = await Location.getCurrentPositionAsync({});
    const currentLocation = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setSelectedLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    // Optional: Move map to current location
    setLocation(currentLocation);
  };

    // Increment quantity of an item in the cart
    const incrementQuantity = (item) => {
      const updatedCartItems = cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } : cartItem
      );
      setCartItems(updatedCartItems);
    };
  
    // Decrement quantity of an item in the cart
    const decrementQuantity = (item) => {
      const updatedCartItems = cartItems.map(cartItem =>
        cartItem.id === item.id && (cartItem.quantity || 1) > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
    };
  
    // Remove an item from the cart
    const removeItem = (item) => {
      const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
      setCartItems(updatedCartItems);
    };
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price.replace('Kshs. ', '') * (item.quantity || 1)), 0);
  };

  const handleProceedToCheckout = () => {
    setModalVisible(true);
  };

  const handleConfirmCheckout = () => {
    console.log('Selected Location:', selectedLocation);
    console.log('Precise Location:', preciseLocation);
    console.log('Phone Number:', phoneNumber);
    setModalVisible(false);
    // Navigate to the Payment Summary Screen
    setPaymentModalVisible(true);
  };

  const initiateMpesaPayment = () => {
    // Simulate M-Pesa Payment initiation
    console.log('Initiating M-Pesa Payment...');
    alert(`Payment of Kshs. ${getTotal()} initiated via M-Pesa for phone number ${phoneNumber}.`);
    // Close payment modal after initiating payment
    setPaymentModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>{item.price}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decrementQuantity(item)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity || 1}</Text>
                <TouchableOpacity onPress={() => incrementQuantity(item)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItem(item)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: Kshs. {getTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleProceedToCheckout}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {location && (
              <MapView
                style={styles.map}
                initialRegion={location}
                // Allow user to select location
                onPress={handleMapPress}
              >
                {selectedLocation && (
                  <Marker
                    // Marker updates based on user tap
                    coordinate={selectedLocation} 
                    draggable
                    // Allow dragging of marker
                    onDragEnd={(e) => setSelectedLocation(e.nativeEvent.coordinate)} 
                  />
                )}
              </MapView>
            )}
            <TouchableOpacity style={styles.recenterButton} onPress={handleRecenter}>
              <Text style={styles.recenterButtonText}>Recenter</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Add precise location"
              value={preciseLocation}
              onChangeText={setPreciseLocation}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmCheckout}>
              <Text style={styles.confirmButtonText}>Confirm Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={paymentModalVisible}
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.paymentModalContent}>
            <Text style={styles.summaryText}>Checkout Summary</Text>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryItemText}>{item.name} x {item.quantity || 1}</Text>
                  <Text style={styles.summaryItemText}>{item.price}</Text>
                </View>
              )}
            />
            <Text style={styles.summaryTotalText}>Total: Kshs. {getTotal()}</Text>
            <TouchableOpacity style={styles.paymentButton} onPress={initiateMpesaPayment}>
              <Text style={styles.paymentButtonText}>Pay with M-Pesa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeButton: {
    marginLeft: 10,
  },
  removeButtonText: {
    fontSize: 18,
    color: '#ff0000',
    paddingHorizontal: 10,
  },
  totalContainer: {
    marginTop: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  map: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  recenterButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  recenterButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  paymentModalContent: {
    width: width * 0.9,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  summaryItemText: {
    fontSize: 16,
  },
  summaryTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  paymentButton: {
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
