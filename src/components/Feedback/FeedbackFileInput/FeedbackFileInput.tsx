import React/* , { useEffect } */ from 'react';
// import styles from './FeedbackFileInput.module.css';
// import { DeleteIcon } from '@/public/icons';
// import { useCustomTranslation } from '@/hooks';
// 
// import { useAppSelector, useAppDispatch } from '@/store/store';
// import { updateImageUrls, updateIsSended } from '@/store/feedbackSlice';

interface FeedbackFileInputProps {
  files: File[];
  setFiles: (value: React.SetStateAction<File[]>) => void;
}

const FeedbackFileInput: React.FC<FeedbackFileInputProps> = (/* { files, setFiles} */) => {
  // const dispatch = useAppDispatch();
  // const { t } = useCustomTranslation("Feedback.FeedbackFileInput")


  return (
    <></>
  )
}

export default FeedbackFileInput;