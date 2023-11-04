import { gql, useLazyQuery } from '@apollo/client';
import { FC, useState } from 'react'
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'

import {VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryTheme} from '../modules/charts'

const styles = StyleSheet.create({
    searchOuter: {
        backgroundColor: "#555"
    },
    searchInner: {
        flexDirection: "row",
        margin:15
    },
    input: {
        backgroundColor: "#fff",
        borderTopLeftRadius:8,
        borderBottomLeftRadius: 8,
        flex:1,
        padding:8
    },
    buttons: {
        alignItems: "center",
        backgroundColor: "orange",
        borderRadius: 0,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: "center",
        height: 44 
    },
    buttonText: {
        color: "#000",
        fontWeight: "500",
    }
});

const Overview: FC = () => {
    const [symbol, setSymbol] = useState("")

    const [execQuery, {data, loading, error}] = useLazyQuery(gql`
        query Lookup($symbol: String!) {
        lookup(symbol: $symbol) {
            symbol
            revenue(resolutions: quarterly) {
            date
            value
            }   
        }
      }
    `);

    if (error) return <Text>{error.message}</Text>

    const chartData = [
        {quarter: 1, earnings: 13000},
        {quarter: 2, earnings: 16500},
        {quarter: 3, earnings: 14250},
        {quarter: 4, earnings: 19000}
      ];

    return (
        <ScrollView>
            <View style={styles.searchOuter}>
                <SafeAreaView style={styles.searchInner}>
                    <TextInput
                    style={styles.input}
                    value={symbol}
                    onChangeText={setSymbol}
                    />
                    <Pressable
                    accessibilityLabel='GO'
                    accessibilityRole='button'
                    style={styles.buttons}
                    onPress={() => execQuery({ variables: {symbol}})}
                    >
                    <Text style={styles.buttonText}>Go</Text>
                    </Pressable>
                </SafeAreaView>
            </View>
            {loading? <Text>Loading...</Text>: <View>
            <VictoryChart
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={20}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryBar
          data={chartData}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
            </View> }
        </ScrollView>
    )
}

export default Overview