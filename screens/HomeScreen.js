import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default function HomeScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  const openDeliveryModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const selectCategory = (category) => {
    setModalVisible(false);
    if (category === 'Groceries') {
      navigation.navigate('Groceries'); 
    }
  };
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Icon name="menu" size={30} color="#fff" />
            <Text style={styles.logo}>TaskaPap</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PostTask')}>
                <Icon name="add-circle" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
      <ScrollView>
        <View style={styles.mainContent}>
          <View style={styles.headerTwoContainer}>
            <Text style={styles.greeting}>Good afternoon, Paul</Text>
            <Text style={styles.heading}>Post a task. Get it done.</Text>

            <TextInput
              style={styles.input}
              placeholder="In a few words, what do you need done?"
              placeholderTextColor="#8f8f8f"
            />

            <Button
              title="Get Offers"
              buttonStyle={styles.getOffersButton}
              iconRight
              icon={<Icon name="arrow-forward" size={20} color="white" />}
            />
          </View>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Icon name="local-shipping" size={24} color="#007BFF" />
              <Text style={styles.quickActionText}>Help me move home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={openDeliveryModal}>
              <Icon name="motorcycle" size={24} color="#007BFF" />
              <Text style={styles.quickActionText}>Orders & Deliveries</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categories}>
            <Text style={styles.subHeading}>Our top categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>Gardening</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>Groceries delivery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>Painting</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>Cleaning</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={styles.taskerSection}>
            <Text style={styles.subMainHeading}>Book a Tasker directly</Text>
            <Text style={styles.location}>Malabar NSW</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search 20,000+ services"
              placeholderTextColor="#8f8f8f"
            />
          </View>

          <View style={styles.horizontalScrollSection}>
            <Text style={styles.subHeading}>Home organisation</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.serviceCard}>
                <Image source={{uri: 'https://via.placeholder.com/100'}} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>4 hour Home declutter and...</Text>
                <Text style={styles.servicePrice}>Kshs. 660</Text>
                <Text style={styles.serviceRating}>⭐ 5.0 (106)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceCard}>
                <Image source={{uri: 'https://via.placeholder.com/100'}} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>I can organize, pack and unpack...</Text>
                <Text style={styles.servicePrice}>Kshs. 400</Text>
                <Text style={styles.serviceRating}>⭐ 4.8 (56)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceCard}>
                <Image source={{uri: 'https://via.placeholder.com/100'}} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>Haircut and styling...</Text>
                <Text style={styles.servicePrice}>Kshs. wigs</Text>
                <Text style={styles.serviceRating}>⭐ 4.9 (34)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceCard}>
                <Image source={{uri: 'https://via.placeholder.com/100'}} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>Haircut and styling...</Text>
                <Text style={styles.servicePrice}>Kshs. 200</Text>
                <Text style={styles.serviceRating}>⭐ 4.9 (34)</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={styles.horizontalScrollSection}>
            <Text style={styles.subHeading}>Hair and beauty</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.serviceCard}>
                <Image source={{uri: 'https://via.placeholder.com/100'}} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>Haircut</Text>
                <Text style={styles.servicePrice}>Kshs. 80</Text>
                <Text style={styles.serviceRating}>⭐ 4.9 (34)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceCard}>
                <Image source={{uri: 'https://via.placeholder.com/100'}} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>Haircut and styling...</Text>
                <Text style={styles.servicePrice}>Kshs. wigs</Text>
                <Text style={styles.serviceRating}>⭐ 4.9 (34)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceCard}>
                <Image source={{uri: 'https://via.placeholder.com/100'}} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>Haircut and styling...</Text>
                <Text style={styles.servicePrice}>Kshs. 200</Text>
                <Text style={styles.serviceRating}>⭐ 4.9 (34)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceCard}>
                <Image source={{uri: 'https://via.placeholder.com/100'}} style={styles.serviceImage} />
                <Text style={styles.serviceTitle}>Makeup for events...</Text>
                <Text style={styles.servicePrice}>Kshs. 120</Text>
                <Text style={styles.serviceRating}>⭐ 4.7 (50)</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

        </View>
      </ScrollView>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Delivery Category</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => selectCategory('Groceries')}>
              <Icon name="shopping-cart" size={24} color="#000" />
              <Text style={styles.modalButtonText}>Groceries</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
              <Icon name="local-drink" size={24} color="#000" />
              <Text style={styles.modalButtonText}>Water</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
              <Icon name="crown" type='font-awesome-5' size={24} color="#000" />
              <Text style={styles.modalButtonText}>Exclusive</Text>
            </TouchableOpacity>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerTwoContainer: {
    marginTop: 50,
    paddingTop: 40,
    backgroundColor: '#007BFF',
    width: '100%',
    marginHorizontal: 0,
  },
  logo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainContent: {
    padding: 0,
  },
  greeting: {
    fontSize: 18,
    color: '#ffff',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#ffff',
    paddingHorizontal: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#fff',
  },
  getOffersButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 70,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionText: {
    color: '#007BFF',
    marginTop: 5,
    fontSize: 14,
  },
  categories: {
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#bcdfe6',
  },
  subMainHeading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
  taskerSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  location: {
    fontSize: 16,
    color: '#000',
    marginVertical: 10,
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  horizontalScrollSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  serviceCard: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 150,
    alignItems: 'center',
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  servicePrice: {
    fontSize: 16,
    color: '#000',
    marginVertical: 5,
  },
  serviceRating: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '100%',
  },
  modalButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
