/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

const Sort = ({isVisible, onClose, onSortByName, onSortByNumber}: any) => {
  //
  const [checkNumberState, setCheckNumberState] = useState(
    require('../../../res/images/checked_circle.png'),
  );
  const [checkNameState, setCheckNameState] = useState(
    require('../../../res/images/unchecked_circle.png'),
  );
  //
  return (
    <Modal
      animationIn="fadeIn"
      animationInTiming={200}
      animationOut="fadeOut"
      hasBackdrop={false}
      coverScreen={false}
      isVisible={isVisible}
      onBackdropPress={() => {
        onClose();
      }}
      onBackButtonPress={() => {
        onClose();
      }}
      onModalHide={() => {
        onClose();
      }}>
      <View
        style={{
          backgroundColor: '#DC0A2D',
          borderRadius: 12,
          borderWidth: 0.5,
          borderColor: 'grey',
          right: 40,
          top: 40,
          width: 130,
          height: 150,
          position: 'absolute',
          zIndex: 1,
        }}>
        <Text
          style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 20,
            paddingLeft: 20,
            paddingVertical: 20,
          }}>
          Sort by:
        </Text>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            flex: 1,
            width: '90%',
            marginHorizontal: 6,
            marginBottom: 6,
            borderRadius: 12,
            paddingLeft: 15,
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              if (
                checkNumberState ===
                require('../../../res/images/unchecked_circle.png')
              ) {
                setCheckNumberState(
                  require('../../../res/images/checked_circle.png'),
                );
                setCheckNameState(
                  require('../../../res/images/unchecked_circle.png'),
                );
                onSortByNumber();
              }
            }}>
            <View style={{flexDirection: 'row', paddingVertical: 12}}>
              <Image source={checkNumberState} style={{marginTop: 3}} />
              <Text style={{fontWeight: '600', paddingHorizontal: 10}}>
                Number
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              if (
                checkNameState ===
                require('../../../res/images/unchecked_circle.png')
              ) {
                setCheckNameState(
                  require('../../../res/images/checked_circle.png'),
                );
                setCheckNumberState(
                  require('../../../res/images/unchecked_circle.png'),
                );
                onSortByName();
              }
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image source={checkNameState} style={{marginTop: 3}} />
              <Text style={{fontWeight: '600', paddingHorizontal: 10}}>
                Name
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default Sort;
