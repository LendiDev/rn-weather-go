import {FlatList} from 'react-native-gesture-handler';
import ListItem from './ListItem/ListItem';
import {useStyles} from './LocationsList.styles';
import {Separator} from '../../../../../components';
import {useTypedSelector} from '../../../../../hooks/useTypedSelector';
import {useEffect, useRef} from 'react';
import {Location} from '../../../../../types';

interface ScrollError {
  index: number;
  highestMeasuredFrameIndex: number;
  averageItemLength: number;
}

const LocationsList = () => {
  const styles = useStyles();
  const {saved: savedLocation, selectedLocation} = useTypedSelector(
    state => state.locations,
  );

  const listRef = useRef<FlatList<Location>>(null);

  useEffect(() => {
    if (savedLocation.length > 0) {
      scrollToSelectedLocationIndex();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation]);

  const scrollToSelectedLocationIndex = (error?: ScrollError) => {
    listRef.current?.scrollToIndex({
      index: error
        ? error.index
        : savedLocation.findIndex(
            location => location.id === selectedLocation?.id,
          ),
      viewPosition: 0.5,
    });
  };

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
    }, 50);
  };

  return (
    <FlatList
      ref={listRef}
      style={styles.root}
      contentContainerStyle={styles.contentContainer}
      data={savedLocation}
      renderItem={({item, index}) => <ListItem item={item} index={index} />}
      onScrollToIndexFailed={handleScrollToIndexFailed}
      horizontal
      ItemSeparatorComponent={() => Separator({width: 5})}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default LocationsList;
