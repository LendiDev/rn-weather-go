import {Suggestion} from '../../../../../types/hereAPI.types';
import {Text} from '../../../../../components';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useStyles} from './SearchLocationsItem.styles';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {useActions} from '../../../../../hooks/useActions';
import {useLazyGetCoordinatesByIdQuery} from '../../../../../store/api/locationGeocode.api';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {Location} from '../../../../../types';

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
  // TODO: Fix type
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const styles = useStyles();

  const isLastItem = index === lastItemIndex;

  const handleLocationPressed = () => {
    getCoordinates(item.locationId)
      .unwrap()
      .then(coordinates => {
        // split the information
        const labelArray = item.label.split(', ');
        const [displayName, ...restOfLabel] = labelArray;
        const additionalInfo = restOfLabel.join(', ');

        const locationDetails: Location = {
          id: item.locationId,
          displayName,
          additionalInfo,
          coordinates,
        };

        Keyboard.dismiss();
        addLocation(locationDetails);
        setIsSearching(false);
        navigation.navigate('Home');
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <Animated.View style={styles.mainContainer} entering={FadeIn}>
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
