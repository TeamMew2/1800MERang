import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { Firebase } from '../../api/config';

export default function Signin() {
    const recaptchaVerifier = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
    const firebaseConfig = Firebase.apps.length ? Firebase.app().options : undefined;
    const [message, showMessage] = React.useState(
        !firebaseConfig || Platform.OS === 'web'
          ? {
              text:
                'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
            }
          : undefined
      );

    const attemptInvisibleVerification = false;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ padding: 20, marginTop: 50 }}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            attemptInvisibleVerification={attemptInvisibleVerification}
          />
          <Text style={{ marginTop: 20 }}>Enter phone number</Text>
          <TextInput
            style={{ marginVertical: 10, fontSize: 17 }}
            placeholder="+1 999 999 9999"
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
          />
          <Button
            title="Send Verification Code"
            disabled={!phoneNumber}
            onPress={async () => {
              // The FirebaseRecaptchaVerifierModal ref implements the
              // FirebaseAuthApplicationVerifier interface and can be
              // passed directly to `verifyPhoneNumber`.
              try {
                console.log('app: ', Firebase.apps);
                const phoneProvider = new Firebase.auth.PhoneAuthProvider();
                const verificationId = await phoneProvider.verifyPhoneNumber(
                  phoneNumber,
                  recaptchaVerifier.current
                );
                setVerificationId(verificationId);
                showMessage({
                  text: 'Verification code has been sent to your phone.',
                });
              } catch (err) {
                showMessage({ text: `Error: ${err.message}`, color: 'red' });
              }
            }}
          />
          <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
          <TextInput
            style={{ marginVertical: 10, fontSize: 17 }}
            editable={!!verificationId}
            placeholder="123456"
            onChangeText={setVerificationCode}
          />
          <Button
            title="Confirm Verification Code"
            disabled={!verificationId}
            onPress={async () => {
              try {
                const credential = Firebase.auth.PhoneAuthProvider.credential(
                  verificationId,
                  verificationCode
                );
                await Firebase.auth().signInWithCredential(credential);
                showMessage({ text: 'Phone authentication successful 👍' });
              } catch (err) {
                showMessage({ text: `Error: ${err.message}`, color: 'red' });
              }
            }}
          />
          {message ? (
            <TouchableOpacity
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: 0xffffffee, justifyContent: 'center' },
              ]}
              onPress={() => showMessage(undefined)}>
              <Text
                style={{
                  color: message.color || 'blue',
                  fontSize: 17,
                  textAlign: 'center',
                  margin: 20,
                }}>
                {message.text}
              </Text>
            </TouchableOpacity>
          ) : (
            undefined
          )}
          {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
        </View>
      </TouchableWithoutFeedback>
      );
}