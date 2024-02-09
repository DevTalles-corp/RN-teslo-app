import { Button } from '@ui-kitten/components';
import { MyIcon } from './MyIcon';
import { StyleProp, ViewStyle } from 'react-native';


interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}


export const FAB = ({ style, iconName, onPress }: Props) => {


  return (
    <Button 
      style={[style, {
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 3,
        borderRadius: 13,
      }]}
      accessoryLeft={<MyIcon name={ iconName } white />}
      onPress={onPress}
    />
  )
}