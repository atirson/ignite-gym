import { useState } from "react";
import { SectionList, Heading, VStack } from "native-base";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";

export const History = () => {
  const [exercises, setExercises] = useState<any[]>([
    {title: '28.08.2022', data: ['Costas', 'Bíceps']},
    {title: '29.08.2022', data: ['Costas', 'Bíceps']},
    {title: '30.08.2022', data: ['Costas', 'Bíceps']}
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList 
        sections={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => 
          <HistoryCard />
        }
        renderSectionHeader={({ section: { title } }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">{title}</Heading>
        )}
        px={8}
        contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent: 'center'}}
        ListEmptyComponent={() => (
          <Heading 
            color="gray.100" 
            fontSize="md"
            textAlign="center" 
            fontFamily="heading"
          >
              Nenhum exercício encontrado. {'\n'} Vamos treinar!
          </Heading>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}