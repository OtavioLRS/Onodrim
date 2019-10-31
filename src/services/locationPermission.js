import {PermissionsAndroid} from 'react-native';

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão de localização',
        message: 'Precisamos de sua permissão para acessar sua localização.',
        buttonNegative: 'Não',
        buttonPositive: 'Sim',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return;
    } else {
      alert('Você não poderá usar o aplicativo sem garantir acesso!');
      await requestLocationPermission();
    }
  } catch (err) {
    console.warn(err);
  }
}