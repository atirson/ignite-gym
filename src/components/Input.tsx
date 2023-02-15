import { Input as NativeBaseInput, IInputProps } from 'native-base'

export const Input = ({...rest}: IInputProps) => {
  return (
    <NativeBaseInput 
      bg="gray.700"
      h={14}
      px={4}
      borderWidth={0}
      fontSize="md"
      color="white"
      placeholderTextColor="gray.300"
      fontFamily="body"
      borderColor="transparent"
      mb={4}
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...rest}
    />
  )
}