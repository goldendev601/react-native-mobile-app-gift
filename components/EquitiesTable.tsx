import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import { IRootState } from '../reducers';
import { EquityType } from '../types';
import { getEquities } from '../actions/equityAction';
import {
  Text,
  View,
  ViewProps,
  useThemeColor,
} from './Themed';

import { utilStyles } from '../utilities/UtilStyles';


interface IEquitiesTableProps extends ViewProps {
  onClickEquity: (equity: any) => void;
}


const EquitiesTable: React.FC<IEquitiesTableProps> = (props) => {

  const dispatch = useDispatch();

  const equityData = useSelector((state: IRootState) => state.equity);

  const bgColor = useThemeColor({}, 'background');

  React.useEffect(() => {
    dispatch(getEquities());
  }, []);

  const renderEquityCell = (equity: EquityType) => {
    return (
      <TouchableWithoutFeedback onPress={() => props.onClickEquity(equity.name)} key={equity.name}>
        <View style={styles.row}>
          <View style={styles.cellStretched}>
            <Text>{equity.name}</Text>
            <Text>${equity.price}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <ScrollView style={[utilStyles.container, { backgroundColor: bgColor }]}>
      {
        equityData && equityData.results.length ?
        <View>
          {
            equityData.results.map((equity: EquityType) =>
              renderEquityCell(equity)
            )
          }
        </View>
        :
        null
      }

    </ScrollView>
  );
};

export default EquitiesTable;


const styles = StyleSheet.create({
  row: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellStretched: {
    flexGrow: 1,
    paddingHorizontal: 8,
    justifyContent: "space-between",
    display: 'flex',
    flexDirection: 'row',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
