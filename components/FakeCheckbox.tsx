// components/FakeCheckbox.tsx
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function FakeCheckbox({ value, onChange }) {
  return (
    <TouchableOpacity
      onPress={() => onChange(!value)}
      style={{
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#555',
        backgroundColor: value ? '#007AFF' : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
      }}
    >
      {value && (
        <View
          style={{
            width: 12,
            height: 12,
            backgroundColor: '#fff',
            borderRadius: 2,
          }}
        />
      )}
    </TouchableOpacity>
  );
}
