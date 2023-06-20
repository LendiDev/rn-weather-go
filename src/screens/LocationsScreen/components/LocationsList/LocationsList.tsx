import React, {ForwardRefRenderFunction, forwardRef} from 'react';
import {Text} from '../../../../components';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';
import {Location, LocationsScreenProps} from '../../../../types';
import {
  TouchableOpacity,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useActions} from '../../../../hooks/useActions';
import {useNavigation} from '@react-navigation/native';
import {createStyles} from './LocationsList.styles';
import {MARGIN_HORIZONTAL, PADDING_VERTICAL} from '../../../../constants';

const LocationRenderItem: React.FC<{
  item: Location;
  handleLocationPressed: (item: Location) => void;
}> = ({item, handleLocationPressed}) => {
  const {removeLocationById} = useActions();

  const handleDeleteLocationPressed = () => {
    removeLocationById(item.id);
  };

  const styles = StyleSheet.create({
    mainContainer: {
      paddingVertical: PADDING_VERTICAL,
      marginHorizontal: MARGIN_HORIZONTAL,
    },
    deleteButton: {
      paddingVertical: PADDING_VERTICAL,
      backgroundColor: 'orange',
      borderRadius: 10,
      width: 65,
      alignItems: 'center',
    },
  });

  return (
    <Animated.View
      exiting={FadeOut}
      layout={Layout.duration(50)}
      style={styles.mainContainer}>
      <TouchableOpacity onPress={() => handleLocationPressed(item)}>
        <Text>{item.displayName}</Text>
        <Text>{item.additionalInfo}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteLocationPressed}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

type ScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

export interface LocationsListProps {
  onScrollHandler: ScrollHandler;
}

const LocationsList: ForwardRefRenderFunction<
  Animated.FlatList<LocationsListProps>,
  LocationsListProps
> = ({onScrollHandler}, ref: React.ForwardedRef<any>) => {
  const styles = createStyles();

  const navigation = useNavigation<LocationsScreenProps['navigation']>();
  const savedLocations = useTypedSelector(state => state.locations.saved);
  const {isSearching} = useTypedSelector(
    state => state.screens.locationsScreen,
  );
  const {selectLocation} = useActions();

  const handleLocationPressed = (item: Location) => {
    selectLocation(item);
    navigation.navigate('Home');
  };

  return (
    <Animated.View
      style={styles.mainContainer}
      exiting={isSearching ? FadeOut : undefined}
      entering={FadeIn}>
      <Animated.FlatList
        ref={ref}
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        scrollEventThrottle={1}
        onScroll={onScrollHandler}
        keyExtractor={item => item.id}
        data={savedLocations}
        renderItem={({item}) => (
          <LocationRenderItem
            item={item}
            handleLocationPressed={handleLocationPressed}
          />
        )}
      />
    </Animated.View>
  );
};

export default forwardRef(LocationsList);
