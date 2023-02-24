import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { Heading, HStack, Image, Text, VStack, Icon } from "native-base"
import { Entypo } from "@expo/vector-icons"

type Props = TouchableOpacityProps & {

}

export const ExerciseCard = ({...rest}: Props) => {
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
          source={{ uri: 'https://classic.exame.com/wp-content/uploads/2016/09/size_960_16_9_doutor-house.jpg?quality=70&strip=info&w=960' }}
          alt="image base"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="center"
        />
        <VStack flex={1}>
          <Heading fontSize="lg" color="white">
            Remada Unilateral
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            3 séries de 12 repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" ml="auto" />
      </HStack>
    </TouchableOpacity>
  )
}