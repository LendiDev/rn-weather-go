import React from 'react';
import {Text} from '../../../../components';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';
import {FlatList} from 'react-native-gesture-handler';
import {Location} from '../../../../types';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {useActions} from '../../../../hooks/useActions';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';

const LocationRenderItem: React.FC<{
  item: Location;
  handleLocationPressed: (item: Location) => void;
}> = ({item, handleLocationPressed}) => {
  const {removeLocationById} = useActions();

  const handleDeleteLocationPressed = () => {
    removeLocationById(item.id);
  };

  const styles = StyleSheet.create({
    mainContainer: {paddingVertical: 5},
    deleteButton: {
      paddingVertical: 5,
      backgroundColor: 'orange',
      borderRadius: 10,
      width: 65,
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => handleLocationPressed(item)}>
        <Text>{item.displayName}</Text>
        <Text>{item.additionalInfo}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteLocationPressed}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const LocationsList: React.FC = () => {
  // TODO: Fix type
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
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
      exiting={isSearching ? FadeOut : undefined}
      entering={FadeIn}>
      <FlatList
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

export default LocationsList;
