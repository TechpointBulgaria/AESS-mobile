import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { Colors } from '../../Themes'
import Widget from './Widget'
import Button from '../utility/Button'
import BooleanIndicatorView from '../utility/BooleanIndicatorView'
import { Icon } from 'react-native-elements'

export default ({ sensor, onPower, onMode, onPlus, onMinus }) => (
  // <Widget>
  <View
    style={{
      height: 50,
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Button loading={sensor.AC.powerPending} onPress={onPower}>
      <BooleanIndicatorView state={sensor.AC.state.IRONOFF}>
        <Icon inverse name="power" type="foundation" color={Colors.app.white} />
      </BooleanIndicatorView>
    </Button>
    <Button loading={sensor.AC.modePending} onPress={onMode}>
      <BooleanIndicatorView state={sensor.AC.state.IRMODE}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 17,
            color: Colors.app.white
          }}
        >
          M
        </Text>
      </BooleanIndicatorView>
    </Button>
    <Button loading={sensor.ACSET.decreaseTemperaturePending} onPress={onMinus}>
      <Icon inverse name="minus" type="entypo" color={Colors.app.white} />
    </Button>
    <Button loading={sensor.ACSET.increaseTemperaturePending} onPress={onPlus}>
      <Icon inverse name="plus" type="entypo" color={Colors.app.white} />
    </Button>
  </View>
  // </Widget>
)
