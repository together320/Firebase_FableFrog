import { Text } from "react-native"
export default props => <Text {...props} style={[{fontFamily: 'Nunito_400Regular'}, props.style]}>{props.children}</Text>