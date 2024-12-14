import styles from './FeedbackTextarea.styles.js';
import { useState } from 'react';
import { useCustomTranslation } from '@/hooks';

import { Text, View, TextInput, NativeSyntheticEvent, TextInputContentSizeChangeEventData } from 'react-native';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateFeedbackText, updateIsSended } from '@/store/feedbackSlice';

const FeedbackTextarea: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation("Feedback.FeedbackTextarea");

  const [textareaHeight, setTextareaHeight] = useState(132);

  const isSended = useAppSelector(state => state.feedback.isSended);
  const feedbackText = useAppSelector(state => state.feedback.feedbackText);

  const handleTextareaSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    const newHeight = event.nativeEvent.contentSize.height;
    if (newHeight !== textareaHeight && newHeight > 100) {
      setTextareaHeight(newHeight);
    }
  };

  const handleFeedbackTextChange = (text: string) => {
    dispatch(updateFeedbackText(text));
    if (isSended) {
      dispatch(updateIsSended(false));
    }
  };

  return (
    <View style={styles.textareaContainer}>
      <Text style={styles.textareaLabel}>Describe Your Feedback:</Text>
      <TextInput
        style={[styles.textarea, { height: textareaHeight}]}
        value={feedbackText}
        onChangeText={handleFeedbackTextChange}
        multiline={true}
        placeholder="Enter your feedback..."
        placeholderTextColor="rgba(255, 255, 255, 0.2)"
        onContentSizeChange={handleTextareaSizeChange}
      />
    </View>
  )
}

export default FeedbackTextarea;