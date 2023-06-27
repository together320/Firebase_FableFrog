import { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { PrimaryText } from '../../components/FableText';
import { Modal} from '../../components/Modal'
import { styled } from 'nativewind';
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Text from '../../components/MyText';
import DialogContext from '../../contexts/dialogContext';
export default function ShowSharing(props) {
  const dialogCtx = useContext(DialogContext);
    const handleWhatsapp = () => {
      console.log("whats app");
      Linking.openURL(`https://wa.me/?text=Here I found a fable: ${props.title} ${props.url}`);
    }

    const handleFaceBook = () => {
      console.log("face book");
      Linking.openURL(`https://www.facebook.com/sharer.php?u=${props.url}&t=Here I found a fable: ${props.title}`);
    }

    const handleTwitter = () => {
      console.log("twitter");
      Linking.openURL(`https://twitter.com/share?url=${props.url}&text=Here I found a fable: ${props.title}`);
    }

    const handleCopyLink = async () => {
      console.log("copy link");
      await Clipboard.setStringAsync(props.url);
      dialogCtx.showToast("Link Copied");
    }

    return (
      <Modal isVisible={props.show} closeModal={props.setShow}>
        <Modal.Container>
            <Modal.Header closeModal={props.setShow}/>
            <Modal.Body>
              <View className="flex w-full">
                <View className="flex-row justify-center items-center pb-[40]">
                  <PrimaryText className="text-[24px] pt-[10]">Share this Fable</PrimaryText>
                </View>
                <View className="flex-row px-[20] justify-around">
                    <Fontisto name="whatsapp" size={32} color="#262259" onPress={handleWhatsapp}/>
                    <FontAwesome name="facebook-square" size={32} color="#262259" onPress={handleFaceBook}/>
                    <FontAwesome name="twitter" size={32} color="#262259" onPress={handleTwitter}/>
                    <TouchableOpacity className="h-[50]w-[120] ml-[15] border-[2px] border-[#262259]" style={{ borderRadius: 8 }} onPress={handleCopyLink}>
                        <View className="flex-row justify-center items-center px-[16] py-[4]">
                          <MaterialIcon name="link" size={20} color="#262259"/>
                            <Text className="text-[16px] text-[#262259]">Copy Link</Text>
                        </View>
                    </TouchableOpacity>
                </View>
              </View>
            </Modal.Body>
        </Modal.Container>
      </Modal>
    )
}