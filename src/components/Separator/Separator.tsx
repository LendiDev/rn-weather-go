import {View} from 'react-native';

const Separator: React.FC<{width: number}> = ({width = 0}) => {
  return <View style={{width}} />;
};

export default Separator;
