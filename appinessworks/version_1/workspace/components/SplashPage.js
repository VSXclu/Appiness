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
    AsyncStorage,
    BackHandler,
} from 'react-native';

import Colors from '../../themes/Colors';

import ProjImageAccess from '../../configuration/ProjImageAccess';

import Constants from '../utility/Constants';



/*********************************************
 * Functional Area
**********************************************/
class SplashPage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor()
    {
        super()

        this.checkIsAlreadyLogin = this.checkIsAlreadyLogin.bind(this)
        this.redirectToDashboardPage = this.redirectToDashboardPage.bind(this)
        this.redirectToLoginPage = this.redirectToLoginPage.bind(this)
    }

    componentDidMount()
    {
        setTimeout(() =>
        {
            this.checkIsAlreadyLogin()
        }, 2000)

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        BackHandler.exitApp()
        return true;
    }

    checkIsAlreadyLogin()
    {
        AsyncStorage.getItem(Constants.strLSAppUserLoginData).then((value) => {
            if(value != null)
            {
                appUserLoginData = JSON.parse(value)
    
                if(appUserLoginData.alreadyLogged)
                {
                    this.redirectToDashboardPage()
                }
                else
                {
                    this.redirectToLoginPage()
                }
            }
            else
            {
                this.redirectToLoginPage()
            }
        }).done()
    }

    redirectToLoginPage()
    {
        const { navigate } = this.props.navigation;

        navigate('LoginPage', { name: 'Login' })
    }

    redirectToDashboardPage()
    {
        const { navigate } = this.props.navigation;

        navigate('DashboardPage', { name: 'Dashboard' })
    }

    render() 
    {
        console.disableYellowBox = true;
        
        return (
            <Fragment>
                <SafeAreaView style={customStyles.main}>
                    <View style={customStyles.mainSplash}>
                        <View style={customStyles.createBlock}>
                            <Image
                                style={customStyles.bannerImage} 
                                source={ProjImageAccess.appLogoImgIcon} />
                        </View>
                    </View>
                </SafeAreaView>
            </Fragment>
        );
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
    },
    bannerImage:
    {
        width: undefined,
        resizeMode: 'contain'
    },
});



/*********************************************
 * Exporting Area
**********************************************/
export default SplashPage