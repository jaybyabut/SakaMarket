import { Alert } from 'react-native';
import removeItemFunction from '../components/removeItemFunction';

type itemCardProps = {
    item: {
        id: number,
        image?: string;
        date: number;
        name: string;
        price: number;
        amount: number;
        description: string;
        title: string;
    };
};

export default function removeConfirmation(item: itemCardProps["item"]) {
  Alert.alert(
    'WARNING',
    'Gusto mo ba talagang tanggalin ang produktong ito?',
    [
      {
        text: 'Hindi',
        onPress: () => null,
        style: 'cancel',
      },

      {
        text: 'Oo',
        style: 'destructive',
        onPress: ()=> removeItemFunction(item)
      }
    ],
    {
      cancelable: false
    }
  );
}
