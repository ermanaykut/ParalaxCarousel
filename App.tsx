import {
  View,
  Text,
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('screen');

const items = [
  {
    id: 1,
    image: require('./src/assets/ayasofya.png'),
    title: 'Ayasofta Cami',
  },
  {
    id: 2,
    image: require('./src/assets/galata.png'),
    title: 'Galata Kulesi',
  },
  {
    id: 3,
    image: require('./src/assets/topkapi.png'),
    title: 'Topkapı Sarayı',
  },
  {
    id: 4,
    image: require('./src/assets/dolmabahce.png'),
    title: 'Dolmabahçe Sarayı',
  },
  {
    id: 5,
    image: require('./src/assets/yerebatan.png'),
    title: 'Yerebatan Sarnıcı',
  },
];

const App = () => {
  const scrollAnimation = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <Animated.FlatList
        data={items}
        bounces={false}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any) => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollAnimation}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            width * (index - 1),
            width * index,
            width * (index + 1),
          ];
          return (
            <View style={styles.item}>
              <Animated.Image
                source={item.image}
                style={[
                  styles.image,
                  {
                    transform: [
                      {
                        translateX: scrollAnimation.interpolate({
                          inputRange: [
                            width * (index - 1),
                            width * index,
                            width * (index + 1),
                          ],
                          outputRange: [-width * 0.5, 0, width * 0.5],
                        }),
                      },
                    ],
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.titleContainer,
                  {
                    opacity: scrollAnimation.interpolate({
                      inputRange,
                      outputRange: [0, 1, 0],
                    }),
                    transform: [{
                      translateX: scrollAnimation.interpolate({
                        inputRange,
                        outputRange: [250,0,-250],
                      })
                    }]
                  },
                ]}>
                <Text style={styles.title}>{item.title}</Text>
              </Animated.View>
              <Animated.View style={[StyleSheet.absoluteFillObject,styles.itemOverlay]}/>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  item: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width,
    height,
  },
  image: {
    width,
    height,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 80,
    zIndex:1,
    backgroundColor:'rgba(255,255,255,0.2)',
    padding:10,
    borderRadius:8,

  },
  title: {
    fontSize: 24,
    fontWeight:'600',
    fontVariant:['small-caps'],
    color: '#ffff',
  },
  itemOverlay:{
    backgroundColor:'rgba(0,0,0,0.2)'

  },
});

export default App;
