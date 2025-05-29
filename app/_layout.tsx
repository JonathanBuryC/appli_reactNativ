import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {UserDetailContext} from '../context/UserDetailContext';
import React, { useState } from 'react';



export default function Layout() {
    const [userDetail,setUserDetail] = useState();
    return (
        <UserDetailContext.Provider value={{userDetail,setUserDetail}}>    

        
            <Stack screenOptions={{
                headerTitleAlign: 'center',
                headerShown: false,
                headerTintColor: '#000',
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                },
            }}>
                <Stack.Screen
                    name="landingScreen"
                    options={{
                        title: 'Ecran d\'accueil',
                        headerLeft: () => (
                            <Ionicons name="menu-outline" size={24} color="#000" />
                        ),
                    }}
                />
            </Stack>
        </UserDetailContext.Provider>
    );
}
    