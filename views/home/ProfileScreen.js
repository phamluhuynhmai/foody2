import { ScrollView, View, StyleSheet } from 'react-native'
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({ navigation }) => {

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();

  const districts = [
    {
      title: 'Quận 1',
      value: [
        'Bến Nghé',
        'Bến Thành',
        'Cô Giang',
        'Cầu Kho',
        'Cầu Ông Lãnh',
        'Nguyễn Cư Trinh',
        'Nguyễn Thái Bình',
        'Phạm Ngũ Lão',
        'Tân Định',
        'Đa Kao',
      ]
    },
    {
      title: 'Quận 3',
      value: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '9',
        '11',
        '12',
        '14',
        'Võ Thị Sáu',
      ]
    },
    {
      title: 'Quận 4',
      value: [
        '1',
        '2',
        '3',
        '4',
        '8',
        '9',
        '13',
        '15',
        '16',
        '18',
      ]
    },
    {
      title: 'Quận 5',
      value: [
        '1',
        '2',
        '4',
        '5',
        '7',
        '9',
        '11',
        '12',
        '13',
        '14',
      ]
    },
    {
      title: 'Quận 6',
      value: [
        '1',
        '2',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
      ]
    },
    {
      title: 'Quận 7',
      value: [
        'Bình Thuận',
        'Phú Mỹ',
        'Phú Thuận',
        'Tân Hưng',
        'Tân Kiểng',
        'Tân Phong',
        'Tân Phú',
        'Tân Quy',
        'Tân Thuận Đông',
        'Tân Thuận Tây',
      ]
    },
    {
      title: 'Quận 8',
      value: [
        '4',
        '5',
        '6',
        '7',
        '14',
        '15',
        '16',
        'Hưng Phú',
        'Rạch Ông',
        'Xóm Củi',
      ]
    },
    {
      title: 'Quận 10',
      value: [
        '1',
        '2',
        '4',
        '6',
        '8',
        '9',
        '10',
        '12',
        '13',
        '14',
        '15',
      ]
    },
    {
      title: 'Quận 11',
      value: [
        '1',
        '3',
        '5',
        '7',
        '8',
        '10',
        '11',
        '14',
        '15',
        '16',
      ]
    },
    {
      title: 'Quận 12',
      value: [
        'An Phú Đông',
        'Đông Hưng Thuận',
        'Hiệp Thành',
        'Tân Chánh Hiệp',
        'Tân Hưng Thuận',
        'Tân Thới Hiệp',
        'Tân Thới Nhất',
        'Thạnh Lộc',
        'Thạnh Xuân',
        'Thới An',
        'Trung Mỹ Tây',
      ]
    },
    {
      title: 'Quận Bình Tân',
      value: [
        'An Lạc',
        'An Lạc A',
        'Bình Hưng Hòa',
        'Bình Hưng Hòa A',
        'Bình Hưng Hòa B',
        'Bình Trị Đông',
        'Bình Trị Đông A',
        'Bình Trị Đông B',
        'Tân Tạo',
        'Tân Tạo A',
      ]
    },
    {
      title: 'Quận Bình Thạnh',
      value: [
        '1',
        '2',
        '5',
        '7',
        '11',
        '12',
        '13',
        '14',
        '17',
        '19',
        '22',
        '25',
        '26',
        '27',
        '28',
      ]
    },
    {
      title: 'Quận Gò Vấp',
      value: [
        '1',
        '2',
        '5',
        '7',
        '11',
        '12',
        '13',
        '14',
        '17',
        '19',
        '22',
        '25',
        '26',
        '27',
        '28',
      ]
    },
    {
      title: 'Quận Phú Nhuận',
      value: [
        '1',
        '2',
        '4',
        '5',
        '7',
        '8',
        '9',
        '10',
        '11',
        '13',
        '15',
      ]
    },
    {
      title: 'Quận Tân Bình',
      value: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
      ]
    },
    {
      title: 'Quận Tân Phú',
      value: [
        'Hiệp Tân',
        'Hòa Thạnh',
        'Phú Thạnh',
        'Phú Thọ Hòa',
        'Phú Trung',
        'Sơn Kỳ',
        'Tân Quý',
        'Tân Sơn Nhì',
        'Tân Thành',
        'Tân Thới Hòa',
        'Tây Thạnh',
      ]
    },
    {
      title: 'Thành phố Thủ Đức',
      value: [
        'An Khánh',
        'An Lợi Đông',
        'An Phú',
        'Bình Chiểu',
        'Bình Thọ',
        'Bình Trưng Đông',
        'Bình Trưng Tây',
        'Cát Lái',
        'Hiệp Bình Chánh',
        'Hiệp Bình Phước',
        'Hiệp Phú',
        'Linh Chiểu',
        'Linh Đông',
        'Linh Tây',
        'Linh Trung',
        'Linh Xuân',
        'Long Bình',
        'Long Phước',
        'Long Thạnh Mỹ',
        'Long Trường',
        'Phú Hữu',
        'Phước Bình',
        'Phước Long A',
        'Phước Long B',
        'Tam Bình',
        'Tam Phú',
        'Tân Phú',
        'Tăng Nhơn Phú A',
        'Tăng Nhơn Phú B',
        'Thạnh Mỹ Lợi',
        'Thảo Điền',
        'Thủ Thiêm',
        'Trường Thạnh',
        'Trường Thọ',
      ]
    },
    {
      title: 'Huyện Bình Chánh',
      values: [
        'Thị trấn Tân Túc',
        'An Phú Tây',
        'Bình Chánh',
        'Bình Hưng',
        'Bình Lợi',
        'Đa Phước',
        'Hưng Long',
        'Lê Minh Xuân',
        'Phạm Văn Hai',
        'Phong Phú',
        'Qui Đức',
        'Tân Kiên',
        'Tân Nhựt',
        'Tân Quý Tây',
        'Vĩnh Lộc A',
        'Vĩnh Lộc B',
      ]
    },
    {
      title: 'Huyện Cần Giờ',
      values: [
        'Thị trấn Cần Thạnh',
        'An Thới Đông',
        'Bình Khánh',
        'Long Hòa',
        'Lý Nhơn',
        'Tam Thôn Hiệp',
        'Thạnh An',
      ]
    },
    {
      title: 'Huyện Củ Chi',
      values: [
        'Thị trấn Củ Chi',
        'An Nhơn Tây',
        'An Phú',
        'Bình Mỹ',
        'Hòa Phú',
        'Nhuận Đức',
        'Phạm Văn Cội',
        'Phú Hòa Đông',
        'Phú Mỹ Hưng',
        'Phước Hiệp',
        'Phước Thạnh',
        'Phước Vĩnh An',
        'Tân An Hội',
        'Tân Phú Trung',
        'Tân Thạnh Đông',
        'Tân Thạnh Tây',
        'Tân Thông Hội',
        'Thái Mỹ',
        'Trung An',
        'Trung Lập Hạ',
        'Trung Lập Thượng',
      ]
    },
    {
      title: 'Huyện Hóc Môn',
      values: [
        'Thị trấn Hóc Môn',
        'Bà Điểm',
        'Đông Thạnh',
        'Nhị Bình',
        'Tân Hiệp',
        'Tân Thới Nhì',
        'Tân Xuân',
        'Thới Tam Thôn',
        'Trung Chánh',
        'Xuân Thới Đông',
        'Xuân Thới Sơn',
        'Xuân Thới Thượng',
      ]
    },
    {
      title: 'Huyện Nhà Bè',
      values: [
        'Thị trấn Nhà Bè',
        'Hiệp Phước',
        'Long Thới',
        'Nhơn Đức',
        'Phú Xuân',
        'Phước Kiển',
        'Phước Lộc',
      ]
    },
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
      toast.show("Bắt buộc nhập địa chỉ!", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!district) {
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
        district:district
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
          setDistrict("");
          setWard("");
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
              data={districts}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);
                setDistrict(selectedItem)
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text
                      style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) || 'Quận / Huyện'}
                    </Text>
                    <Icon
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      style={styles.dropdownButtonArrowStyle}
                    />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                    <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />

            <SelectDropdown
              data={[...(districts.find((d) => d.title == district.title) || {value: []}).value]}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);
                // setDistrict(selectedItem)
                setWard(selectedItem)
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text
                      style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && [...(districts.find((d) => d.title == district.title) || {value: []}).value].includes(selectedItem)) ? selectedItem : 'Phường / Xã'}
                    </Text>
                    <Icon
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      style={styles.dropdownButtonArrowStyle}
                    />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                    <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                    <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
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