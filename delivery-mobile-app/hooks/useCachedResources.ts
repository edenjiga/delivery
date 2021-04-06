import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

import storageService from '@/utils/storageService';
import { getUserByToken } from '@/api/user';
import { loginUserAsync } from '@/store/actions/user';
import { useDispatch } from 'react-redux';
import { fetchUnfinishedOrdersAsync } from '@/store/actions/orders';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const dispatch = useDispatch();
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      const getUser = async () => {
        try {
          const user = await getUserByToken();
          dispatch(loginUserAsync.success(user));
          return user;
        } catch (error) {}
      };

      try {
        SplashScreen.preventAutoHideAsync();

        await Promise.all([
          // Load fonts
          Font.loadAsync({
            ...Ionicons.font,
            'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          }),
          storageService.initialize(),
        ]);

        const user = await getUser();
        if (user) dispatch(fetchUnfinishedOrdersAsync.request());
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
