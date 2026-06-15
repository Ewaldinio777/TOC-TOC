import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { supabase } from './lib/supabase'

export default function App() {  

  return (

      <View style={styles.container}>
        <Text>aa</Text>
      </View>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})