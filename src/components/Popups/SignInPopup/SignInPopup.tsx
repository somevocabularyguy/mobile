
import styles from './SignInPopup.styles.js';

import { useState, useEffect, useRef } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native'

import storage from '@/storage';
import { updateWords } from '@/store/wordSlice';
import { updateUserData } from '@/store/userDataSlice';
import { updateIsSignedIn } from '@/store/userSettingsSlice';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { addSingleWordResource, removeSingleWordResource } from '@/store/languageSlice';
import { updateIsWaitingVerify, updateIsSignInPopupVisible } from '@/store/accountUiSlice';

import { EmailIcon } from '@/assets/icons';

import { UserData } from '@/types';
import { useCustomTranslation } from '@/hooks';
import { loadWordResources } from '@/utils/dataUtils';
import { sendMagicLink, verifySignIn, syncUserData } from '@/lib/api';

const SignInPopup: React.FC = () => {
  const t = useCustomTranslation('Popups.SignInPopup');

  const dispatch = useAppDispatch();

  const isSignInPopupVisible = useAppSelector(state => state.accountUi.isSignInPopupVisible);
  const isWaitingVerify = useAppSelector(state => state.accountUi.isWaitingVerify);

  const [email, setEmail] = useState('');
  const [isWarned, setIsWarned] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  const animationIndexRef = useRef(animationIndex);

  const handleInputChange = (text: string) => {
    setEmail(text);
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

 const handleSubmit = async () => {
    setIsWarned(false);

    if (!isValidEmail(email)) {
      setIsWarned(true);  
      return;
    }
    setIsSending(true);

    try {
      const response = await sendMagicLink(email);
      const { tempVerifyToken } = response.data;
      if (response.status === 200) {
        dispatch(updateIsWaitingVerify(true));
        storage.setItem('tempVerifyToken', tempVerifyToken)
        setEmail('');
      }
      setIsSending(false);
    } catch (error) {
      console.log(error);
      setIsSending(false);
    }
  };

  const handleRefresh = async () => {
    const tempVerifyToken = await storage.getItem('tempVerifyToken');
    if (tempVerifyToken) {
      const response = await verifySignIn(tempVerifyToken);
      if (response.authToken) {

        storage.setItem('authToken', response.authToken);
        storage.removeItem('tempVerifyToken');

        const storedUserData = await storage.getItem('userData') as UserData;
        const dataResponse = await syncUserData(storedUserData, response.authToken);
        if (dataResponse) {
          dispatch(updateUserData(dataResponse.serverUserData));
          const oldLanguageArray = storedUserData.languageArray;
          const newLanguageArray = dataResponse.serverUserData.languageArray;

          oldLanguageArray.forEach(language => {
            if (!newLanguageArray.includes(language)) {
              dispatch(removeSingleWordResource(language))
            }
          })

          const { requestedWords, requestedWordResources } = loadWordResources(oldLanguageArray, newLanguageArray);

          if (requestedWords) {
            dispatch(updateWords(requestedWords))
          }

          if (requestedWordResources) {
            Object.keys(requestedWordResources).forEach(language => {
              dispatch(addSingleWordResource({ language: language, wordResource: requestedWordResources[language] }))
            })
          }
        }

        dispatch(updateIsSignedIn(true));
        dispatch(updateIsSignInPopupVisible(false))
        dispatch(updateIsWaitingVerify(false));

      } else if (response.message === 'not-verified') {

        console.log(response);

      } else if (response.authToken) {

        storage.removeItem('tempVerifyToken');
        dispatch(updateIsWaitingVerify(false));
        dispatch(updateIsSignInPopupVisible(false))
      }
    }
  }

  useEffect(() => {
    let loadingInterval: NodeJS.Timeout | null = null;

    if (isSending) {
      loadingInterval = setInterval(() => {
        setAnimationIndex(prevIndex => {
          const nextIndex = prevIndex === 3 ? 1 : prevIndex + 1;
          animationIndexRef.current = nextIndex;
          return nextIndex;
        });
      }, 250);
    }

    return () => {
      if (loadingInterval) clearInterval(loadingInterval);
      setAnimationIndex(0);
    };
  }, [isSending]);

  const warningBoxStyle = [styles.warningBox, isWarned ? {} : styles.hidden];
  const mainSectionStyle = [styles.mainSection, isWaitingVerify ? styles.none : {}];
  const waitingSectionStyle = [styles.waitingSection, isWaitingVerify ? {} : styles.none];
  const containerStyle = [styles.container, isSignInPopupVisible ? styles.containerVisible : {}]

  return (
    <View style={containerStyle} pointerEvents={isSignInPopupVisible ? 'auto' : 'none'}>
      {isWaitingVerify ? ( 
        <View style={waitingSectionStyle}>

          <View style={styles.waitingSectionInfoContainer}>
            <EmailIcon width={45} height={45} />
            <View style={styles.waitingSectionTextContainer}>
              <Text style={styles.waitingSectionText}>{t('waitingText')}</Text>
              <Text style={styles.waitingSectionSmallText}>{t('waitingSmallText')}</Text>
            </View>
          </View>

          <View style={styles.waitingRefreshContainer}>
            <Text style={styles.waitingRefreshText}>{t('refreshText1')}</Text>
            <Text style={styles.waitingRefreshText}>{t('refreshText2')}</Text>
          </View>

          <Pressable style={styles.waitingRefreshButton} onPress={handleRefresh}>
            <Text style={styles.waitingRefreshButtonText}>{t('refreshButton')}</Text>
          </Pressable>
        </View>
      ) : (
        <View style={mainSectionStyle}>
          <View style={warningBoxStyle} >
            <Text style={styles.warningText}>{t('warningText')}</Text>
          </View>

          <Text style={styles.emailLabel}>{t('emailLabel')}</Text>
          <TextInput 
            style={styles.emailInput}
            placeholder={t('placeholderStart') + '@email.com'}
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            value={email}
            onChangeText={text => handleInputChange(text)}
          />

          <Pressable style={styles.emailButton} onPress={handleSubmit}>
            <Text style={styles.emailButtonText}>
              {isSending ? t('sendingText') + '.'.repeat(animationIndex) : t('sendText')}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default SignInPopup;
