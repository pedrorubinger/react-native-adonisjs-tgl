import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthContainer from '../../components/Auth';
import AuthForm from '../../components/Auth/AuthForm';
import Input from '../../components/UI/Input';
import ArrowButton from '../../components/UI/Buttons/ArrowButton';
import { recoverPassword } from '../../services/auth';
import ErrorMessage from '../../components/UI/ErrorMessage';

const PasswordRecovery = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values, { setErrors }) => {
        setIsLoading(true);

        const { success, errors } = await recoverPassword(values);

        setIsLoading(false);

        if(success) {
            return Alert.alert(
                'Check your inbox!',
                `A recovery token was sent to ${values.email}. Paste the token in the field and then set your new password.`,
                [{
                    text: 'Okay',
                    onPress: () => navigation.navigate('ResetPassword'),
                    style: 'default'
                }],
                { cancelable: false }
            );
        }
        
        setErrors(errors);
    };
    
    const authenticationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email!')
            .required('Email must be filled!')
    });

    return (
        <ScrollView>
            <AuthContainer title="Reset Password">
                <AuthForm>
                    <Formik
                        initialValues={{
                            email: '',
                            token: '',
                            password: '',
                            passwordConfirmation: ''
                        }}
                        validationSchema={authenticationSchema}
                        onSubmit={handleSubmit}
                    >
                        {(props) => (
                            <>
                                {props.touched.email &&
                                    props.errors.email &&
                                    <ErrorMessage>
                                        {props.errors.email}
                                    </ErrorMessage>
                                }

                                <Input
                                    value={props.values.email}
                                    onChangeText={props.handleChange('email')}
                                    placeholder="Email"
                                    type="emailAddress"
                                    keyboard="email-address"
                                />

                                <ArrowButton
                                    onPress={props.handleSubmit}
                                    color="greenButton"
                                    size="big"
                                >
                                    <Text>
                                        {isLoading ? 'Loading...' : 'Send Link'}
                                    </Text>
                                </ArrowButton>
                            </>
                        )}
                    </Formik>
                </AuthForm>
            </AuthContainer>

            <ArrowButton
                arrow="back"
                onPress={() => navigation.goBack()}
                size="big"
            >
                <Text>Back</Text>
            </ArrowButton>

            <ArrowButton
                onPress={() => navigation.push('SignUp')}
                size="big"
            >
                <Text>Sign Up</Text>
            </ArrowButton>
        </ScrollView>
    );
};

export default PasswordRecovery;