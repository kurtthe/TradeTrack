import React, {useState} from 'react';
import { View } from 'react-native'
import { DownloadButton } from './DownloadButton'
import { SearchAccount } from './SearchAccount'
import { SearchHome } from './SearchHome'
import { SearchProducts } from './SearchProducts'
import { Block } from 'galio-framework';
import Loading from '@custom-elements/Loading';
import { GeneralRequestService } from '@core/services/general-request.service';
import BottomModal from '@custom-elements/BottomModal';
import PdfViewer from '@custom-elements/PdfViewer';
import { useSelector } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {AlertService} from '@core/services/alert.service';

export const Icons = ({ navigation, headerType, white, urlDownloadFile }) => {
  const alertService = useState(new AlertService())

  const clientFriendly = useSelector((state) => state.productsReducer.clientFriendly)
  const restricted = useSelector((state) => state.filterReducer.restricted)
  const [showModalBottom, setShowModalBottom] = useState(false)
  const [urlFilePdf, setUrlFilePdf] = useState()
  const [loadingLoadPdf, setLoadingLoadPdf] = useState(false)
  const [generalRequestService] = useState(GeneralRequestService.getInstance())

  const openViewerPdf = async () => {
    if(!urlDownloadFile){
      alertService.show('Alert!', 'Try Again Later');
      return;
    }
    setLoadingLoadPdf(true)
    const result = await generalRequestService.get(urlDownloadFile);
    setShowModalBottom(true)
    setUrlFilePdf(result)
    setLoadingLoadPdf(false)
  };
  
  const renderIcon = () => {

    switch (headerType) {
      case 'Home':
        return (
          <View style={{ top: 5.5 }}>
            <SearchHome key="basket-home" navigation={navigation} isWhite={white} />
          </View>
        );

      case 'Products':
        return (
          <View style={{ top: 6.5 }}>
            {!restricted &&
              <SearchProducts
                key="basket-deals"
                navigation={navigation}
                isWhite={white}
                myPrice={clientFriendly}
              />
            }
          </View>
        );

      case 'Account':
        return (
          <View style={{ top: 5.5 }}>
          </View>
        );

      case 'Product':
        return <Block row style={{ paddingTop: 17.5, width: 50 }} />;

      case 'SearchHome':
        return <SearchHome key="basket-search" navigation={navigation} isWhite={white} />;

      case 'SearchProducts':
        return <SearchProducts key="basket-search" navigation={navigation} isWhite={white} />;

      case 'Details':
        return [
          <View style={{ top: 7, width: 50 }} />
        ];

      default:
        break;
    }
  };

  return <>
    {renderIcon()}
    </>
}
