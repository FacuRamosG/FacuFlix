import { LoadingButton } from '@mui/lab'
import { Alert, Box, Button, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import userApi from '../../api/modules/user.api'
import { setAuthModalOpen } from '../../redux/features/authModalSlice'
import { setUser } from '../../redux/features/userSlice'

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch()

  const [isLoginRequest, setIsLoginRequest] = useState(false)
  const [errorMesage, setErrorMesage] = useState()

  const signupForm = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      displayName: ''

    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'username minimum 8 characters')
        .required('username is necesary'),
      password: Yup.string()
        .min(8, 'password minimum 8 characters')
        .required('password is necesary'),
      confirmPassword: Yup.string()
        .min(8, 'confirmPassword minimum 8 characters')
        .required('confirmPassword is necesary'),
      displayName: Yup.string()
        .min(8, 'displayName minimum 8 characters')
        .required('displayName is necesary')

    }),
    onSubmit: async values => {
      setErrorMesage(undefined)
      setIsLoginRequest(true)
      const { response, err } = await userApi.signup(values)
      setIsLoginRequest(false)

      if (response) {
        signupForm.resetForm()
        dispatch(setUser(response))
        dispatch(setAuthModalOpen(false))
        toast.success('Signup is success')
      }

      if (err) setErrorMesage(err.message)
    }
  })
  return (
        <Box component='form' onSubmit={signupForm.handleSubmit} >
            <Stack spacing={3}>
                 <TextField
                    type='text'
                    placeholder='Name'
                    name='displayName'
                    fullWidth
                    value={signupForm.values.displayName}
                    onChange={signupForm.handleChange}
                    color='success'
                    error={signupForm.touched.displayName && signupForm.errors.displayName !== undefined}
                    helperText={signupForm.touched.displayName && signupForm.errors.displayName}

                />
                <TextField
                    type='text'
                    placeholder='username'
                    name='username'
                    fullWidth
                    value={signupForm.values.username}
                    onChange={signupForm.handleChange}
                    color='success'
                    error={signupForm.touched.username && signupForm.errors.username !== undefined}
                    helperText={signupForm.touched.username && signupForm.errors.username}

                />
                <TextField
                    type='password'
                    placeholder='password'
                    name='password'
                    fullWidth
                    value={signupForm.values.password}
                    onChange={signupForm.handleChange}
                    color='success'
                    error={signupForm.touched.password && signupForm.errors.password !== undefined}
                    helperText={signupForm.touched.password && signupForm.errors.password}

                />
                <TextField
                        type='password'
                        placeholder='confirmPassword'
                        name='confirmPassword'
                        fullWidth
                        value={signupForm.values.confirmPassword}
                        onChange={signupForm.handleChange}
                        color='success'
                        error={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword !== undefined}
                        helperText={signupForm.touched.pasconfirmPasswordsword && signupForm.errors.confirmPassword}

                />
            </Stack>

            <LoadingButton
                type='submit'
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginTop: 4 }}
                loading={isLoginRequest}
            >
                Sign up
            </LoadingButton>

            <Button
                fullWidth
                sx={{ marginTop: 1 }}
                onClick={() => switchAuthState()}

            >
                Sign in
            </Button>

            {errorMesage && (
                <Box sx={{ marginTop: 2 }}>
                    <Alert severity='error' variant='outlined' >
                        {errorMesage}
                    </Alert>
                </Box>
            )}

        </Box>
  )
}

export default SignupForm
