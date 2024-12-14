import { View, ViewStyle } from 'react-native';

interface LineProps {
  'height'?: number;
  'width'?: number;
  style?: ViewStyle;
}

const Line: React.FC<LineProps> = ({ height = 2, width = 2, style = {} }) => {

  const inlineStyle = {
    ...style,
    height,
    width,
    backgroundColor: 'white'
  };

  return <View style={inlineStyle}></View>
}

export default Line;