import { UserPhoto } from "@components/UserPhoto"
import { Heading, HStack, Text, VStack, Icon } from "native-base"

import defaultUserPhoto from "@assets/userPhotoDefault.png"

import { MaterialIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import { useAuth } from "@hooks/useAuth"
import { api } from "@services/api"

export const HomerHeader = () => {
  const { user, singOut } = useAuth()

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : defaultUserPhoto }
        size={16}
        alt={user.name}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={singOut}>
        <Icon 
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  )
}