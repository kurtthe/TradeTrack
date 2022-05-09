import React from 'react';
import { View } from 'react-native'
import { DownloadButton } from './DownloadButton'
import { SearchAccount } from './SearchAccount'
import { SearchHome } from './SearchHome'
import { SearchProducts } from './SearchProducts'
import { Block } from 'galio-framework';

export const Icons = ({ navigation, title, white }) => {
  const renderRight = () => {

    switch (title) {
      case 'Home':
        return (
          <View style={{ top: 5.5 }}>
            <SearchHome key="basket-home" navigation={navigation} isWhite={white} />
          </View>
        );

      case 'Products':
        return (
          <View style={{ top: 6.5 }}>
            <SearchProducts
              key="basket-deals"
              navigation={navigation}
              isWhite={white}
              myPrice={this.props.scene.route.params?.myPrice}
            />
          </View>
        );

      case 'Account':
        return (
          <View style={{ top: 5.5 }}>
            <SearchAccount key="basket-home" navigation={navigation} isWhite={white} />
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

          <View style={{ top: 7, width: 50 }}>
            {this.state.loadingLoadPdf ? (
              <Loading />
            ) : (
              <DownloadButton isWhite={white} onPress={() => this.openViewerPdf()} />
            )}

            <BottomModal
              show={this.state.showModalBottom}
              close={() => this.setState({ showModalBottom: false })}
              downloadShared={{
                url: this.props.scene.route.params?.urlDownloadFile,
              }}
            >
              <View style={{ height: hp('80%') }}>
                <PdfViewer url={this.state.urlFilePdf} />
              </View>
            </BottomModal>
          </View>
        ];

      default:
        break;
    }
  };

  return renderRight();
}