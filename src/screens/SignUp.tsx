import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { api } from '@services/api';
import axios from 'axios';
import { Alert } from 'react-native';

const validationSchema = z.object({
    name: z.string().nonempty('Nome é obrigatório').min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string().nonempty('E-mail é obrigatório').email('E-mail inválido'),
    password: z.string().nonempty('Senha é obrigatório').min(6, 'Senha deve ter no mínimo 6 caracteres'),
    password_confirm: z.string().nonempty('Confirmar senha é obrigatório')
      .min(6, 'Confirmar senha deve ter no mínimo 6 caracteres'),
  })
  .refine(data => data.password === data.password_confirm, {
    message: 'As senhas não iguais',
    path: ['password_confirm']
  });

type ValidationSchema = z.infer<typeof validationSchema>;

export const SignUp = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<ValidationSchema>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
    },
    resolver: zodResolver(validationSchema)
  });

  const toast = useToast();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleNavigateToSignIn = () => {
    navigation.navigate('signIn');
  }

  const handleSingUp: SubmitHandler<ValidationSchema> = async ({name, email, password}: ValidationSchema) => {
    try {
      const response = await api.post('/users', {name, email, password});
      console.log(response.data);
    } catch (error) {
      const isAppError = error instanceof Error;
      const title = isAppError ? error.message : 'Não foi possível criar sua conta. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });

        
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message);
      }
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10}>
        <Image 
          source={BackgroundImg} 
          defaultSource={BackgroundImg}
          alt="Background" 
          resizeMode="contain" 
          position="absolute"
        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller 
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome'
                onChangeText={onChange}
                value={value} 
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='E-mail' 
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha' 
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirmar Senha' 
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSingUp)}
                errorMessage={errors.password_confirm?.message}
                returnKeyType="send"
              />
            )}
          />
          
          <Button 
            title="Criar e acessar" 
            onPress={handleSubmit(handleSingUp)}
          />
        </Center>

        <Button 
          mt={12}
          title="Voltar para o login" 
          variant="outline" 
          onPress={handleNavigateToSignIn}
        />
      </VStack>
    </ScrollView>
  )
}