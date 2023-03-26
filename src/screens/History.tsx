import { useCallback, useEffect, useState } from "react";
import { SectionList, Heading, VStack, useToast } from "native-base";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { useFocusEffect } from "@react-navigation/native";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

export const History = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  const fecthHistory = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/history');
      setExercises(response.data);
      
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar o histórico.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fecthHistory();
  }, [exercises]));

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList 
        sections={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => 
          <HistoryCard data={item} />
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