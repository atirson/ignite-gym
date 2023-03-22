import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';

type FormData = {
  email: string;
  password: string;
}

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const toast = useToast();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const handleNavigateToSignUp = () => {
    navigation.navigate('signUp');
  }

  const handleSignIn: SubmitHandler<FormData> = async ({email, password}: FormData) => {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível fazer login. Tente novamente mais tarde.';

      setIsLoading(false);

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
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
            Acesse sua conta
          </Heading>

          <Controller 
            control={control}
            name="email"
            rules={{ required: 'E-mail obrigatório' }}
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
            rules={{ required: 'Senha obrigatória' }}
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
          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} isLoading={isLoading} />
        </Center>
        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body" >
            Ainda não tem acesso?
          </Text>
          <Button 
            title="Criar conta" 
            variant="outline" 
            onPress={handleNavigateToSignUp}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}