import { useContext, useState, useEffect } from "react";
import { FableSearchItem } from "./FableTopicItem";
import {View, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import * as RootNavigation from '../RootNavigation';
import { PrimaryText } from "./FableText";
import DialogContext from "../contexts/dialogContext";
import AuthContext from "../contexts/authContext";
import { _search } from "../apis";
import Text from "./MyText";

export default function ContentHeader(props) {
    const dialogCtx = useContext(DialogContext);
    const authCtx = useContext(AuthContext);
    const [query, setQuery] = useState("");
    const [details, setDetails] = useState(null);
    const handleSearchChange = (keyword) => {
        setQuery(keyword);
    }

    const handleLostFocus = (e) => {
        setTimeout(() => {
            setQuery("");
        }, 1000);
    }

    useEffect(() => {
        if (query.length > 2) {
          setDetails(null);
          _search(authCtx.getUserId(), query)
          .then((res) => {
              setDetails(res.items);
          })
        }
    }, [query]);

    const renderItem = (item, i) => {
        if (item.type === "user") {
            return <TouchableOpacity key={i} className="flex-row items-center py-[5] px-[10]"  onPress={() => {console.log("asdf");
            RootNavigation.navigate('ProfileScreen', {id: item.id})}}>
                <Image
                    className="mr-2 w-[42px] h-[42px] rounded-[99px] bg-[#00000020]"
                    source={{uri: item.avatar}}
                 />
                <PrimaryText className="mr-auto flex flex-col justify-center text-[#333] !text-[13px]">{item.username}</PrimaryText>
                <View className="bg-[#6D61FD] h-[40] justify-center items-center w-fit px-[10px] ml-[15px]" style={{ borderRadius: 8 }}
                >
                    <View className="flex-row">
                        <Text className="text-[14px] text-[#fff]">View Profile</Text>
                    </View>
                </View>
            </TouchableOpacity>
        }
        else {
            return <TouchableOpacity key={i} onPress={() => {
            setDetails(null); setQuery("");
            RootNavigation.navigate('FableScreen', {id: item.id, randVal : Math.random()})}} className="py-[5] px-[15]">
                <FableSearchItem item={item} key={i}/>
            </TouchableOpacity>
       }
    }

    const renderResult = () => {
        if (query === "")
            return "";
        else
            return <>
            {
                query.length < 3 ? <Text className="bg-[#EEEDF0] text-[#706D8B] p-[9] text-[14px] rounded-[10px] border-[1px] border-[#EEEDF0]">
                    {`Please enter ${3 - query.length} or more characters`}</Text> :
                details === null ? <Text className="bg-[#EEEDF0] text-[#706D8B] p-[9] text-[14px] rounded-[10px] border-[1px] border-[#EEEDF0]">Searching...</Text> :
                <View className="flex flex-col bg-[#EEEDF0] rounded-[10px] border-[1px] border-[#EEEDF0]">
                    {
                        details.map((item, i) => {
                            return renderItem(item, i)
                        })
                    }
                </View>
            }
            </>
    }

    return  <View className="flex flex-col mt-[50] z-[25]" keyboardShouldPersistTaps='handled'>
              <View className="flex flex-row h-[42]" keyboardShouldPersistTaps='handled'>
                  <TextInput
                      className="flex-1 px-[20] py-[10] bg-[#EEEDF0] text-[#6d6d6d] h-[50] text-[13px] rounded-[10px] border-[1px] border-[#EEEDF0]"
                      style={{fontFamily : 'Nunito_400Regular'}}
                      placeholder={"Search for Fables, tags or users."}
                      value={query}
                      setValue={setQuery}
                      onChangeText={handleSearchChange}
                      onBlur={handleLostFocus}
                      placeholderTextColor="#706D8B"
                  />
                  <TouchableOpacity className="bg-[#6D61FD] h-[50] px-[20] py-[10] ml-[15] justify-center" style={{ borderRadius: 8 }}
                  onPress={() => {dialogCtx.showShareYourFable("")}}>
                      <View className="flex-row justify-center items-center">
                          <Text className="text-[16px] text-[#fff]">Record&nbsp;&nbsp;</Text>
                          <MaterialCommunityIcons name="microphone" size={20} color="#fff"/>
                      </View>
                  </TouchableOpacity>
              </View>
              <View className="h-[20]"/>
              <View className="flex">
                {renderResult()}
              </View>
          </View>
}