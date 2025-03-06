import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

export const BackButton = () => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{}}
            onPress={() => { navigation.goBack() }}
        >
            <AntDesign name="arrowleft" size={24} color={'#ffffff'} />
        </TouchableOpacity>

    )
}
