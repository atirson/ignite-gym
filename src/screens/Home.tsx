import { useState } from "react";
import { FlatList, Heading, HStack, Text, VStack } from "native-base";

import { HomerHeader } from "@components/HomerHeader";
import { Group } from "@components/Group";

export const Home = () => {
  const [groups, setGroups] = useState(['pernas', 'ombros', 'biceps', 'triceps', 'costas', 'peito', 'abdomen', 'cardio']);
  const [groupSelected, setGroupSelected] = useState("pernas");

  return (
    <VStack flex={1}>
      <HomerHeader />

      <FlatList 
        data={groups}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
            />
        )}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            4
          </Text>
        </HStack>
      </VStack>

    </VStack>
  )
}