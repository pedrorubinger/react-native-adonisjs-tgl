import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Alert, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContainer from '../../components/Auth';
import AuthForm from '../../components/Auth/AuthForm';
import Input from '../../components/UI/Input';
import ArrowButton from '../../components/UI/Buttons/ArrowButton';
import ErrorMessage from '../../components/UI/ErrorMessage';
import { signIn, signUp } from '../../services/auth';
import { Creators as AuthActions } from '../../store/ducks/auth';

const SignUp = ({ navigation, checkAuth }) => {
    const [isLoading, setIsLoading] = useState();

    const handleSubmit = async (values, { setErrors }) => {
        setIsLoading(true);

        const { success, errors } = await signUp(values);

        if(success) {
            const { success, token, errors } = await signIn(values);

            if(success) {
                await AsyncStorage.setItem('token', token);

                return Alert.alert(
                    `Welcome, ${values.name}!`,
                    'Your account has been successfully created!',
                    [{
                      text: 'Okay',
                      onPress: () => checkAuth(),
                      style: 'default'
                    }],
                    { cancelable: false }
                );
            }

            setIsLoading(false);
            return setErrors(errors);
        }

        setIsLoading(false);
        return setErrors(errors);
    };

    const authenticationSchema = Yup.object({
        name: Yup.string()
            .required('Name must be filled!')
            .min(3, 'Name must be at least 3 letters!'),
        email: Yup.string()
            .email('Invalid email!')
            .required('Email must be filled!'),
        password: Yup.string()
            .required('Password must be filled!')
    });

    return (
        <ScrollView>
            <AuthContainer title="Registration">
                <AuthForm>
                    <Formik
                        initialValues={{ name: '', email: '', password: '' }}
                        validationSchema={authenticationSchema}
                        onSubmit={handleSubmit}
                    >
                        {(props) => (
                            <>
                                { props.touched.name &&
                                    props.errors.name &&
                                    <ErrorMessage>
                                        {props.errors.name}
                                    </ErrorMessage>
                                }

                                <Input
                                    value={props.values.name}
                                    onChangeText={props.handleChange('name')}
                                    placeholder="Name"
                                    type="name"
                                    keyboard="default"
                                />

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
                                    onPress={props.handleSubmit}
                                    color="greenButton"
                                    size="big"
                                >
                                    <Text>
                                        {isLoading ? 'Loading...' : 'Register'}
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
        </ScrollView>
    );
};

const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(AuthActions.checkAuthStart())
});

export default connect(null, mapDispatchToProps)(SignUp);