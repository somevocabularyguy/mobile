import styles from './index.styles.js';

import { useState, useEffect } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native'

import { EmailIcon } from '@/assets/icons';

import { sendMagicLink } from '@/lib/api';

const SignInPage: React.FC = () => {

  const [email, setEmail] = useState('');
  const [isWarned, setIsWarned] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [animationState, setAnimationState] = useState('Send Magic Link');

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
    } catch (error) {
      console.log(error);
      setIsSending(false);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    let iteration = 0;
    const sendingArray = ['Sending.', 'Sending..', 'Sending...'];
    let intervalId: NodeJS.Timeout;

    if (isSending) {
      setAnimationState(sendingArray[iteration]);
      intervalId = setInterval(() => {
        iteration = (iteration + 1) % sendingArray.length;
        setAnimationState(sendingArray[iteration]);
      }, 400);
    } else {
      setAnimationState('Send Magic Link');
    }

    return () => clearInterval(intervalId);
  }, [isSending]);

  const handleRefresh = async () => {
    // const response = await checkIsVerified();
  }

  const warningBoxStyle = [styles.warningBox, isWarned ? {} : styles.hidden];
  const mainSectionStyle = [styles.mainSection, isWaiting ? styles.none : {}];
  const waitingSectionStyle = [styles.waitingSection, isWaiting ? {} : styles.none];

  return (
    <View style={styles.container} >
      {isWaiting ? ( 
        <View style={waitingSectionStyle}>

          <View style={styles.waitingSectionInfoContainer}>
            <EmailIcon width={45} height={45} />
            <View style={styles.waitingSectionTextContainer}>
              <Text style={styles.waitingSectionText}>Check Your Email For Special Login Link</Text>
              <Text style={styles.waitingSectionSmallText}>Be sure to check your spam...</Text>
            </View>
          </View>

          <View style={styles.waitingRefreshContainer}>
            <Text style={styles.waitingRefreshText}>After clicking the link,</Text>
            <Text style={styles.waitingRefreshText}>Come back and refresh this page</Text>
          </View>

          <Pressable style={styles.waitingRefreshButton} onPress={handleRefresh}>
            <Text style={styles.waitingRefreshButtonText}>Refresh</Text>
          </Pressable>
        </View>
      ) : (
        <View style={mainSectionStyle}>
          <View style={warningBoxStyle} >
            <Text>Please Enter A Valid Email</Text>
          </View>

          <Text style={styles.emailLabel}>Email</Text>
          <TextInput 
            style={styles.emailInput}
            placeholder="dontstoplearning@email.com"
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            value={email}
            onChangeText={text => handleInputChange(text)}
          />

          <Pressable style={styles.emailButton} onPress={handleSubmit}>
            <Text style={styles.emailButtonText}>{animationState}</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default SignInPage;
