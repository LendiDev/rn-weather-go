import ListItem from './ListItem/ListItem';
import {useStyles} from './LocationsList.styles';
import {useTypedSelector} from '../../../../../hooks/useTypedSelector';
import {useCallback, useRef, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {MARGIN_HORIZONTAL} from '../../../../../shared/constants';

const LocationsList: React.FC = () => {
  const [itemScrollPositions, setItemScrollPositions] = useState<number[]>([]);
  const {isManualLocationSelection} = useTypedSelector(
    state => state.screens.homeScreen,
  );

  const styles = useStyles();
  const {saved, selectedLocation} = useTypedSelector(state => state.locations);

  const savedLocations = saved || [];
  const listRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      if (savedLocations.length > 0 && !isManualLocationSelection) {
        const index = savedLocations.findIndex(
          location => location.id === selectedLocation?.id,
        );

        setTimeout(() => {
          listRef.current?.scrollTo({
            x: itemScrollPositions[index] - MARGIN_HORIZONTAL,
            y: 0,
            animated: true,
          });
        }, 50);
      }
    }, [
      isManualLocationSelection,
      itemScrollPositions,
      savedLocations,
      selectedLocation?.id,
    ]),
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
      scrollEventThrottle={16}
      style={styles.root}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      {savedLocations &&
        savedLocations.map((item, index) => {
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
