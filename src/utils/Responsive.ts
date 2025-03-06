import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';


export const hp = (value: string) => {
    return heightPercentageToDP(value)
}

export const wp = (value: string) => {
    return widthPercentageToDP(value)
}

export const fontSize = (value: string) => {
    return heightPercentageToDP(value)
}

