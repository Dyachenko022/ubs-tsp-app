import React from 'react';
import { Image, View, ViewStyle } from 'react-native';
import { useLayoutEffect, useState } from 'react';

interface IAutosizeImageProps {
  source: IImageUri,
  maxWidth?: number,
  maxHeight?: number,
  containerStyle?: ViewStyle,
}

export default function AutosizeImage(props: IAutosizeImageProps) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    Image.getSize(props.source.uri, (w, h) => {
      const scaleRatio = w / h;
      const maxHeight = props.maxHeight ?? Number.MAX_SAFE_INTEGER;
      const maxWidth = props.maxWidth ?? Number.MAX_SAFE_INTEGER;
      if (h > maxHeight) {
        h = maxHeight;
        w = h * scaleRatio;
      }
      if (w > maxWidth) {
        w = maxWidth;
        h = w / scaleRatio;
      }
      setWidth(w);
      setHeight(h);
    });
  });

  return (
    <View style={props.containerStyle}>
      <Image source={props.source} style={{width, height}} />
    </View>
  );
}
