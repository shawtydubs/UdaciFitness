import React from 'react'
import { View, StatusBar, Platform} from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'
import EntryDetail from './components/EntryDetail'
import {iosTabs, androidTabs} from './components/Tabs'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const nav = Platform.OS === 'ios' ? iosTabs : androidTabs

const MainNavigator = createStackNavigator({
    Home: {
        screen: nav,
        navigationOptions: {
            header: null
        }
    },
    EntryDetail: {
        screen: EntryDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            }
        }
    }
})

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification();
    };

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}
