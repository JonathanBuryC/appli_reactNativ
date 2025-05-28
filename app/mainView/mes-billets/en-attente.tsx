import { View, Text } from 'react-native';

export default function EnAttente() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Billets en attente de confirmation</Text>
    </View>
  );
}
