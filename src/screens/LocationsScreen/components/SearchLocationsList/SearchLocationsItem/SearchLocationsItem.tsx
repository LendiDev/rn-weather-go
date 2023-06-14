import {Suggestion} from '../../../../../types/hereAPI.types';
import {Text} from '../../../../../components';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useStyles} from './SearchLocationsItem.styles';
import {Alert, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useLazyGetLocationCoordinatesQuery} from '../../../../../store/api/locationGeocode.api';

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
  const [getGeocode] = useLazyGetLocationCoordinatesQuery();
  const styles = useStyles();

  const isLastItem = index === lastItemIndex;

  const handleLocationPressed = () => {
    getGeocode(item.locationId)
      .unwrap()
      .then(data => {
        Alert.alert(JSON.stringify({data, ...item}));
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
