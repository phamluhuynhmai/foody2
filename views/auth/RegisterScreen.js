import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, Text } from 'react-native-paper'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios'
import { API } from './../../configs';

const RegisterScreen = ({ navigation }) => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();

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

  const onSignupPressed = async () => {
    setLoading(true)
    if(!name) {
      toast.show("Bắt buộc phải nhập tên!", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!surname) {
      toast.show("Bắt buộc phải nhập họ và tên!", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!phone) {
      toast.show("Bắt buộc phải nhập số điện thoại!", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!address) {
      toast.show("Bắt buộc phải nhập địa chỉ!", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    /*else if(!state) {
      toast.show("State is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }*/
    else if(!email) {
      toast.show("Bắt buộc nhập email!", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!password) {
      toast.show("Bắt buộc nhập mật khẩu!", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }else {
      await axios.post(`${API}/auth/register`, {
        name: name,
        surname:surname,
        phone: phone,
        address:address,
        state:"Q1", // todo: fix state:state
        email:email,
        password: password
      }).then((result) => {
        console.log(result.data)
        if(result.data.success) {
          toast.show(result.data.message, {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          setLoading(false);
          setName("");
          setSurname("");
          setPhone("");
          setAddress("");
          setState("");
          setEmail("");
          setPassword("");
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
      justifyContent: 'center' 
    }}>
      <View style= {styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}></Text>
        </View>
        <View style={styles.main} >
          <Text style={{fontSize: 30, color: '#659349', fontWeight: 'bold'}}>
            Tạo tài khoản
          </Text>
          <View style={styles.inputView}>
            <View style={styles.fullname}>
              <TextInput
                style={styles.mininput}
                activeOutlineColor="#659349"
                mode="outlined"
                label="Tên"
                value={name}
                onChangeText={text => setName(text)}
              />

              <TextInput
                style={styles.mininput}
                activeOutlineColor="#659349"
                mode="outlined"
                label="Họ"
                value={surname}
                onChangeText={text => setSurname(text)}
              />
            </View>
            <TextInput
              style={styles.input}
              activeOutlineColor="#659349"
              mode="outlined"
              label="Số điện thoại"
              value={phone}
              onChangeText={text => setPhone(text)}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              activeOutlineColor="#659349"
              mode="outlined"
              label="Địa chỉ"
              value={address}
              onChangeText={text => setAddress(text)}
            />

            <SelectDropdown
              data={states}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setState(selectedItem)
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

            <TextInput
              style={styles.input}
              activeOutlineColor="#659349"
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              activeOutlineColor="#659349"
              secureTextEntry={true} 
              mode="outlined"
              label="Mật khẩu"
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <Button 
            mode="contained" 
            loading={loading}
            buttonColor="#659349"
            onPress={onSignupPressed}
            style={styles.button}
          >
            ĐĂNG KÝ
          </Button>
          <View style={styles.row}>
          <Text>Bạn đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#659349'
  },
  header: {
    marginVertical: 20,
    marginHorizontal:20,
    width:'100%',
    height:100
  },
  title:{
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 20
  },
  inputView:{
    marginTop:50
  },
  fullname: {
    flexDirection:'row',
  },
  mininput:{
    width:'49%',
    marginRight:5,
    marginBottom: 10,
  },

  input:{
    marginBottom:10,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
    marginBottom: 10,
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  button: {
    height: 60,
    marginTop: 20,
    justifyContent: "center",
    borderRadius: 30,
    marginTop:10,
    margin:'1%'
  },
  row: {
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 10,
  },
  link: {
    fontWeight: 'bold',
    color: '#659349',
  },
})

export default RegisterScreen