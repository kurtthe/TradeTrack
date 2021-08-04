import React from "react";
import {
    StyleSheet,
    Dimensions,
    View, 
    ScrollView
} from "react-native";
import { Block, Text } from "galio-framework";
import { nowTheme } from "@constants/";

const { width } = Dimensions.get("screen");

export default class InvoiceDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            deleteAction: false,
            date: new Date()
        };
    }


    renderDetailProducts = () => {
        const orders = [
            {
                productNo: 'PDV042',
                title: 'Kaya Basin/Bath Wall Mixer 160mm..',
                qtyPrice: '5 x $21.95',
                price: '$375'
            },
            {
                productNo: 'PDV042',
                title: 'Di Lusso 60cm Th601Ss Telescopi..',
                qtyPrice: '1 x $375.00',
                price: '$375.00'
            },
            {
                productNo: 'PDV042',
                title: 'Lillian Basin Set 1/4 Turn Ceramic..',
                qtyPrice: '5 x $205.00',
                price: '$410.00'
            }
        ]
        
        return orders.map((orders) => {
            return (
                <Block keyExtractor={(i) => {index: i}}>
                    <Text style={styles.text}>
                        PRODUCT NO. {orders.productNo}
                    </Text>
                    <Text style={styles.receiptText}>
                        {orders.title}
                    </Text>
                    <Block row style={{ justifyContent: 'space-between', paddingBottom: 7}}>
                        <Text style={styles.grayText}>
                            {orders.qtyPrice}
                        </Text>
                        <Text style={styles.detailPrice}>
                            {orders.price}
                        </Text>
                    </Block>
                </Block>
            )
        })
    }

    render() {
    return (
    <ScrollView style={styles.cart}>
        <Block 
            card 
            backgroundColor={'white'} 
            width={width} 
            paddingTop={10} 
            paddingHorizontal={20}
            paddingBottom={20}
            marginTop={15}
            marginBottom={5}
        >
            <Text style={styles.text}>
                Costumer
            </Text>
            <Text>
                Skilled PGF Maintance P/L
            </Text>
            <Text style={styles.text}>
                Delivery Address
            </Text>
            <Text>
                PO BOX 352 MONBULK VIC
            </Text>
            <Text style={styles.text}>
                Delivery Date
            </Text>
            <Text>
                08 April 2021
            </Text>
        </Block>
        <Block 
            card 
            backgroundColor={'white'} 
            width={width} 
            paddingTop={10} 
            paddingHorizontal={20}
            paddingBottom={20}
            marginBottom={5}
        >
            <Block row>
                <Block flex>
                    <Text style={styles.text}>
                        Invoice Number
                    </Text>
                    <Text>
                        20778891
                    </Text>
                </Block>
                <Block flex>
                    <Text style={styles.text}>
                        Invoice Date
                    </Text>
                    <Text>
                        08 April 2021
                    </Text>
                </Block>
            </Block>
            <Text style={styles.text}>
                Branch
            </Text>
            <Text>
                08 April 2021
            </Text>
            <Text style={styles.text}>
                Account Number
            </Text>
            <Text>
                08 April 2021
            </Text>
        </Block>
        <Block 
            card 
            backgroundColor={'white'} 
            width={width} 
            paddingTop={10} 
            paddingHorizontal={20}
            paddingBottom={20}
            marginBottom={5}
        >
            <Block style={styles.detailOrdersBlock}>
                {this.renderDetailProducts()}
            </Block>
        </Block>
        <Block 
            card 
            backgroundColor={'white'} 
            width={width} 
            paddingTop={20} 
            paddingHorizontal={20}
            paddingBottom={20}
            style={styles.lastCard}
        >
            <Block row style={styles.totalPrices}>
                <Text size={12}>
                    Delivery Fee
                </Text>
                <Text style={styles.receiptPrice}>
                    $0.00
                </Text>
            </Block>
            <Block row style={styles.totalPrices}>
                <Text size={12}>
                    Total Ex GST
                </Text>
                <Text style={styles.receiptPrice}>
                    $894.75
                </Text>
            </Block>
            <Block row style={styles.totalPrices}>
                <Text size={12}>
                    Total GTS
                </Text>
                <Text style={styles.receiptPrice}>
                    $12.25
                </Text>
            </Block>
            <View style={{borderWidth: 0.7, marginVertical: 5, backgroundColor:'#E8E8E8', borderColor:'#E8E8E8'}}/>
            <Block row style={{ justifyContent: 'space-between', paddingBottom: 15, top:10}}>
                <Text size={14}>
                Total Orders
                </Text>
                <Text size={16} color={nowTheme.COLORS.INFO} style={{fontWeight: Platform.OS == 'android' ? 'bold' : '600'}}>
                $894.75
                </Text>
            </Block>
        </Block>
    </ScrollView>
    );
    }
}

const styles = StyleSheet.create({
    cart: {
        width: width,
        backgroundColor: nowTheme.COLORS.BACKGROUND
    },
    text: {
        fontSize: 10,
        paddingTop: 10,
        color: nowTheme.COLORS.PRETEXT
    },
    grayText: {
        color: nowTheme.COLORS.PRETEXT
    },
    detailPrice: {
        fontWeight: Platform.OS == 'android' ? 'bold' : '500'
    },
    receiptText: {
        paddingVertical: 10
    },
    receiptPrice: {
        fontSize: 14,
        fontWeight: Platform.OS == 'android' ? 'bold' : '500'
    },
    totalPrices: { 
        justifyContent: 'space-between', 
        paddingVertical: 10
    },
    lastCard: {
        borderRadius: 20
    }
});