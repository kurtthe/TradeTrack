import React from 'react';
import {useFonts} from 'expo-font';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { Icon } from 'galio-framework';

import nowConfig from '@assets/config/now.json';
const NowExtra = require('@assets/font/now.ttf');
const IconNowExtra = createIconSetFromIcoMoon(nowConfig, 'NowExtra');

const IconExtra = (props) => {
  const [loaded] = useFonts({ NowExtra: NowExtra });
    const { name, family, ...rest } = props;

    if (name && family && loaded) {
      if (family === 'NowExtra') {
        return <IconNowExtra name={name} family={family} {...rest} />;
      }
      return <Icon name={name} family={family} {...rest} />;
    }

    return null;
}

export default IconExtra;
