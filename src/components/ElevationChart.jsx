import React from "react";
import 'devextreme/dist/css/dx.light.css';
import Chart, { ArgumentAxis, Series, Legend, ValueAxis, Size, Label} from 'devextreme-react/chart';

export default function ElevationChart(props) {
  return (
    <Chart dataSource={props.dataSource}>
      <Size height={200} />
      <ArgumentAxis tickInterval={5} />
      <ValueAxis showZero={false} />
      <Series type="area" />
      <Legend visible={false} />
    </Chart>
  );
}
