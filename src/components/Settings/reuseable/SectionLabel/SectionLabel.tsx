import styles from './SectionLabel.styles.js';

import { ArrowIcon } from '@/assets/icons';
import { Text, Pressable, GestureResponderEvent } from 'react-native';

interface SectionLabelProps {
  handleToggleSection: (event?: GestureResponderEvent) => void;
  labelText: string;
  isVisible: boolean;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ handleToggleSection, labelText, isVisible }) => {

  const sectionToggleIconStyle = [
    styles.sectionToggleIcon, 
    isVisible ? styles.sectionToggleIconActive : {}
  ];

  return (
    <Pressable onPress={handleToggleSection} style={styles.sectionLabelContainer}>
      <Text style={styles.sectionLabel}>{labelText}</Text>
      <ArrowIcon width={40} height={40} style={sectionToggleIconStyle}/>
    </Pressable>
  )
}

export default SectionLabel;