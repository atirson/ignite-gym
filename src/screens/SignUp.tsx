import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export const SignUp = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleNavigateToSignIn = () => {
    navigation.navigate('signIn');
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={10}>
        <Image 
          source={BackgroundImg} 
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
          <Input 
            placeholder='Nome'
          />
          <Input 
            placeholder='E-mail' 
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder='Senha' 
            secureTextEntry
          />
          <Button title="Criar e acessar" />
        </Center>

        <Button 
          mt={24}
          title="Voltar para o login" 
          variant="outline" 
          onPress={handleNavigateToSignIn}
        />
      </VStack>
    </ScrollView>
  )
}