import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";

const PHOTO_SIZE = 33;

const validationSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório").min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().nonempty("E-mail é obrigatório").email("E-mail inválido"),
  password: z
  .union([z.string().length(0, "Senha deve ter no mínimo 6 caracteres"), z.string().min(6, "Senha deve ter no mínimo 6 caracteres")])
  .optional()
  .transform(e => e === "" ? undefined : e),
  old_password: z.string().optional(),
  confirm_password: z.string().optional().transform(e => e === "" ? undefined : e),
}).refine(data => data.password === data.confirm_password, {
  message: "As senhas não são iguais",
  path: ["confirm_password"],
});

type FormDataProps = z.infer<typeof validationSchema>;

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState("https://github.com/atirson.png");

  const toast = useToast();
  const { user, updateUserProfile } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: zodResolver(validationSchema)
  });

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

  const handleProfileUpdate = async (data: FormDataProps) => {
    try {
      setIsLoading(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put('/users', data)
      updateUserProfile(userUpdated);

      toast.show({
        title: "Perfil atualizado com sucesso",
        placement: "top",
        bgColor: "green.700",
      });

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Erro inesperado"; 

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
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

          <Controller 
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Nome"
                bg="gray.600"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="E-mail"
                bg="gray.600"
                value={value}
                onChangeText={onChange}
                isDisabled
                autoCorrect={false}
              />
            )}
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

          <Controller 
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input 
                placeholder="Senha atual"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.old_password?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input 
                placeholder="Nova senha"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input 
                placeholder="Confirme a nova senha"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button 
            title="Atualizar senha"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isLoading}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}