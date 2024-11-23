import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const Tag = ({tagname}) => (
  <View style={styles.tag}>
    <Text style={{ fontSize: 15, color: '#2b261f', fontWeight: 'bold' }}>{tagname}</Text>
  </View>
);

const DATA = [
  {
    id: '1',
    tagname: 'Basketball',
  },
  {
    id: '2',
    tagname: 'Reels',
  },
  {
    id:'3',
    tagname: 'Climbing',
  },
  {
    id:'4',
    tagname: 'Dinner'
  },
  {
    id:'5',
    tagname: 'Free Food',
  },
];

const SATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

// Comment out lines 61-77 if you want to look at the default screen
export default function App() {
  return (
    <>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <View style={styles.eventbox}>
        <Text style={{ fontSize: 30 }}>Food Court</Text>
        <Text style={{ fontSize: 20 }}>Host: RA Alex</Text>
        <Text style={{ fontSize: 20 }}>Date: 12/3/24</Text>
        <Text style={{ fontSize: 20 }}>Time: 6:00 PM EST</Text>
        <Text style={{ fontSize: 20 }}>Tags: </Text>
        <View style={styles.tagbox}>
          <StatusBar style="auto" />
          <FlatList
          data={DATA}
          renderItem={({item}) => <Tag tagname={item.tagname} />}
          keyExtractor={item => item.id}
          numColumns={3}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventbox: {
    width: 350,
    height: 300,
    backgroundColor: '#e8e0df',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2, // Width of the outline
    borderColor: 'black', // Color of the outline
    // Add more styles as needed (e.g., border, shadow)
  },
  tagbox: {
    width: 325,
    height: 100,
    backgroundColor: '#e8e0d5',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2, // Width of the outline
    borderColor: 'black', // Color of the outline
    // Add more styles as needed (e.g., border, shadow)
  },
  tag: {
    width: 100,
    height: 25,
    backgroundColor: '#d1c3b0',
    padding: 0,
    borderRadius: 10,
    borderWidth: 2, // Width of the outline
    borderColor: 'black', // Color of the outline
    alignItems: 'center',
    justifyContent: 'center',
    // Add more styles as needed (e.g., border, shadow)
  },
});
