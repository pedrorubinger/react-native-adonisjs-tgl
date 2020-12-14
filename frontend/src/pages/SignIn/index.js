import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContainer from '../../components/Auth';
import AuthForm from '../../components/Auth/AuthForm';
import ArrowButton from '../../components/UI/Buttons/ArrowButton';
import Input from '../../components/UI/Input';
import ErrorMessage from '../../components/UI/ErrorMessage';
import { signIn } from '../../services/auth';
import { Creators as AuthActions } from '../../store/ducks/auth';

const SignIn = ({ navigation, checkAuth }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values, { setErrors }) => {
        setIsLoading(true);

        const { success, token, errors } = await signIn(values);

        if(success) {
            await AsyncStorage.setItem('token', token);
            console.log('authenticated!');
            return checkAuth();
        }

        setErrors(errors);
        return setIsLoading(false);
    };

    const authenticationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email!')
            .required('Email must be filled!'),
        password: Yup.string()
            .required('Password must be filled!')
    });

    return (
        <ScrollView>
            <AuthContainer title="Authentication">
                <AuthForm>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={authenticationSchema}
                        onSubmit={handleSubmit}    
                    >
                        {(props) => (
                            <>
                                { props.touched.email &&
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

                                { props.touched.password &&
                                    props.errors.password &&
                                    <ErrorMessage>
                                        {props.errors.password}
                                    </ErrorMessage>
                                }

                                <Input
                                    value={props.values.password}
                                    onChangeText={props.handleChange('password')}
                                    placeholder="Password"
                                    type="password"
                                />

                                <ArrowButton
                                    onPress={() => navigation.push('PasswordRecovery')}
                                    color="greyButton"
                                    size="small"
                                    arrow="none"
                                    disabled={isLoading}
                                >
                                    <Text style={{ textAlign: 'right' }}>
                                        I forgot my password
                                    </Text>
                                </ArrowButton>

                                <ArrowButton
                                    onPress={props.handleSubmit}
                                    color="greenButton"
                                    size="big"
                                    disabled={isLoading}
                                >
                                    <Text>
                                        { isLoading ? 'Loading...' : 'Log In'}
                                    </Text>
                                </ArrowButton>
                            </>
                        )}
                    </Formik>
                </AuthForm>
            </AuthContainer>

            <ArrowButton onPress={() => navigation.push('SignUp')} size="big">
                <Text>Sign Up</Text>
            </ArrowButton>
        </ScrollView>
    );
};

const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(AuthActions.checkAuthStart())
});

export default connect(null, mapDispatchToProps)(SignIn);