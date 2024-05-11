import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ProgressBar} from 'react-native-paper';
import {COLORS} from '../../theme/themes';

const UploadProgress = () => {
  const dispatch = useDispatch();
  //video upload fix - https://github.com/facebook/react-native/commit/36cc71ab36aac5e5a78f2fbae44583d1df9c3cef
  const isUploading = useSelector(state => state?.user?.isUploading) || false;
  const uploadProgress = useSelector(state => state?.user?.progress) || 1;
  const uploadPath = useSelector(state => state?.user?.path);
  const actualProgress = uploadProgress / 100;

  console.log('isUploading', isUploading);
  console.log('uploadProgress', uploadProgress);
  console.log('actualProgress', actualProgress);

  return isUploading ? (
    <View
      style={{
        zIndex: 1000,
        width: '100%',
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingTop: 25,
        paddingBottom: 15,
        backgroundColor: COLORS.appBlack,
      }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: 5,
        }}>
        <Text
          style={{
            color: '#fff',
            marginTop: 20,
            fontSize: 12,
            marginBottom: 5,
            fontWeight: '500',
          }}>
          Upload in progress - {uploadProgress}%
        </Text>
      </View>
      <ProgressBar
        progress={uploadProgress > 0 ? uploadProgress / 100 : 0}
        color={
          uploadProgress < 50
            ? '#c00'
            : uploadProgress >= 50 && uploadProgress < 90
            ? 'yellow'
            : 'green'
        }
        style={{backgroundColor: '#666'}}
      />
    </View>
  ) : null;
};

export default UploadProgress;

const styles = StyleSheet.create({});
