import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import {Button, Text, TextInput, View} from 'react-native'

const Dashboard: React.FC = () => {
    const [symbol, setSymbol] = useState('')
    const [getQuote, {data, loading, error}] = useMutation(gql`
        mutation($symbol: String!){
            quote(symbol: $symbol){
                change
                changePercent
                companyName
                peRatio
                symbol
                previousClose
            }
        }
    `);
    return (<View>
                <TextInput value={symbol} onChangeText={setSymbol}/>
                <Button onPress={() => getQuote({
                    variables: {symbol}
                })} title="Get Quote"/>
                <Text>{JSON.stringify(error || data)}</Text>
            </View>)
}

export default Dashboard