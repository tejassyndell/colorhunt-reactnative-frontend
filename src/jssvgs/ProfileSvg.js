import React from 'react';
import { Image } from 'react-native';
import Svg, { G, Circle, Rect, Defs, Pattern, Use } from 'react-native-svg';
import { View } from 'react-native';

const ProfileSvg = () => {
  return (

    <Svg width={35} height={35} viewBox="0 0 35 35" fill="none" >
      <Circle cx={17.5} cy={17.5} r={17.5} fill="#212121" />
      <Rect x={7.7002} y={1.40039} width={20.3} height={31.5} fill="url(#pattern0)" />
      <Defs>
        <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width={1} height={1}>
          <Use xlinkHref="#image0_3559_2494" transform="matrix(0.00377155 0 0 0.00243056 -0.482759 -0.111111)" />
        </Pattern>
        <View style={{ marginLeft: "18%", paddingTop: '16%' }}>
          <Image style={{ width: 22, height: 22 }}
            source={require("../../assets/Nevbar/Rectangle97.png")}
          />
        </View>
      </Defs>
    </Svg>

  );
};

export default ProfileSvg;