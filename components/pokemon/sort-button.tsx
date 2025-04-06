import { useThemesColors } from '@/hooks/use-themes-colors';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ThemedText } from '../themed-text';
import { Card } from '../card';
import Row from '../row';
import { Radio } from '../radio';
import { Shadows } from '@/constants/shadows';

type Props = {
  value: 'id' | 'name';
  onChange: (value: 'id' | 'name') => void;
};

export function SortButton({ value, onChange }: Props) {
  const buttonRef = useRef<View>(null);
  const colors = useThemesColors();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [position, setPosition] = useState<null | {
    top: number;
    right: number;
  }>(null);

  const onButtonPress = () => {
    // onChange(value === 'id' ? 'name' : 'id');
    buttonRef.current?.measure((x, y, width, height) => {
      setPosition({
        top: y + height + 100,
        right: 0,
      });
    });
    setModalVisible(true);
  };

  return (
    <>
      <Pressable onPress={onButtonPress}>
        <View
          ref={buttonRef}
          style={[styles.button, { backgroundColor: colors.grayWhite }]}
        >
          <Image
            source={
              value === 'id'
                ? require('@/assets/images/tag.png')
                : require('@/assets/images/text_format.png')
            }
            width={16}
            height={16}
          />
        </View>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setModalVisible(false)}
        />
        <View
          style={[
            styles.popup,
            { backgroundColor: colors.primary, ...position },
          ]}
        >
          <ThemedText
            style={styles.title}
            variant="subtitle2"
            color="grayWhite"
          >
            Sort by:
          </ThemedText>

          <Card style={styles.card}>
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => onChange(option.value)}
              >
                <Row gap={8}>
                  <Radio checked={option.value === value} />
                  <ThemedText>{option.label}</ThemedText>
                </Row>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
}

const options = [
  { value: 'id', label: 'number' },
  { value: 'name', label: 'Name' },
] as const;

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 32,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  popup: {
    position: 'absolute',
    width: 113,
    borderRadius: 12,
    padding: 4,
    gap: 16,
    paddingTop: 16,
    ...Shadows.dp2,
  },
  title: {
    paddingLeft: 20,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
});
