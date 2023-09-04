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
import {useActionSheet} from '@expo/react-native-action-sheet';

import {useActions} from '../../../../hooks/useActions';
import {createStyles} from './LocationsList.styles';
import * as NavigationService from 'react-navigation-helpers';
import {
  MARGIN_HORIZONTAL,
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../../../shared/constants';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {SCREENS} from '../../../../shared/screens';
import {useTheme} from '@react-navigation/native';

const LocationRenderItem: React.FC<RenderItemParams<Location>> = ({
  item,
  drag,
  isActive,
  getIndex,
}) => {
  const isEditing = useTypedSelector(
    state => state.screens.locationsScreen.isEditing,
  );
  const {colors} = useTheme();
  const {showActionSheetWithOptions} = useActionSheet();

  const {removeLocationById, selectLocation, setIsManualLocationSelection} =
    useActions();

  const handleDeleteLocationPressed = () => {
    const options = ['Delete', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        title: `Are you sure you would like to delete ${item.displayName} location?`,
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        containerStyle: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          elevation: 6,
          paddingBottom: 50,
        },
        separatorStyle: {
          height: 1,
          backgroundColor: colors.border,
          width: '100%',
        },
        showSeparators: true,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            // Delete
            removeLocationById(item.id);
            break;
          case cancelButtonIndex:
          // Cancel
        }
      },
    );
  };

  const handleLocationPressed = () => {
    selectLocation(item);
    setIsManualLocationSelection(false);
    NavigationService.navigate(SCREENS.HOME);
  };

  const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: PADDING_VERTICAL * 2,
      marginLeft: MARGIN_HORIZONTAL,
      paddingRight: PADDING_HORIZONTAL,
      backgroundColor: colors.card,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },
    locationInfoContainer: {
      flex: 1,
    },
    deleteButton: {
      alignSelf: 'center',
      paddingVertical: PADDING_VERTICAL,
      marginRight: MARGIN_HORIZONTAL / 1.5,
      backgroundColor: colors.destructive,
      borderRadius: 15,
      height: 24,
      width: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dragButton: {
      alignSelf: 'center',
      justifyContent: 'center',
    },
    active: {
      backgroundColor: colors.card,
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
              <FeatherIcon color={'white'} size={12} name="minus" />
            </TouchableOpacity>
          </Animated.View>
        )}
        <TouchableOpacity
          style={styles.locationInfoContainer}
          onPress={handleLocationPressed}>
          <Text>{item.displayName}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            fontSize={14}
            color="inactive">
            {item.additionalInfo}
          </Text>
        </TouchableOpacity>
        {isEditing && (
          <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
            <Pressable hitSlop={8} onPressIn={drag} style={styles.dragButton}>
              <MaterialIcon size={22} name="drag-indicator" />
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
        bounces={false}
        onDragEnd={({data}: {data: Location[]}) => reorderLocations(data)}
        contentContainerStyle={{paddingBottom: 85, paddingTop: 5}}
        data={savedLocations || []}
        renderItem={LocationRenderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default LocationsList;
