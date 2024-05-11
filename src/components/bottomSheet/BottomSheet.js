import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {windowHeight} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';

const BottomSheet = ({bottomSheetRef, height, children, bottomsheetTitle}) => {
  return (
    <RBSheet
      ref={bottomSheetRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={windowHeight / (height || 1.2)}
      render
      customStyles={{
        wrapper: {
          backgroundColor: '#000000b3',
        },
        draggableIcon: {
          backgroundColor: '#ccc',
        },
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: COLORS.white,
        },
      }}>
      <Text style={styles.bottomSheetTitle}>{bottomsheetTitle}</Text>
      {children}
    </RBSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetTitle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 10,
  },
});
