import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'

export const LoginPage = () => {
  return (
    <Container size={420} my={40}>
      <Title
        align='center'
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color='dimmed' size='sm' align='center' mt={5}>
        Do not have an account yet?{' '}
        <Anchor size='sm' component='button'>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <TextInput label='Email' placeholder='first.last@gmail.com' required />
        <PasswordInput label='Password' placeholder='Your password' required mt='md' />
        <Group position='apart' mt='lg'>
          <Checkbox label='Remember me' />
          <Anchor component='button' size='sm'>
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt='xl' onClick={() => methodDoesNotExist()}>
          Login
        </Button>
      </Paper>
    </Container>
  )
}
