import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';

import storageService from '@/utils/storageService';
import { getUserByToken } from '@/api/user';
import { loginUserAsync } from '@/store/actions/user';
import { useDispatch } from 'react-redux';
import { fetchUnfinishedOrdersAsync } from '@/store/actions/orders';
import { getSettings } from '@/api/settings';
import { setModalState } from '@/store/actions/modal';
import environment from '@/environment';
import { setSettings } from '@/store/actions/settings';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [appVersionMatch, setAppVersionMatch] = useState(true);
  // const {} = useModal()
  const dispatch = useDispatch();

  const fetchSettings = async () => {
    try {
      const settings = (await getSettings()) as any;

      //Load settings
      dispatch(setSettings(settings));

      if (
        settings.nativeAppVersion !== environment.nativeAppVersion?.toString()
      ) {
        setAppVersionMatch(false);
      }

      if (!settings.isStoreOpen) {
        dispatch(
          setModalState({
            isVisible: true,
            text:
              'En el momento no tenemos servicio, Puedes seguir usando la app sin problemas, pero no podras generar una orden',
            buttonText: 'Confirmar',
          }),
        );
      }
    } catch (err) {
      //TODO throw error
      setModalState({
        isVisible: true,
        text: 'Ups algo fallo',
        buttonText: 'Confirmar',
      });
    }
  };
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
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
            lato: require('assets/fonts/Lato-Regular.ttf'),
            latoBold: require('assets/fonts/Lato-Bold.ttf'),
          }),
          storageService.initialize(),
          fetchSettings(),
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

  return { isLoadingComplete, appVersionMatch };
}
