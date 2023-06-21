import React, {ForwardRefRenderFunction, forwardRef, useMemo} from 'react';
import {Text} from '../../../../components';
import Animated from 'react-native-reanimated';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';
import {Location, LocationsScreenProps} from '../../../../types';
import {
  TouchableOpacity,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import {useActions} from '../../../../hooks/useActions';
import {useNavigation} from '@react-navigation/native';
import {createStyles} from './LocationsList.styles';
import {MARGIN_HORIZONTAL, PADDING_VERTICAL} from '../../../../constants';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

const LocationRenderItem: React.FC<RenderItemParams<Location>> = ({
  item,
  drag,
  isActive,
}) => {
  const {removeLocationById, selectLocation, setIsManualLocationSelection} =
    useActions();
  const navigation = useNavigation<LocationsScreenProps['navigation']>();

  const handleDeleteLocationPressed = () => {
    removeLocationById(item.id);
  };

  const handleLocationPressed = () => {
    selectLocation(item);
    setIsManualLocationSelection(false);
    navigation.navigate('Home');
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
    active: {
      backgroundColor: '#eee',
    },
  });

  return (
    <TouchableOpacity
      onLongPress={drag}
      disabled={isActive}
      style={[isActive && styles.active]}>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={handleLocationPressed}>
          <Text>{item.displayName}</Text>
          <Text>{item.additionalInfo}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteLocationPressed}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

type ScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

export interface LocationsListProps {
  onScrollHandler: ScrollHandler;
}

const AnimatedDraggableFlatList = Animated.createAnimatedComponent(
  DraggableFlatList<Location>,
);

const LocationsList: ForwardRefRenderFunction<
  Animated.FlatList<LocationsListProps>,
  LocationsListProps
> = ({onScrollHandler}, ref: React.ForwardedRef<any>) => {
  const styles = useMemo(() => createStyles(), []);
  const savedLocations = useTypedSelector(state => state.locations.saved);

  return (
    <View style={styles.mainContainer}>
      <AnimatedDraggableFlatList
        ref={ref}
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        onScroll={onScrollHandler}
        data={savedLocations}
        renderItem={LocationRenderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default forwardRef(LocationsList);
