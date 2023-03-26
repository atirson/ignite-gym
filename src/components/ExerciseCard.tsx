import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { Heading, HStack, Image, Text, VStack, Icon } from "native-base"
import { Entypo } from "@expo/vector-icons"
import { ExerciceDTO } from "@dtos/ExerciceDTO";

import { api } from "@services/api";

type Props = TouchableOpacityProps & {
  exercice: ExerciceDTO;
}

export const ExerciseCard = ({exercice, ...rest}: Props) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems={"center"}
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image 
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${exercice.thumb}` }}
          alt="image base"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            {exercice.name}
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            { exercice.series } séries de { exercice.repetitions } repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" ml="auto" />
      </HStack>
    </TouchableOpacity>
  )
}