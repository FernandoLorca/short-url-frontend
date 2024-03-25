'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IApiResponse } from './types';

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at leat 3 characters' })
      .max(24, { message: 'Username must be at most 24 characters' }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: 'Password must contain at least 6 characters' }),
    repeatPassword: z
      .string()
      .min(6, { message: 'Password must contain at least 6 characters' }),
  })
  .refine(data => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export default function FormSignUp() {
  const [response, setResponse] = useState<IApiResponse>({
    ok: false,
    status: 0,
    message: '',
    user: null,
    data: null,
    loading: false,
  });
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/short-url');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: 'jue',
      email: 'jue1@gmail.com',
      password: 'password',
      repeatPassword: 'password',
    },
  });

  const registerUser = async (
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_SIGN_UP}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            repeatPassword,
          }),
        }
      );
      const user = await res.json();

      setResponse(user);
      if (user.ok) {
        localStorage.setItem('token', user.user?.token);
        router.push('/short-url');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!response.ok && response.message === 'Email already exists') {
      form.setError('email', {
        type: 'custom',
        message: response.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await registerUser(
        values.username,
        values.email,
        values.password,
        values.repeatPassword
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="Your username"
                        {...field}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        placeholder="●●●●●●●●●"
                        type="password"
                        {...field}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <Label htmlFor="repeatPassword">Repeat password</Label>
                      <Input
                        id="repeatPassword"
                        placeholder="●●●●●●●●●"
                        type="password"
                        {...field}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex flex-col items-center gap-2 text-sm p-0">
              <Button
                className="w-full text-base"
                type="submit"
              >
                Register
              </Button>
              <div className="flex flex-col items-center">
                <Link href="/signup">Sign in</Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
