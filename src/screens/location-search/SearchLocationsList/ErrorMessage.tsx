import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Text} from '../../../components';
import {PADDING_HORIZONTAL} from '../../../shared/constants';
import {PADDING_VERTICAL} from '../../../shared/constants/common';

interface ErrorMessageProps {
  error: FetchBaseQueryError | SerializedError | undefined;
  onTryAgain: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({error, onTryAgain}) => {
  const theme = useTheme();
  let errorText = 'Something went wrong... 😟';

  if (error) {
    if ('message' in error) {
      if (error.message?.includes('Network')) {
        errorText = 'Please check you internet connection';
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '50%',
      gap: 20,
    },
    tryAgainButton: {
      borderRadius: 8,
      paddingHorizontal: PADDING_HORIZONTAL * 1.5,
      paddingVertical: PADDING_VERTICAL * 1.5,
      backgroundColor: theme.colors.primary,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text>{errorText}</Text>
      <TouchableOpacity
        onPress={onTryAgain}
        style={styles.tryAgainButton}
        hitSlop={20}>
        <Text color="card">Try again</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ErrorMessage;
