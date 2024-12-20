
import styles from './SignInPopup.styles.js';

import { useState, useEffect, useRef } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native'

import { useAppSelector } from '@/store/store';

import { EmailIcon } from '@/assets/icons';

import { sendMagicLink } from '@/lib/api';
import { useCustomTranslation } from '@/hooks';

const SignInPopup: React.FC = () => {
  const { t } = useCustomTranslation('Popups.SignInPopup');

  const isSignInPopupVisible = useAppSelector(state => state.accountUi.isSignInPopupVisible);

  const [email, setEmail] = useState('');
  const [isWarned, setIsWarned] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
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
      if (response.status === 200) {
        setIsWaiting(true);
        setEmail('');
      }
      setIsSending(false);
    } catch (error) {
      console.log(error);
      setIsSending(false);
    }
  };

  const handleRefresh = async () => {
    // const response = await checkIsVerified();
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
  const mainSectionStyle = [styles.mainSection, isWaiting ? styles.none : {}];
  const waitingSectionStyle = [styles.waitingSection, isWaiting ? {} : styles.none];
  const containerStyle = [styles.container, isSignInPopupVisible ? styles.containerVisible : {}]

  return (
    <View style={containerStyle} pointerEvents={isSignInPopupVisible ? 'auto' : 'none'}>
      {isWaiting ? ( 
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
