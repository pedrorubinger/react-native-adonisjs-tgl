import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthContainer from '../../components/Auth';
import AuthForm from '../../components/Auth/AuthForm';
import Input from '../../components/UI/Input';
import ArrowButton from '../../components/UI/Buttons/ArrowButton';
import { setNewPassword } from '../../services/auth';
import ErrorMessage from '../../components/UI/ErrorMessage';

const PasswordRecovery = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values, { setErrors }) => {
        setIsLoading(true);

        const { success, errors } = await setNewPassword(values, values.token);

        setIsLoading(false);

        if(success) {
            return Alert.alert(
                'Success!',
                `Your password has been successfully updated!`,
                [{
                    text: 'Okay',
                    onPress: () => navigation.navigate('SignIn'),
                    style: 'default'
                }],
                { cancelable: false }
            );
        }

        setErrors(errors);
    };

    const authenticationSchema = Yup.object({
        token: Yup.string()
            .required('Token must be filled!'),
        password: Yup.string()
            .required('Password must be filled!'),
        passwordConfirmation: Yup.string()
            .required('Password confirmation must be filled!')
    });

    return (
        <ScrollView>
            <AuthContainer title="Reset Password">
                <AuthForm>
                    <Formik
                        initialValues={{
                            token: '',
                            password: '',
                            passwordConfirmation: ''
                        }}
                        validationSchema={authenticationSchema}
                        onSubmit={handleSubmit}
                    >
                        {(props) => (
                            <>
                                {props.touched.token &&
                                    props.errors.token &&
                                    <ErrorMessage>
                                        {props.errors.token}
                                    </ErrorMessage>
                                }

                                <Input
                                    value={props.values.token}
                                    onChangeText={props.handleChange('token')}
                                    placeholder="Token"
                                    type="none"
                                    keyboard="default"
                                />

                                {props.touched.password &&
                                    props.errors.password &&
                                    <ErrorMessage>
                                        {props.errors.password}
                                    </ErrorMessage>
                                }

                                <Input
                                    value={props.values.password}
                                    onChangeText={props.handleChange('password')}
                                    placeholder="New password"
                                    type="password"
                                />

                                {props.touched.passwordConfirmation &&
                                    props.errors.passwordConfirmation &&
                                    <ErrorMessage>
                                        {props.errors.passwordConfirmation}
                                    </ErrorMessage>
                                }

                                <Input
                                    value={props.values.passwordConfirmation}
                                    onChangeText={props.handleChange('passwordConfirmation')}
                                    placeholder="Password confirmation"
                                    type="password"
                                />

                                <ArrowButton
                                    onPress={props.handleSubmit}
                                    color="greenButton"
                                    size="big"
                                >
                                    <Text>
                                        {isLoading ? 'Loading...' : 'Change Password'}
                                    </Text>
                                </ArrowButton>
                            </>
                        )}
                    </Formik>
                </AuthForm>
            </AuthContainer>

            <ArrowButton
                arrow="back"
                onPress={() => navigation.navigate('SignIn')}
                size="big"
            >
                <Text>Back to Log In</Text>
            </ArrowButton>
        </ScrollView>
    );
};

export default PasswordRecovery;