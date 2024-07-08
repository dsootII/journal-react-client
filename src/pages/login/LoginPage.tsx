// import React from 'react'
import axios from "axios";
import { BACKEND_URL, ENDPOINTS } from "../../lib/config";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Text, TextField } from '@radix-ui/themes';
import { Label } from '@radix-ui/react-label';


interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values: LoginFormValues) => {
      const response  = await axios.post(
        BACKEND_URL+ENDPOINTS.login, 
        values, 
        {withCredentials: true}
      );
      console.log(response.data);
      if (response.data['access']) {
        // login(response.data['access'])
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', response.data['access']);
          localStorage.setItem('refreshToken', response.data['refresh']);
        }
        console.log('login happened')
        navigate('/user/journal');
      }
    },
    validationSchema: LoginSchema,
  });


  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-white to-stone-800">
      <div className="flex h-full w-full justify-center items-center align-middle">
        
        <Card className="w-[350px]">
            <div>
              <Text className='font-bold'>Login</Text>
              <Text className='font-medium'>Use this journal to track quests.</Text>
            </div>
            
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <TextField.Root 
                      id="username" 
                      placeholder="Username..." 
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    {formik.errors.username && formik.touched.username ? (
                      <div className="text-red-500 text-sm">{formik.errors.username}</div>
                    ) : null}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <TextField.Root 
                      id="password" 
                      placeholder="Password..." 
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    ) : null}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">Forgot Password</Button>
                <Button type="submit">Login</Button>
              </div>
            </form>
          </Card>
      </div>
    </div>
  )
}
