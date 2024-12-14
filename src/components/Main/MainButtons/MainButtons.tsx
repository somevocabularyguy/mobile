import styles from './MainButtons.styles.js';
import { Pressable, View, Text } from 'react-native';

import { useMainButtonsUtils, useCustomTranslation } from '@/hooks'; 

import { useAppSelector } from '@/store/store';

const MainButtons: React.FC = () => {

  const t = useCustomTranslation();

  const  { handleNext, handleShow, handleHideWord, handleAddToCustom, handleRemoveCustomWord } = useMainButtonsUtils()

  const displayWordObject = useAppSelector(state => state.word.displayWordObject);
  const customWordIds = useAppSelector(state => state.userData.userData.customWordIds);
  const customWordIdsSet = new Set(customWordIds);

  return (
    <View style={styles.container}>
      <View style={styles.mainButtonsContainer}>
        <Pressable style={styles.mainButton} onPress={() => handleNext()}>
          <Text style={styles.mainButtonText}>Next</Text>
        </Pressable>
        <Pressable style={styles.mainButton} onPress={handleShow}>
          <Text style={styles.mainButtonText}>Show</Text>
        </Pressable>
      </View>
      <View style={styles.sideButtonsContainer}>
        <Pressable onPress={handleHideWord} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>{t("removeButton")}</Text>
        </Pressable>
        {displayWordObject?.id && customWordIdsSet.has(displayWordObject.id) ?
          <Pressable onPress={handleRemoveCustomWord} style={styles.addToCustomButton}>
            <Text style={styles.customButtonText}>{t("removeCustom")}</Text>
          </Pressable>
          :
          <Pressable onPress={handleAddToCustom} style={styles.addToCustomButton}>
            <Text style={styles.customButtonText}>{t("addCustom")}</Text>
          </Pressable>
        }
      </View>
    </View>
  )
}

export default MainButtons;