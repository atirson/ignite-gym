import { Box, useTheme } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthRoutes } from "@routes/auth.routes";
import { AppRoutes } from '@routes/app.routes';
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

export const Routes = () => {
  const { colors } = useTheme();
  
  const { user, isLoadingUserStorageData } = useAuth()

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme} >
        {
          user.id ? <AppRoutes /> : <AuthRoutes />
        }
      </NavigationContainer>
    </Box>
  );
}