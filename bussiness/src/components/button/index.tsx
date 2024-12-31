import React from 'react';
import { View } from '@tarojs/components'
import AtButton  from 'taro-ui/lib/components/button'

const Button = () => { 
  return (
    <View className='mini-modules-Button'>  
      <AtButton type='primary'>按钮文案</AtButton>
    </View>
  )
}

export default Button;