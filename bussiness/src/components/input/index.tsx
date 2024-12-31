import React from 'react';
import { View } from '@tarojs/components'
import AtInput from 'taro-ui/lib/components/input'

const Input = () => { 
  return (
    <View className='mini-modules-Input'>
      <AtInput
        name='value'
        title='标准五个字'
        type='text'
        placeholder='标准五个字'
        value='a'
        onChange={() => {}}
      />
    </View>
  )
}

export default Input;