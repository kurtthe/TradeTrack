import React, { useEffect, useState } from 'react';
import {SafeAreaView, View} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import WebApp from "@custom-elements/WebApp";
import Loading from '@custom-elements/Loading';
import { GeneralRequestService } from '@core/services/general-request.service';

const generalRequestService = GeneralRequestService.getInstance();

const TradeTrak= () => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [urlView, setUrlView] = useState(undefined);
  const [showPage, setShowPage] = useState(true)

  const handleCloseView = () => {
    navigation.goBack()
    setShowPage(false)
    setUrlView(undefined)
  };

  useFocusEffect(
    React.useCallback(() => {
      handleLoadData()
    }, [])
  );

  useEffect(() => {
    handleLoadData()
  }, []);
  const handleLoadData = () => {
    if(urlView) return
    generalRequestService.get(
      'https://api.tradetrak.com.au/burdens/dashboard',
    ).then((response)=> {
      setUrlView(response.url);
      setShowPage(true)
      setIsLoading(false)
    })
  }

  if(isLoading || !urlView){
    return (
      <SafeAreaView>
        <View style={{padding:10}}>
          <Loading />
        </View>
      </SafeAreaView>
    )
  }

  return  (
    <WebApp onClose={handleCloseView} visible={showPage} url={urlView} />
  )
};

export default TradeTrak;