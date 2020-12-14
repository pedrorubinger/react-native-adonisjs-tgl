import React from 'react';
import { FlatList } from "react-native";

const VirtualizedView = ({ children, style }) => {
    return (
      <FlatList
        style={style}
        ListHeaderComponent={() => <>{ children }</>}
      />
    );
}

export default VirtualizedView;