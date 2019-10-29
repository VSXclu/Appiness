/*********************************************
 * Importing Area
**********************************************/
import React, {
    Component,
    Fragment
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    BackHandler,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import Colors from '../../themes/Colors';

import { connect } from 'react-redux';

import ProjImageAccess from '../../configuration/ProjImageAccess';

import Constants from '../utility/Constants';

import Feather from 'react-native-vector-icons/Feather';

import { ScrollView } from 'react-native-gesture-handler';



/*********************************************
 * Functional Area
**********************************************/
class DashboardPage extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() 
    {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        this.logoutUser = this.logoutUser.bind(this)
    }

    componentWillUnmount() 
    {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() 
    {
        BackHandler.exitApp()
        return true;
    }

    logoutUser()
    {
        let joAppRegisteredUserData = {
            alreadyLogged: false
        }

        AsyncStorage.setItem(Constants.strLSAppUserLoginData, JSON.stringify(joAppRegisteredUserData))

        const { navigate } = this.props.navigation;

        navigate('LoginPage', { name: 'Login' })
    }

    render() 
    {
        return (
            <Fragment>
                <SafeAreaView style={customStyles.main}>
                    <View style={customStyles.toolbar}>
                        <View style={customStyles.titleBlock}>
                            <Text style={customStyles.titleInnerBlock}>
                                {Constants.strDashboardTitle}
                            </Text>
                        </View>
                        <View style={customStyles.logoutBlock}>
                            <TouchableOpacity
                                style={customStyles.logoutInnerBlock}
                                onPress={() => this.logoutUser()}>
                                <Feather 
                                    name="log-out"
                                    size={25} 
                                    color={Colors.pureBlack_000000} />
                            </TouchableOpacity>
                            <Text>
                                {Constants.strLogoutLabel}
                            </Text>
                        </View>
                    </View>
                    <ScrollView 
                        showsVerticalScrollIndicator={false}>
                    {
                        this.props.dashboardList.map((dashList, index) => {
                            return <View 
                                style={customStyles.listItem}
                                key={index} >
                                    <View style={customStyles.barOne}>
                                        <Text style={customStyles.barOneTitleBlock}>
                                            {dashList.name}
                                        </Text>
                                        <View style={customStyles.barOneGendeerBlock}>
                                            {
                                                (dashList.gender == "male") ?
                                                <Image
                                                    style={customStyles.genderIcon}
                                                    source={ProjImageAccess.maleIcon}/>
                                                :
                                                (dashList.gender == "female") ?
                                                <Image
                                                    style={customStyles.genderIcon}
                                                    source={ProjImageAccess.femaleIcon}/>
                                                :
                                                <Image
                                                    style={customStyles.genderIcon}
                                                    source={ProjImageAccess.transgenderIcon}/>
                                            }
                                        </View>
                                    </View>
                                    <Text style={customStyles.barOnePhNumBlock}>
                                        {dashList.phoneNo}
                                    </Text>
                                    <Text style={customStyles.barOneAgeBlock}>
                                        {dashList.age} years old
                                    </Text>
                                    <Text style={customStyles.barOneEmailBlock}>
                                        {dashList.email}
                                    </Text>
                            </View>
                        })
                    }
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    }
}



/*********************************************
 * Mapping Area
**********************************************/
function mapStateToProps (state) {
    return {
        dashboardList: state.dashboardListRedu.dashboardList
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
    toolbar:
    {
        flexDirection: 'row',
    },
    titleBlock:
    {
        flex: 1.5,
        marginTop: 40,
    },
    titleInnerBlock:
    {
        fontSize: 40,
        color: Colors.pureBlack_000000,
        marginLeft: 20,
        marginBottom: 20,
        alignSelf: 'flex-start',
        borderBottomWidth: 5,
        borderColor: Colors.appColor_00BDD7
    },
    logoutBlock:
    {
        flex: 0.5,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutInnerBlock:
    {
        backgroundColor: Colors.appColor_00BDD7,
        padding: 10,
        borderRadius: 50
    },
    listItem:
    {
        backgroundColor: Colors.pureWhite_ffffff,
        marginTop: 1,
        shadowColor: Colors.appColor_00BDD7,
        shadowOpacity: 0,
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    barOne:
    {
        flexDirection: 'row',
    },
    barOneTitleBlock:
    {
        flex: 1.7,
        fontSize: 20,
        textTransform: 'capitalize',
        color: Colors.appColor_00BDD7,
        fontWeight: 'bold'
    }, 
    barOneGendeerBlock:
    {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    genderIcon:
    {
        width: 25,
        height: 25
    },
    barOnePhNumBlock:
    {
        fontSize: 18,
        marginTop: 5
    },
    barOneAgeBlock:
    {
        fontSize: 16,
        marginTop: 2,
        color: Colors.lightGrey_3c4245
    },
    barOneEmailBlock:
    {
        fontSize: 16,
        marginTop: 2,
        color: Colors.lightGrey_3c4245
    }
});



/*********************************************
 * Exporting Area
**********************************************/
export default connect(
    mapStateToProps,
  )(DashboardPage)