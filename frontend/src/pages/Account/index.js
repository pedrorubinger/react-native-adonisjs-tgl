import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import AuthContainer from '../../components/Auth';
import AuthForm from '../../components/Auth/AuthForm';
import ArrowButton from '../../components/Buttons/ArrowButton';
import ErrorMessage from '../../components/ErrorMessage';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Loading from '../../components/UI/Loading';
import { getUserData, updateProfileData } from '../../services/auth';

const Account = ({ auth, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [initialValues, setInitialValues] = useState({ name: '', email: '' });
    const [error, setError] = useState(null);
    const [currentEmail, setCurrentEmail] = useState('');

    const handleSubmit = async (values, { setErrors }) => {
        setIsLoading(true);

        const { success, errors } = await updateProfileData(
            values,
            auth.userId,
            currentEmail
        );

        if(success) {
            setIsLoading(false);
            values.password = '';
            values.newPassword = '';

            return Alert.alert(
                `Success!`,
                'Your account profile has been successfully updated!!',
                [{
                  text: 'Okay',
                  onPress: () => navigation.navigate('Home'),
                  style: 'default'
                }],
                { cancelable: false }
            );
        }

        setIsLoading(false);
        return setErrors(errors);
    };

    const profileSchema = Yup.object({
        name: Yup.string()
            .required('Name must be filled!'),
        email: Yup.string()
            .email('Invalid email!')
            .required('Email must be filled!'),
        password: Yup.string()
            .required('Password must be filled!'),
        newPassword: Yup.string()
    });

    useEffect(() => {
        const getUser = async () => {
            const { success, name, email, error } = await getUserData(auth.userId);

            if(success) {
                setInitialValues({ name, email })
                setCurrentEmail(email);
                return setIsFetched(true);
            }

            setIsFetched(true);
            return setError(error.message);
        };

        getUser();
    }, [auth.userId, error]);

    if(error) return <Text>Error: {error.toString()}</Text>;
    if(!isFetched) return <View style={{ marginTop: 50 }}><Loading /></View>

    return (
        <ScrollView>
            <Header navigation={navigation} />
            <AuthContainer title="Account" logo={false}>
                <AuthForm>
                    <Formik
                        initialValues={{
                            name: initialValues.name,
                            email: initialValues.email,
                            password: '',
                            newPassword: ''
                        }}
                        validationSchema={profileSchema}
                        onSubmit={handleSubmit}
                    >
                        {(props) => (
                            <>
                                { props.touched.name && props.errors.name &&
                                    <ErrorMessage>{props.errors.name}</ErrorMessage>
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
                                    <ErrorMessage>{props.errors.email}</ErrorMessage>
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
                                    type="password"
                                    placeholder="Current password"
                                />

                                { props.touched.newPassword &&
                                    props.errors.newPassword &&
                                    <ErrorMessage>
                                        {props.errors.newPassword}
                                    </ErrorMessage>
                                }

                                <Input
                                    value={props.values.newPassword}
                                    onChangeText={props.handleChange('newPassword')}
                                    type="password"
                                    placeholder="New password (optional)"
                                />

                                <ArrowButton
                                    onPress={props.handleSubmit}
                                    color="greenButton"
                                    size="big"
                                    disabled={isLoading}
                                >
                                    <Text>
                                        { isLoading ? 'Loading...' : 'Save Changes' }
                                    </Text>
                                </ArrowButton>
                            </>
                        )}
                    </Formik>
                </AuthForm>
            </AuthContainer>
        </ScrollView>
    );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(Account);