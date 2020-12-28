import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

export default function House(props) {
 return (
   <View style={styles.container}>
     <View>
       <Image
       source={props.cover}
       style={styles.cover}
       />
     </View>

    <View style={styles.content}>
      <Text style={styles.description}>
{props.description}
      </Text>
      <Text style={styles.price}>
        {`R$ ${props.value}`}
      </Text>
    </View> 

   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    width: 260,
    height: 70,
    backgroundColor: '#FFF',
    elevation: 2,
    padding: 6,
    marginVertical: 5,
    marginRight: 20,
    marginLeft: 2,
    borderRadius: 10,
  },
  cover:{
    borderRadius: 10,
    width: 60,
    height: 60
  },
  content:{
    width: '65%',
    justifyContent:'flex-end',
    paddingHorizontal: 10,
    height: '100%'
  },
  description:{
    fontSize: 9,
    fontFamily: 'Montserrat_500Medium'
  },
  price:{
    fontSize: 12,
    fontFamily: 'Montserrat_700Bold'
  }
});