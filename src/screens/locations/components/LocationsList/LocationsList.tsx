import React, {useMemo} from 'react';
import {Text} from '../../../../components';
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';
import {Location} from '../../../../types';
import {TouchableOpacity, StyleSheet, View, Pressable} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {useActions} from '../../../../hooks/useActions';
import {createStyles} from './LocationsList.styles';
import * as NavigationService from 'react-navigation-helpers';
import {
  MARGIN_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../../../shared/constants';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {SCREENS} from '../../../../shared/screens';

const LocationRenderItem: React.FC<RenderItemParams<Location>> = ({
  item,
  drag,
  isActive,
  getIndex,
}) => {
  const isEditing = useTypedSelector(
    state => state.screens.locationsScreen.isEditing,
  );
  const {setIsEditing} = useActions();

  const {removeLocationById, selectLocation, setIsManualLocationSelection} =
    useActions();

  const handleDeleteLocationPressed = () => {
    removeLocationById(item.id);
  };

  const handleLocationPressed = () => {
    selectLocation(item);
    setIsEditing(false);
    setIsManualLocationSelection(false);
    NavigationService.navigate(SCREENS.HOME);
  };

  const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: PADDING_VERTICAL,
      paddingHorizontal: MARGIN_HORIZONTAL,
      backgroundColor: 'white',
      height: 50,
    },
    locationInfoContainer: {
      flex: 1,
    },
    deleteButton: {
      alignSelf: 'center',
      paddingVertical: PADDING_VERTICAL,
      marginRight: MARGIN_HORIZONTAL / 2,
      backgroundColor: '#FF4136',
      borderRadius: 15,
      height: 25,
      width: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dragButton: {
      alignSelf: 'center',
      justifyContent: 'center',
      paddingVertical: PADDING_VERTICAL,
      alignItems: 'center',
      zIndex: 100,
      backgroundColor: 'red',
    },
    active: {
      backgroundColor: '#eee',
    },
  });

  return (
    <ScaleDecorator activeScale={1.03}>
      <View style={styles.mainContainer}>
        {isEditing && (
          <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteLocationPressed}>
              <FeatherIcon color={'white'} size={15} name="minus" />
            </TouchableOpacity>
          </Animated.View>
        )}
        <TouchableOpacity
          style={styles.locationInfoContainer}
          onPress={handleLocationPressed}>
          <Text>{item.displayName}</Text>
          <Text>{item.additionalInfo}</Text>
        </TouchableOpacity>
        {isEditing && (
          <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
            <Pressable
              hitSlop={8}
              onPressIn={drag}
              disabled={isActive}
              delayLongPress={0}
              style={styles.dragButton}>
              <MaterialIcon size={20} name="drag-indicator" />
            </Pressable>
          </Animated.View>
        )}
      </View>
    </ScaleDecorator>
  );
};

const LocationsList: React.FC = () => {
  const styles = useMemo(() => createStyles(), []);
  const savedLocations = useTypedSelector(state => state.locations.saved);

  const {reorderLocations} = useActions();

  return (
    <View style={styles.mainContainer}>
      <DraggableFlatList
        onDragEnd={({data}: {data: Location[]}) => reorderLocations(data)}
        contentContainerStyle={{paddingBottom: 75}}
        data={savedLocations || []}
        renderItem={LocationRenderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default LocationsList;
