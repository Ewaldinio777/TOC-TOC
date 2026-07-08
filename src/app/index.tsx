import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { VStack } from '../components/ui/vstack';
import { Heading } from '../components/ui/heading';
import { Text } from '@/src/components/ui/text';
import {Alert } from 'react-native'
import { supabase } from '@/utils/supabase'
import { Button, ButtonText } from '../components/ui/button';
import { Input, InputField, InputIcon, InputSlot } from '../components/ui/input';
import { EyeIcon, EyeOffIcon } from '../components/ui/icon';
import { FormControl } from '../components/ui/form-control';


export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = React.useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <FormControl className="p-4 border border-border/80 rounded-lg w-full">
      <VStack className="gap-4" justifyContent="center">
        <Heading className="text-foreground">Inicio Sesión</Heading>
        <VStack space="xs">
          <Text className="text-foreground/60">Email</Text>
          <Input>
            <InputField
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              type="text"
            />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-foreground/60">Contraseña</Text>
          <Input className="textAlign=center">
          <InputField
              value={password}
              onChangeText={setPassword}
              type={showPassword ? 'text' : 'password'}
            />
            <InputSlot className="pr-3" onPress={handleState}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
        <Button className="ml-auto" onPress={signInWithEmail} isDisabled={loading}>
                    <ButtonText>Iniciar Sesión</ButtonText>
        </Button>
        <Button className="ml-auto" onPress={signUpWithEmail} isDisabled={loading}>
          <ButtonText>Registrarse</ButtonText>
        </Button>
      </VStack>
    </FormControl>
</SafeAreaView>
  );
}