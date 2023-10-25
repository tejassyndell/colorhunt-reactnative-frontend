import * as React from 'react';
import Svg, { G, Circle, Path, Rect, Defs, Stop, LinearGradient } from 'react-native-svg';

function Ordersuccessful(props) {
  return (
    <Svg style={{
        width: 100,
        height: 100,
        marginBottom: 20,
        marginTop: 30,
      }} viewBox="0 0 100 100" fill="none" {...props}>
      <G id="Group_1000005766">
        <G id="Group_1000005764">
          <Circle id="Ellipse_23" cx={50} cy={50} r={50} fill="#212121" />
          <G id="Group_1000005763">
            <Path
              id="Rectangle_18837"
              d="M30 33C30 31.3431 31.3431 30 33 30H67C68.6569 30 70 31.3431 70 33V42H30V33Z"
              fill="white"
            />
            <Path
              id="Rectangle_18838"
              d="M30 44.667H70V67.0003C70 68.6572 68.6569 70.0003 67 70.0003H33C31.3431 70.0003 30 68.6572 30 67.0003V44.667Z"
              fill="white"
            />
            <Rect id="Rectangle_18839" x={54.7061} y={58} width={9.41176} height={5.33333} rx={1} fill="black" />
          </G>
        </G>
        <Circle id="Ellipse_20" cx={86} cy={14} r={14}>
          <Defs>
            <LinearGradient id="paint0_linear_78_709" x1="72.0007" y1="14.0002" x2="99.9985" y2="14.0002" gradientUnits="userSpaceOnUse">
              <Stop stopColor="#8CCC44" />
              <Stop offset={1} stopColor="#5CC450" />
            </LinearGradient>
          </Defs>
        </Circle>
      </G>
    </Svg>
  );
}

export default Ordersuccessful;
