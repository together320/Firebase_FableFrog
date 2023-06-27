import { useContext, useEffect, useState } from 'react';

import {View, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native'
import { FableTopicItem } from './FableTopicItem';
import {SecondaryText, PrimaryText} from './FableText'
import { _getUserStories } from '../apis';
import Text from './MyText';
import AuthContext from '../contexts/authContext';
import AudioSlider from './FableAudio/AudioSlider'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default function FableTopicContainer({type, value, loading, setLoading, randVal = 0}) {
  const authCtx = useContext(AuthContext);
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);

  const fetchMoreData = () => {
      console.log("fetching more data : " + skip);
      try {
        _getUserStories(type, value, authCtx.getUserId(), skip)
        .then((res) => {
            setDetails(arr => [...arr, ...res.stories]);
            setSkip(skip + res.storiesCount);
            setHasMore(res.moreData);
            setLoading(false);
        })
    } catch(error) {
    }
  }

  useEffect(() => {
      setSkip(0);
      setHasMore(true);
      setDetails([]);
      setLoading(true);
  }, [type, value, randVal])

  useEffect(() => {
      if (loading === true) {
          fetchMoreData();
      }
  }, [loading])
  return (
    <>
    <View className="flex flex-col">
        {details?.map((topic, i) => {
            return <FableTopicItem item={topic} key={i}/>
        })}
        {
            !hasMore ? <View className="flex-row justify-center items-center"><Text>{type == 'SINGLE' ? "" : 'No more fable.'}</Text></View> :
            (loading ? 
            <ActivityIndicator
                size='large'
                visible={loading}
                textContent={'Loading...'}
                textStyle={{color: '#6d61fd'}}
            /> : "")
        }
    </View>    
  </>
  );
}