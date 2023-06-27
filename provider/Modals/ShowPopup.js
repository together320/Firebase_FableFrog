
import { View} from 'react-native';
import { PrimaryText } from '../../components/FableText';
import Text from '../../components/MyText';
import { Modal} from '../../components/Modal'
import { styled } from 'nativewind';

export default function ShowPopup(props) {
    return (
      <Modal isVisible={props.show} closeModal={props.setShow}>
        <Modal.Container>
            <Modal.Header closeModal={props.setShow}/>
            <Modal.Body>
              <View className="flex py-[40] px-[16]">
                <Text className="font-bold text-[#000] text-[17px]">
                    About Topics{'\n'}
                </Text>
                <Text className="text-[#000] text-[17px]">
                    The various topics keywords will help you find fables of similar nature.{'\n'}
                </Text>
                <Text className="text-[#000] text-[17px]">
                    The various topics keywords will help you find fables of similar nature.{'\n'}
                </Text>
                <Text className="text-[#000] text-[17px]">
                    This will make it easier for you to <Text className="font-bold">find fables</Text> instead of having to go to the specific topic page in order to find them.
                </Text>
              </View>
                {/* 
                    {'\n'}{'\n'}
                    The various topics keywords will help you find fables of similar nature.
                    {'\n'}{'\n'}
                    Tracking a topic will send fables of that topic to your home page for listening.
                    {'\n'}{'\n'}
                    This will make it easier for you to find fables instead of having to go to the specific topic page in order to find them.
                </Text> */}
            </Modal.Body>
        </Modal.Container>
      </Modal>
    )
}