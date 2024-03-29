import * as NavigationService from 'react-navigation-helpers';
import {Suggestion} from '../../../../types/hereAPI.types';
import {Text} from '../../../../components';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useStyles} from './SearchLocationsItem.styles';
import {
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import {useActions} from '../../../../hooks/useActions';
import {useLazyGetCoordinatesByIdQuery} from '../../../../store/api/locationGeocode.api';
import {Location} from '../../../../types';
import {SCREENS} from '../../../../shared/screens';
import {useState} from 'react';

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
  const {
    addLocationAndSelect,
    setIsManualLocationSelection,
    setIsSearchingFromHome,
  } = useActions();
  const [isLoading, setIsLoading] = useState(false);
  const [getCoordinates] = useLazyGetCoordinatesByIdQuery();
  const {setIsSearching} = useActions();

  const styles = useStyles();

  const isLastItem = index === lastItemIndex;

  const handleLocationPressed = () => {
    setIsLoading(true);
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
        setIsSearching(false);
        addLocationAndSelect(locationDetails);
        setIsManualLocationSelection(false);
        setIsSearchingFromHome(false);
        NavigationService.navigate(SCREENS.HOME);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Animated.View style={styles.cellContainer} entering={FadeIn}>
      <TouchableOpacity
        disabled={isLoading}
        style={styles.contentContainer}
        onPress={handleLocationPressed}>
        <Text style={styles.labelText}>{item.label}</Text>
        <ActivityIndicator
          style={[styles.loadingIndicator, {opacity: isLoading ? 1 : 0}]}
        />
      </TouchableOpacity>
      {!isLastItem && <View style={styles.separatorLine} />}
    </Animated.View>
  );
};

export default SearchLocationsItem;
