import {FlatList} from 'react-native-gesture-handler';
import ListItem from './ListItem/ListItem';
import {useStyles} from './LocationsList.styles';
import {Separator} from '../../../../../components';
import {useTypedSelector} from '../../../../../hooks/useTypedSelector';
import {useCallback, useRef} from 'react';
import {Location} from '../../../../../types';
import {useFocusEffect} from '@react-navigation/native';

interface ScrollError {
  index: number;
  highestMeasuredFrameIndex: number;
  averageItemLength: number;
}

const LocationsList: React.FC = () => {
  const styles = useStyles();
  const {saved: savedLocation, selectedLocation} = useTypedSelector(
    state => state.locations,
  );

  const listRef = useRef<FlatList<Location>>(null);

  const scrollToSelectedLocationIndex = useCallback(
    (error?: ScrollError) => {
      const index = savedLocation.findIndex(
        location => location.id === selectedLocation?.id,
      );

      listRef.current?.scrollToIndex({
        index: error ? error.index : index > 0 ? index : 0,
        viewPosition: 0.5,
        animated: true,
      });
    },
    [savedLocation, selectedLocation?.id],
  );

  // perform action once on focus
  useFocusEffect(
    useCallback(() => {
      if (savedLocation.length > 0) {
        const unsubscribe = scrollToSelectedLocationIndex();

        return () => unsubscribe;
      }
    }, [savedLocation, scrollToSelectedLocationIndex]),
  );

  const scrollToSelectedLocationOffset = (error: ScrollError) => {
    listRef.current?.scrollToOffset({
      offset: error.averageItemLength * error.index,
      animated: true,
    });
  };

  const handleScrollToIndexFailed = (error: ScrollError) => {
    scrollToSelectedLocationOffset(error);

    setTimeout(() => {
      if (savedLocation.length !== 0) {
        scrollToSelectedLocationIndex(error);
      }
    }, 100);
  };

  return (
    <FlatList
      ref={listRef}
      style={styles.root}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={item => item.id}
      data={savedLocation}
      renderItem={({item, index}) => (
        <ListItem
          item={item}
          index={index}
          selectedLocation={selectedLocation}
        />
      )}
      onScrollToIndexFailed={handleScrollToIndexFailed}
      horizontal
      ItemSeparatorComponent={() => Separator({width: 5})}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default LocationsList;
