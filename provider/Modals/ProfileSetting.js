
import { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import Text from '../../components/MyText';
import { styled } from 'nativewind';
import { Modal} from '../../components/Modal'
import { _updateProfile } from '../../apis';
const ProfileInput = styled(TextInput, "mb-[5] py-[9px] px-[14px] rounded-[8px] border-[1px] border-[#26225940] text-[#262259] text-[16px]");

export default function ProfileSetting({show, setShow, details, cb}) {
    const [fableName, setFableName] = useState(details?.username);
    const [bio, setBio] = useState(details?.userBio);
    const [FBName, setFBName] = useState(details?.fbLink);
    const [twitterName, setTwitterName] = useState(details?.twitterLink);
    const [instName, setInstName] = useState(details?.instaLink);
    const [LIName, setLIName] = useState(details?.linkedinLink);

    useEffect(() => {
        setFableName(details?.username);
        setBio(details?.userBio);
        setFBName(details?.fbLink);
        setTwitterName(details?.twitterLink);
        setInstName(details?.instaLink);
        setLIName(details?.linkedinLink);

        if(details?.username == null)
            setFableName("");
        if(details?.userBio == null)
            setBio("");
        if(details?.fbLink == null)
            setFBName("");
        if(details?.twitterLink == null)
            setTwitterName("");
        if(details?.instaLink == null)
            setInstName("");
        if(details?.linkedinLink == null)
            setLIName("");
    }, [details, cb])

    const handleSaveChanges = () => {
        _updateProfile(details.id, fableName, bio, FBName, twitterName, instName, LIName)
        .then((res) => {
            if (res.success === 1)
                cb();
        })
        setShow(false);
    }
    return (
    <Modal isVisible={show} closeModal={setShow}>
      <Modal.Container>
          <Modal.Header closeModal={setShow}/>
          <Modal.Body>
                <View className="flex w-full p-[16]">
                    <View className="flex-row justify-center items-center pb-[16]">
                        <Text className="text-[24px] text-[#262259]">Edit Profile</Text>    
                    </View>
                    <View className="pb-[16] flex">
                        <ProfileInput
                            placeholder="Enter Fabler Name"
                            value={fableName}
                            onChangeText={setFableName}
                        />
                    </View>
                    <View className="pb-[16]">
                        <ProfileInput
                            multiline={true}
                            style={{textAlignVertical: 'top' }}
                            rows={4}
                            value={bio}
                            placeholder="Enter Bio"
                            onChangeText={setBio}
                        />
                    </View>
                    <View className="pb-[16] flex">
                        <ProfileInput
                            placeholder="Facebook Username"
                            value={FBName}
                            onChangeText={setFBName}
                        />
                        <ProfileInput
                            placeholder="Twitter Username"
                            value={twitterName}
                            onChangeText={setTwitterName}
                        />
                        <ProfileInput
                            placeholder="Instagram Username"
                            value={instName}
                            onChangeText={setInstName}
                        />
                        <ProfileInput
                            placeholder="LinkedIn Username"
                            value={LIName}
                            onChangeText={setLIName}
                        />
                    </View>
                    <TouchableOpacity onPress={handleSaveChanges} className="bg-[#6D61FD] h-[50] justify-center items-center w-full" style={{ borderRadius: 8 }}>
                        <View className="flex-row">
                            <Text className="text-[16px] text-[#fff]">Save Changes</Text>
                        </View>
                    </TouchableOpacity>
                </View>
          </Modal.Body>
      </Modal.Container>
    </Modal>
/*     <View className="rounded-t-[10px] fixed bg-[#eeedf0] bottom-0 left-0 w-full p-[5] h-[288px] z-[5]">
        <View className="rounded-t-[10px] flex flex-row h-[72px] w-full">
            <Image 
                source={{uri : props.details.photo}}
                className="w-[80px] h-[80px] rounded-tl-[10px] bg-center bg-cover relative"
            />
            <View className="px-[16] py-[8]">
                <SecondaryText className="pb-[2] text-[#706d8b]">{props.details.author}</SecondaryText>
                
            </View>
            <View className="px-[16] py-[8] ml-auto">
              <MaterialIcon name="close" size={20} color="#000"/>
            </View>
            
        </View>
        <View className="flex px-6 pt-4">
            <PrimaryText className="mr-auto">{props.details.title}</PrimaryText>
        </View>
        <View className="w-full px-6 h-[32px]">
          <AudioSlider audio={props.details.audioFile}  step={step} show={props.show}/>
        </View>
    </View> */
/*     <View className="absolute w-full bottom-[0] bg-[#f00] z-[5]">
       <View className="rounded-t-[10px] bg-[#eeedf0] bottom-0 left-0 w-full h-[288px] z-[5]">
        <View className="h-[72px] w-full">
        </View>
        <View className="w-full px-6 h-[32px]">
          <AudioSlider audio={props.details.audioFile}  step={step} show={props.show}/>
        </View>
      </View>
  </View> */
  )
}