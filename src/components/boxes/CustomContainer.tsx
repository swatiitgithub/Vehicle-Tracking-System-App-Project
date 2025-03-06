import { StyleSheet, Text, View } from "react-native";

const CustomContainer = ({ header, topRightText, description, description1, descriptionIcon }: any) => {
    return (
        <View style={[styles.card, styles.elevation]}>
            {/* Top Header and Right Side Text */}
            {header || topRightText ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                {header && <Text style={{ fontWeight: '700', color: '#000000' }}>{header}</Text>}
                {topRightText && <Text style={{ color: '#FF7171', fontSize: 12 }}>{topRightText}</Text>}
            </View>
                : null}
            {/* Description 1 */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {descriptionIcon && <View style={{ width: 20, marginHorizontal: 5 }}>
                    {descriptionIcon}
                </View>}
                <Text style={{
                    flex: 1,
                    marginVertical: 3,
                    color: '#959595',
                    flexWrap: 'wrap',
                    fontSize: 13,

                }}>{description}</Text>
            </View>
            {/* Description 2 */}
            {description1 && <Text>{description1}</Text>}
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#0500FF0D',
        marginTop: 5,
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal:3,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    elevation: {
        elevation: 20,
        shadowColor: '#0500FF0D',
    },
});

export default CustomContainer;