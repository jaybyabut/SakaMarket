import React from 'react'
import { Image, View } from 'react-native'


type imageProps = {
    imageItem: {
        id: number,
        imageSrc?: number,
        imageUri?: string,
    }
}


export default function imageCarousel({imageItem}: imageProps) {
  return (
    <View>
        <Image source={imageItem.imageSrc ?? {uri: imageItem.imageUri}}></Image>
    </View>    
  )
}
