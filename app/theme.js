import constant from './constant'

const color = {
    primary: '',
    secondary: '',
    bg_app: '#E9EBEE',
    access: 'white',
    text: '#2b2b2b',
    green: '#00551e',
    brown: '#693504',
    red: '#db2828'
}

//other
const active = {
    opacity: 0.6
}

const appStyle = {
    appScreen: {
        flex: 1
    },
    appHor: {
        flexDirection: 'row'
    },
    appVer: {
        flexDirection: 'column'
    },
    appText: {
        color: color.text,
        fontSize: constant.font.NOMAL
    },
    appPadding: {
        paddingHorizontal: constant.PADDING_HOR,
        paddingVertical: constant.PaDDING_VER
    },
    appShadow: {
        margin: 3,
        borderRadius: 6,
        shadowRadius: 1,
        shadowOpacity: 0.6,
        shadowOffset: { width: 2, height: 2 },
        elevation: 2,
    },
    itemNameBreedDogs: {
        flexDirection: 'row',
        marginHorizontal: constant.MARGIN_HOR,
        marginVertical: constant.MARGIN_VER,
        paddingHorizontal: constant.PADDING_HOR,
        paddingVertical: constant.PADDING_VER,
        borderRadius: constant.BORD_RADIUS
    }
}
export { color, active, appStyle }
export default { color, active, appStyle }