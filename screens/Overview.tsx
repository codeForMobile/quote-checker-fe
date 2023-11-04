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
            {loading? <Text>Loading...</Text>:<Text>{JSON.stringify(data)}</Text> }
        </ScrollView>
    )
}

export default Overview