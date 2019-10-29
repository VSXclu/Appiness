/*********************************************
 * Importing Area
**********************************************/
import React, {
    Component,
    Fragment
} from 'react';

import {
    View,
    Image,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    AsyncStorage,
    Text,
    TextInput,
    TouchableOpacity,
    BackHandler
} from 'react-native';

import Colors from '../../themes/Colors';

import { connect } from 'react-redux';

import Toast from 'react-native-custom-toast';

import ProjImageAccess from '../../configuration/ProjImageAccess';

import Constants from '../utility/Constants';



/*********************************************
 * Functional Area
**********************************************/
class LoginPage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props)
    {
        super(props)

        this.state = {
            username: "",
            password: "",
            textInputErrorUsername: false,
            textInputErrorPassword: false
        }

        this.redirectToDashboardPage = this.redirectToDashboardPage.bind(this)
    }

    componentDidMount()
    {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        BackHandler.exitApp()
        return true;
    }

    validateUser()
    {
        if(this.state.username == "")
        {
            this.setState({
                textInputErrorUsername: true
            })
        }
        else if(this.state.password == "")
        {
            this.setState({
                textInputErrorPassword: true
            })
        }
        else if((this.props.loginCredentials.username != this.state.username) || 
        (this.props.loginCredentials.password != this.state.password))
        {
            this.refs.toastError.showToast(Constants.strInvalidUserMsg, Constants.intToastDurationLong);
        }
        else
        {
            let joAppRegisteredUserData = {
                alreadyLogged: true
            }

            AsyncStorage.setItem(Constants.strLSAppUserLoginData, JSON.stringify(joAppRegisteredUserData))

            this.state = {
                username: "",
                password: "",
                textInputErrorUsername: false,
                textInputErrorPassword: false
            }

            this.redirectToDashboardPage()
        }
    }

    redirectToDashboardPage()
    {
        const { navigate } = this.props.navigation;

        navigate('DashboardPage', { name: 'Dashboard' })
    }

    render() 
    {
        return (
            <Fragment>
                <SafeAreaView style={customStyles.main}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}>
                        <View style={customStyles.createBlock}>
                            <Image
                                style={customStyles.bannerImage} 
                                source={ProjImageAccess.appLogoImgIcon} />
                        </View>
                        <Text style={customStyles.loginLabel} >
                            {Constants.strLoginTitle}
                        </Text>
                        <View style={customStyles.loginContainer}>
                            <TextInput style={(this.state.textInputErrorUsername) ? customStyles.inputError : customStyles.input}
                                placeholder={Constants.strUsername}
                                placeholderTextColor={Colors.lightGrey_979797}
                                autoCapitalize="none"
                                keyboardType="name-phone-pad"
                                onFocus={() => this.setState({textInputErrorUsername: false})}
                                onChangeText={(text) => this.setState({username: text})}/>
                                {
                                    (this.state.textInputErrorUsername) ?
                                    <Text 
                                        style={customStyles.errorBottomMsg}>
                                        {Constants.strErrorUsername}
                                    </Text> :
                                    null
                                }

                            <TextInput style={(this.state.textInputErrorPassword) ? customStyles.inputError : customStyles.input}
                                placeholder={Constants.strPassword}
                                placeholderTextColor={Colors.lightGrey_979797}
                                autoCapitalize="none"
                                keyboardType="name-phone-pad"
                                maxLength={13}
                                onFocus={() => this.setState({textInputErrorPassword: false})}
                                onChangeText={(text) => this.setState({password: text})} />
                                {
                                    (this.state.textInputErrorPassword) ?
                                    <Text 
                                        style={customStyles.errorBottomMsg}>
                                        {Constants.strErrorPassword}
                                    </Text> :
                                    null
                                }
                        
                            <TouchableOpacity
                                style={customStyles.submitButton}
                                onPress={() => this.validateUser()}>
                                <Text style={customStyles.submitButtonText}>
                                    {Constants.strLogin}
                                </Text>
                            </TouchableOpacity>
                            <Toast ref="toastNormal"
                                orientation='yAxis'/>
                            <Toast
                                ref="toastError"
                                backgroundColor={Colors.pureRed_ff0000}
                                position='bottom'
                                orientation='yAxis'
                                textColor={Colors.pureWhite_ffffff}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    }
}



/*********************************************
 * Mapping Area
**********************************************/
function mapStateToProps(state) {
    return {
        loginCredentials: state.loginCredentialsRedu.loginCredentials
    }
}



/*********************************************
 * Styling Area
**********************************************/
const customStyles = StyleSheet.create({
    main:
    {
        flex: 1,
        backgroundColor: Colors.pureWhite_ffffff,
    },
    mainSplash:
    {
        flex: 1,
        backgroundColor: Colors.pureWhite_ffffff,
        justifyContent: 'center'
    },
    createBlock:
    {
        paddingLeft: 100,
        paddingRight: 100,
        marginTop: 20
    },
    bannerImage:
    {
        width: undefined,
        resizeMode: 'contain'
    },
    loginLabel:
    {
        color: Colors.pureBlack_000000,
        fontSize: 40,
        marginLeft: 20,
        marginTop: 40,
        marginBottom: 20
    },
    loginContainer: 
    {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    input: 
    {
        marginTop: 10,
        color: Colors.pureBlack_000000,
        fontSize: 20,
        borderColor: Colors.pureBlack_000000,
        borderBottomWidth: 1
    },
    inputError: 
    {
        marginTop: 10,
        color: Colors.pureBlack_000000,
        fontSize: 20,
        borderColor: Colors.pureRed_ff0000,
        borderBottomWidth: 2
    },
    errorBottomMsg:
    {
        color: Colors.pureRed_ff0000
    },
    submitButton: 
    {
        backgroundColor: Colors.appColor_00BDD7,
        padding: 10,
        marginTop: 20,
        marginBottom: 100
    },
    submitButtonText: 
    {
        color: Colors.pureWhite_ffffff,
        textAlign: 'center',
        fontSize: 20,
    },
});



/*********************************************
 * Exporting Area
**********************************************/
export default connect(
    mapStateToProps,
  )(LoginPage)