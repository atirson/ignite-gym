import { useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState("https://github.com/atirson.png");

  const toast = useToast();

  const handleSelectPhoto = async () => {
    setIsLoading(true);

    try {  
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // only images
        allowsEditing: true, // allows cropping
        aspect: [4, 4], // 4:4 aspect ratio
        quality: 1, // 100% quality
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const file = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

        if (file.size && file.size > 1024 * 1024 * 5) {
          return toast.show({
            title: "Ops!",
            description: "A imagem deve ter no máximo 5MB",
            placement: "top",
            bgColor: "red.500",
            duration: 3000,
          });
        }

        setPhoto(photoSelected.assets[0].uri);

      }
  
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Profile" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
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
                  uri: photo
                }}
                size={PHOTO_SIZE}
                alt="Atirson"
                mr={4}
              />
          }
          <TouchableOpacity onPress={handleSelectPhoto}>
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

        <Heading
            color="gray.200"
            fontSize="md"
            mb={2}
            mt={12}
            alignSelf="flex-start"
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
        </Center>
      </ScrollView>
    </VStack>
  )
}