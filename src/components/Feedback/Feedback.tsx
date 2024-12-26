import styles from './Feedback.styles.js';
import { useState } from 'react';
import { useCustomTranslation } from '@/hooks';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsFeedbackDropdownActive } from '@/store/feedbackUiSlice';
import { updateSelectedTypeObject, updateFeedbackText, updateIsSended, updateImageUrls } from '@/store/feedbackSlice';

import { FeedbackData } from '@/types'; 
import { sendFeedbackData } from '@/lib/api';

import { View, Text, Pressable, GestureResponderEvent } from 'react-native';

import FeedbackDropdown from './FeedbackDropdown';
import FeedbackTextarea from './FeedbackTextarea';
import FeedbackFileInput from './FeedbackFileInput';

const FeedbackPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation("Feedback")

  const [files, setFiles] = useState<File[]>([]);

  const imageUrls = useAppSelector(state => state.feedback.imageUrls);
  const isSended = useAppSelector(state => state.feedback.isSended);
  const selectedTypeObject = useAppSelector(state => state.feedback.selectedTypeObject);
  const feedbackText = useAppSelector(state => state.feedback.feedbackText);

  const isFeedbackDropdownActive = useAppSelector(state => state.feedbackUi.isFeedbackDropdownActive)

  const handleSubmit = async (event: GestureResponderEvent) => {   
    event.stopPropagation()
    if (!selectedTypeObject.key || !feedbackText) return;

    const feedbackObject: FeedbackData = {
      feedbackType: selectedTypeObject.key,
      feedbackText: feedbackText,
      files: files
    }

    try {
      const response = await sendFeedbackData(feedbackObject)
      if (response.status === 201) {
        dispatch(updateIsSended(true));
        dispatch(updateSelectedTypeObject({ key: '', text: t("FeedbackDropdown.Options.select") }));
        dispatch(updateFeedbackText(''));
        setFiles([]);
        for (let i = 0; i < imageUrls.length; i++) {
          URL.revokeObjectURL(imageUrls[i]);
        }
        dispatch(updateImageUrls([]));
      }
    } catch (error) {
      console.error(error);
    }
  }

  const closeDropdown = () => {
    if (isFeedbackDropdownActive) {
      dispatch(updateIsFeedbackDropdownActive(false));
    }
  }

  return (
    <Pressable style={styles.container} onPress={closeDropdown}>
      <View style={styles.formContainer}>

        <Text style={[styles.thanksDiv, isSended ? {} : styles.hidden]}>{t('thankingText')}</Text>

        <FeedbackDropdown />
        <FeedbackTextarea />
        <FeedbackFileInput files={files} setFiles={setFiles} />

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{t('submitButton')}</Text>
        </Pressable>

      </View>
    </Pressable>
  )
}


export default FeedbackPage;