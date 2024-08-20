import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProvideDetails = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const openImagePicker = async (type) => {
    if (type === 'camera') {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImages([...images, result.assets[0].uri]);
        setModalVisible(false);
      }
    } else if (type === 'gallery') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImages([...images, result.assets[0].uri]);
        setModalVisible(false);
      }
    }
  };

  const showImagePickerOptions = () => {
    setModalVisible(true);
  };

  const removeImage = (uri) => {
    setImages(images.filter((image) => image !== uri));
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/tp.png')}
        style={styles.logo}
      />

      <Text style={styles.stepIndicator}>STEP 3/4</Text>
      <Text style={styles.title}>Provide more details</Text>
      <Text style={styles.subTitle}>What are the details?</Text>
      <TextInput
        style={styles.detailsInput}
        placeholder="Just washing my dog, it's a German shepherd"
        placeholderTextColor="#000"
        multiline={true}
        numberOfLines={4}
      />

      <Text style={styles.subTitle}>Add images (optional)</Text>
      <ScrollView horizontal style={styles.imageUploadContainer}>
        {images.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.uploadedImage} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => removeImage(uri)}
            >
              <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={showImagePickerOptions}
        >
          <Ionicons name="add-outline" size={40} color="#007bff" />
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an option</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => openImagePicker('camera')}
            >
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => openImagePicker('gallery')}
            >
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Budget')}>
          <Text style={styles.buttonTextNext}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  stepIndicator: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#001c6b',
  },
  subTitle: {
    fontSize: 16,
    color: '#001c6b',
    marginBottom: 10,
  },
  detailsInput: {
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  uploadButton: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  nextButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextNext: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalCancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default ProvideDetails;
