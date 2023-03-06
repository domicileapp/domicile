import theme from '@/common/theme'
import { LockOutlined } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material'
import { Box, Container } from '@mui/system'

const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    })
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Card
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 2,
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: 'secondary.main',
              }}
            >
              <LockOutlined />
            </Avatar>
            <Typography component='h1' variant='h4' align='center'>
              Login
            </Typography>
            <CardContent>
              <Box
                component='form'
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='Username'
                  name='username'
                  autoComplete='username'
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='#' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default Login
