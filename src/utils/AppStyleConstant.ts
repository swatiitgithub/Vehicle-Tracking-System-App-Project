import { Platform } from "react-native";

const AppStyleConstant = {

    // FONT_FAMILY: 'NunitoSans-SemiBold',
    FONT_FAMILY: Platform.OS == 'ios' ? 'Helvetica' : 'Poppins-Medium',

    FONT_FAMILY_ROBOTO_BLACK : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-Black', 
    FONT_FAMILY_ROBOTO_BLACKITALIC : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-BlackItalic', 
    FONT_FAMILY_ROBOTO_BOLD : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-Bold', 
    FONT_FAMILY_ROBOTO_BOLDITALIC : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-BoldItalic', 
    FONT_FAMILY_ROBOTO_ITALIC : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-Italic', 
    FONT_FAMILY_ROBOTO_LIGHT : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-Light', 
    FONT_FAMILY_ROBOTO_LIGHTITALIC : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-LightItalic', 
    FONT_FAMILY_ROBOTO_ROBOTOMEDIUM : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-Medium', 
    FONT_FAMILY_ROBOTO_MEDIUMITALIC : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-MediumItalic', 
    FONT_FAMILY_ROBOTO_REGULAR : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-Regular', 
    FONT_FAMILY_ROBOTO_THIN : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-Thin', 
    FONT_FAMILY_ROBOTO_THINITALIC : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-ThinItalic', 
    ROBOTOMONO_ITALIC_VARIABLEFONT_WGHT : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-Italic-VariableFont_wght', 
    ROBOTOMONO_VARIABLEFONT_WGHT : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-VariableFont_wght', 
    
    
    ROBOTO_SLAB_VF : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoSlab-VariableFont_wght', 
    ROBOTO_SLAB_B : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoSlab-Bold', 
    ROBOTO_SLAB_EB : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoSlab-ExtraBold', 
    ROBOTO_SLAB_SB : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoSlab-SemiBold', 
    ROBOTO_SLAB_REG : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoSlab-Regular', 
    ROBOTO_SLAB_M : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoSlab-Medium', 
    ROBOTO_SLAB : Platform.OS == 'ios' ? 'Helvetica' : 'RobotoMono-VariableFont_wght', 


    Calibri_Bold : Platform.OS == 'ios' ? 'Helvetica' : 'Calibri-Bold', 
    Calibri_Regular : Platform.OS == 'ios' ? 'Helvetica' : 'Calibri-Regular', 

    JosefinSans_SemiBold : Platform.OS == 'ios' ? 'Helvetica' : 'JosefinSans-SemiBold', 

    Pacifico_Regular : Platform.OS == 'ios' ? 'Helvetica' : 'Pacifico-Regular', 
    Lobster_Regular : Platform.OS == 'ios' ? 'Helvetica' : 'Lobster-Regular', 

    CRIMSONPRO_BLACK : Platform.OS == 'ios' ? 'Helvetica' : 'CrimsonPro-Black', 
    CRIMSONPRO_BOLDITALIC : Platform.OS == 'ios' ? 'Helvetica' : 'CrimsonPro-BoldItalic', 
    CRIMSONPRO_EXTRABOLD : Platform.OS == 'ios' ? 'Helvetica' : 'CrimsonPro-ExtraBold', 
    CRIMSONPRO_EXTRABOLDITALIC : Platform.OS == 'ios' ? 'Helvetica' : 'CrimsonPro-ExtraBoldItalic', 
    CRIMSONPRO_EXTRALIGHT : Platform.OS == 'ios' ? 'Helvetica' : 'CrimsonPro-ExtraLight', 
    CRIMSONPRO_EXTRALIGHTITALIC : Platform.OS == 'ios' ? 'Helvetica' : 'CrimsonPro-ExtraLightItalic', 
    CRIMSONPRO_SEMIBOLD : Platform.OS == 'ios' ? 'Helvetica' : 'CrimsonPro-SemiBold', 
    CRIMSONPRO_VARIABLEFONT_WGHT : Platform.OS == 'ios' ? 'Helvetica' : 'CrimsonPro-Italic-VariableFont_wght', 
    CRIMSONPRO_BOLD : Platform.OS == 'ios' ? 'Helvetica' : 'CrimsonPro-Bold', 
        
     // FONT_FAMILY: 'Poppins-SemiBold',

};

export default AppStyleConstant;
