import styles from './FeedbackDropdown.styles.js';
import { OptionObject } from '@/types';

import { Text, View, Pressable } from 'react-native';
import { ArrowIcon } from '@/assets/icons'; 
import { useCustomTranslation } from '@/hooks';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsFeedbackDropdownActive } from '@/store/feedbackUiSlice';
import { updateSelectedTypeObject, updateIsSended } from '@/store/feedbackSlice';

const FeedbackDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation("Feedback.FeedbackDropdown")

  const isFeedbackDropdownActive = useAppSelector(state => state.feedbackUi.isFeedbackDropdownActive)
  const isSended = useAppSelector(state => state.feedback.isSended);
  const selectedTypeObject = useAppSelector(state => state.feedback.selectedTypeObject);

  const toggleDropdown = () => {
    dispatch(updateIsFeedbackDropdownActive(!isFeedbackDropdownActive))
  }

  const handleFeedbackTypeChange = (typeObject: OptionObject) => {
    dispatch(updateSelectedTypeObject(typeObject));
    dispatch(updateIsFeedbackDropdownActive(false));
    if (isSended) updateIsSended(false);
  }

  const options: OptionObject[] = [
    { key: '', text: t("Options.select") },
    { key: 'bug', text: t("Options.bug") },
    { key: 'feature', text: t("Options.feature") },
    { key: 'usability', text: t("Options.usability") },
    { key: 'performance', text: t("Options.performance") },
    { key: 'general', text: t("Options.general") },
    { key: 'accessibility', text: t("Options.accessibility") },
    { key: 'complaint', text: t("Options.complaint") },
    { key: 'appreciation', text: t("Options.compliment") },
  ]

  const dropdownButtonStyle = [styles.dropdownButton, isFeedbackDropdownActive ? styles.dropdownButtonActive : {}];
  const dropdownArrowIconStyle = [styles.dropdownArrowIcon, isFeedbackDropdownActive ? styles.dropdownArrowIconActive : {}];

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.dropdownText}>{t("label")}</Text>
      <Pressable style={dropdownButtonStyle} onPress={toggleDropdown}>
        <View style={styles.dropdownButtonInnerContainer}>
          <Text style={styles.dropdownButtonText}>{selectedTypeObject.text}</Text>
          <ArrowIcon style={dropdownArrowIconStyle} fill="black" />
        </View>
      </Pressable>
      {isFeedbackDropdownActive &&
        <View style={styles.optionsContainer}>
          {options.map((optionObject, index) => {
            return (
              <Pressable key={optionObject.key + index} style={styles.option} onPress={() => handleFeedbackTypeChange(optionObject)}>
                <Text style={styles.optionText}>{optionObject.text}</Text>
              </Pressable>
            )
          })}      
        </View>
      }
    </View>
  )
}

export default FeedbackDropdown;