import { useState } from "react";
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { isLoading } from "expo-font";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Profile" />

      <ScrollView>
        <Center mt={6} px={10}>
          {
            isLoading ?
              <Skeleton 
                startColor="gray.400" 
                endColor="gray.500" 
                rounded="full" 
                w={PHOTO_SIZE} 
                h={PHOTO_SIZE} 
              /> 
              :
              <UserPhoto 
                source={{
                  uri: "https://github.com/atirson.png"
                }}
                size={PHOTO_SIZE}
                alt="Atirson"
                mr={4}
              />
          }
          <TouchableOpacity>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input 
            placeholder="Nome"
            bg="gray.600"
            value="Atirson Fabiano B. de Oliveira"
          />

          <Input 
            placeholder="E-mail"
            bg="gray.600"
            value="atirson@gmail.com"
            isDisabled
            autoCorrect={false}
          />
        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading
            color="gray.200"
            fontSize="md"
            mb={2}
          >
            Alterar senha
          </Heading>

          <Input
            placeholder="Senha atual"
            bg="gray.600"
            secureTextEntry
          />

          <Input
            placeholder="Nova senha"
            bg="gray.600"
            secureTextEntry
          />

          <Input
            placeholder="Confirme a nova senha"
            bg="gray.600"
            secureTextEntry
          />

          <Button 
            title="Atualizar senha"
            mt={4}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}