import { ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, Text, MD2Colors } from 'react-native-paper'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import { API } from './../../configs';
import { Header } from '../../components';
import styles from './../../styles'

const ProfileScreen = ({ navigation }) => {

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [etat, setEtat] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();

  const states = [
    "Q1",
    "Q3",
    "Q4",
    "Q5",
    "Q6",
    "Q7",
    "Q8",
    "Q10",
    "Q11",
    "Q12",
    "BinhThanh",
    "PhuNhuan",
    "GoVap",
    "TanBinh",
    "TanPhu",
    "BinhTan",
    "ThuDuc",
    "HocMon",
    "CuChi",
    "BinhChanh",
    "NhaBe",
    "CanGio"
  ];

  const onSubmitPressed = async () => {
    setLoading(true)
    if(!nom) {
      toast.show("Bắt buộc nhập tên!", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!prenom) {
      toast.show("Bắt buộc nhập họ!", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!telephone) {
      toast.show("Bắt buộc nhập số điện thoại!", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!adresse) {
      toast.show("Bắt buộc nhập địa chỉchỉ!", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!etat) {
      toast.show("State is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }else {
      await axios.put(`${API}/auth/profile/${route.params.user._id}`, {
        nom: nom,
        prenom:prenom,
        telephone: telephone,
        adresse:adresse,
        etat:etat
      }).then((result) => {
        if(result.data.success) {
          toast.show(result.data.message, {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          setLoading(false);
          setNom("");
          setPrenom("");
          setTelephone("");
          setAdresse("");
          setEtat("");
          navigation.navigate("LoginScreen");
        }else {
          toast.show(result.data.message, {
            type: "danger",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          setLoading(false);
        }
      })
    }
  }

  return (
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center' ,
      flexGrow: 1
    }}>
      <View style= {styles.container}>
        <Header title="Thông tin người dùng" />
        <View style={styles.main} >
          <View style={styles.inputView}>
            <View style={styles.fullname}>
              <TextInput
                style={styles.mininput}
                activeOutlineColor="#659349"
                mode="outlined"
                label="Tên"
                value={nom}
                onChangeText={text => setNom(text)}
              />

              <TextInput
                style={styles.mininput}
                activeOutlineColor="#659349"
                mode="outlined"
                label="Họ"
                value={prenom}
                onChangeText={text => setPrenom(text)}
              />
            </View>
            <TextInput
              style={styles.input}
              activeOutlineColor="#659349"
              mode="outlined"
              label="Số điện thoại"
              value={telephone}
              onChangeText={text => setTelephone(text)}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              activeOutlineColor="#659349"
              mode="outlined"
              label="Địa chỉ"
              value={adresse}
              onChangeText={text => setAdresse(text)}
            />

            <SelectDropdown
              data={states}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setEtat(selectedItem)
              }}
              defaultButtonText={'Select State'}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}

              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
          <Button 
            mode="contained" 
            loading={loading}
            buttonColor="#659349"
            onPress={onSubmitPressed}
            style={styles.button}
          >
            CẬP NHẬT
          </Button>
          <View style={styles.infoBubble}>
            <Ionicons name="information-circle-sharp" size={35} color={MD2Colors.red500}/>
            <Text style={styles.info}>Bạn sẽ được chuyển đến trang <Text style={styles.link}>đăng nhập</Text> sau khi cập nhật mật khẩu</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen