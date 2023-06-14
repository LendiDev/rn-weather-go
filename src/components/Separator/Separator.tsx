import {View} from 'react-native';

interface SeparatorProps {
  width?: number;
  height?: number;
}

const Separator: React.FC<SeparatorProps> = ({width = 0, height = 0}) => {
  return <View style={{width, height}} />;
};

export default Separator;
