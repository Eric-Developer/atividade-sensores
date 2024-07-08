import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import TelaMovimentos from '../screens/TelaMovimentos';
const Stack = createStackNavigator();

export default function AppRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name='Movimentos' component={TelaMovimentos}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
