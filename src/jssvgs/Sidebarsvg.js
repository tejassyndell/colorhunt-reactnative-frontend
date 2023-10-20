import React from 'react';
import Svg, { Circle, Rect } from 'react-native-svg';

const SidebarSvg = () => {
  return (
    <Svg width={35} height={35} viewBox="0 0 35 35" fill="none">
      <Circle cx={17.5} cy={17.5} r={17.5} fill="#212121" />
      <Rect x={9} y={17.1426} width={17.1429} height={1.71429} rx={0.857143} fill="white" />
      <Rect x={9} y={22.2852} width={10.2857} height={1.71429} rx={0.857143} fill="white" />
      <Rect x={15.8574} y={12} width={10.2857} height={1.71429} rx={0.857143} fill="white" />
    </Svg>
  );
};

export default SidebarSvg;
