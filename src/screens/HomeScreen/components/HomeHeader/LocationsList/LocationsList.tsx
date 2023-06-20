import ListItem from './ListItem/ListItem';
import {useStyles} from './LocationsList.styles';
import {useTypedSelector} from '../../../../../hooks/useTypedSelector';
import {useCallback, useRef, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

const LocationsList: React.FC = () => {
  const [itemScrollPositions, setItemScrollPositions] = useState<number[]>([]);
  const styles = useStyles();
  const {saved: savedLocations, selectedLocation} = useTypedSelector(
    state => state.locations,
  );

  const listRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      if (savedLocations.length > 0) {
        const index = savedLocations.findIndex(
          location => location.id === selectedLocation?.id,
        );

        setTimeout(() => {
          listRef.current?.scrollTo({
            x: itemScrollPositions[index] - 15,
            y: 0,
            animated: true,
          });
        }, 50);
      }
    }, [itemScrollPositions, savedLocations, selectedLocation]),
  );

  const onLayoutHandler = (e: LayoutChangeEvent, index: number) => {
    const {x} = e.nativeEvent.layout;
    setItemScrollPositions(prevState => {
      const newState = [...prevState];
      newState[index] = x;

      return newState;
    });
  };

  return (
    <ScrollView
      ref={listRef}
      style={styles.root}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      {savedLocations.map((item, index) => {
        return (
          <View key={item.id} onLayout={e => onLayoutHandler(e, index)}>
            <ListItem item={item} selectedLocation={selectedLocation} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default LocationsList;
