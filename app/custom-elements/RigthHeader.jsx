import React from 'react';



renderRight = () => {
  const { white, title, navigation } = this.props;

  if (title === 'Title') {
    return [
      <BellButton key="chat-title" navigation={navigation} isWhite={white} />,
      <BasketButton key="basket-title" navigation={navigation} isWhite={white} />,
    ];
  }
  switch (title) {

    case 'Categories':
      return <BasketButton key="basket-home" navigation={navigation} isWhite={white} />;
    case 'Category':
      return (
        <View style={{ top: 5.5 }}>
          <BasketButton key="basket-home" navigation={navigation} isWhite={white} />
        </View>
      );
    case 'Profile':
      return (
        <>
          <BellButton key="chat-profile" navigation={navigation} isWhite={white} />
          <BasketButton key="basket-deals" navigation={navigation} isWhite={white} />
        </>
      );
    case 'Account':
      return (
        <View style={{ top: 5.5 }}>
          <BasketButton key="basket-home" navigation={navigation} isWhite={white} />
        </View>
      );
    case 'Products':
      return (
        <View style={{ top: 5.5 }}>
          <BasketButton key="basket-home" navigation={navigation} isWhite={white} />
        </View>
      );
    case 'Product':
      return (
        <Block row style={{ paddingTop: 17.5, width: 50 }}>
          <CartButton isWhite={white} />
          <ConfigButton isWhite={white} />
        </Block>
      );
    case 'Cart':
      return (
        <View style={{ top: 11, width: 50 }}>{/* <DeleteButton  isWhite={white} /> */}</View>
      );

    case 'Search':
      return <BasketButton key="basket-search" navigation={navigation} isWhite={white} />;

    case 'Invoice Details':
      return (
        <View style={{ top: 7, width: 50 }}>
          <DownloadButton isWhite={white} />
        </View>
      );

    case 'Bathroom':
      return (
        <View style={{ top: 5.5 }}>
          <BasketButton key="basket-home" navigation={navigation} isWhite={white} />
        </View>
      );

    default:
      return (
        <View style={{ top: 5.5 }}>
          <BasketButton key="basket-home" navigation={navigation} isWhite={white} />
        </View>
      );
  }
};
