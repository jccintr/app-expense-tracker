import { View } from 'react-native';
import React from 'react';
import { cores } from '../../styles/core';

const Separator = () => {
  return (
    <View
    style={{
      backgroundColor: cores.ashGray,
      height: 0.5,
    }}
  />
  )
}

export default Separator
