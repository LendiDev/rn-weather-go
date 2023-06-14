import {Suggestion} from '../../../../../types/hereAPI.types';
import {Text} from '../../../../../components';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useStyles} from './SearchLocationsItem.styles';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useLazyGetCoordinatesByIdQuery} from '../../../../../store/api/locationGeocode.api';
import {Location} from '../../../../../types';
import {useActions} from '../../../../../hooks/useActions';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';

interface SearchLocationsItemProps {
  index: number;
  item: Suggestion;
  lastItemIndex: number;
}

const SearchLocationsItem: React.FC<SearchLocationsItemProps> = ({
  item,
  index,
  lastItemIndex,
}) => {
  const {addLocation} = useActions();
  const [getCoordinates] = useLazyGetCoordinatesByIdQuery();
  const {setIsSearching} = useActions();
  const styles = useStyles();
  // TODO: Fix type
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();

  const isLastItem = index === lastItemIndex;

  const handleLocationPressed = () => {
    getCoordinates(item.locationId)
      .unwrap()
      .then(coordinates => {
        const labelArray = item.label.split(', ');
        const displayName = labelArray[0];
        labelArray.shift();
        const additionalInfo = labelArray.join(', ');

        const locationDetails: Location = {
          id: item.locationId,
          displayName,
          additionalInfo,
          coordinates,
        };

        addLocation(locationDetails);
        setIsSearching(false);
        navigation.navigate('Home');
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <Animated.View
      style={styles.mainContainer}
      entering={FadeIn}
      exiting={FadeOut.duration(100)}>
      <TouchableOpacity onPress={handleLocationPressed}>
        <Text fontSize={14} style={styles.labelText}>
          {item.label}
        </Text>
      </TouchableOpacity>
      {!isLastItem && <View style={styles.separatorLine} />}
    </Animated.View>
  );
};

export default SearchLocationsItem;
