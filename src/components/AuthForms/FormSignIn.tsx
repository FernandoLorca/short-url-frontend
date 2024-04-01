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
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IApiResponse } from '../types';

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must contain at least 6 characters' }),
});

export default function FormSignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<IApiResponse>({
    ok: false,
    status: 0,
    message: '',
    user: null,
    data: null,
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
      email: '',
      password: '',
    },
  });

  // This function is used to get the user from the API
  const logUser = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_SIGN_IN}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const user = await res.json();

      if (user.ok) {
        localStorage.setItem('token', user.user?.token);
        setResponse(user);
        setIsLoading(false);
        router.push('/short-url');
      } else {
        setResponse(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // This useEffect is used to set the error message in the form
  useEffect(() => {
    if (
      !response.ok &&
      response.status === 400 &&
      response.message === 'Invalid email'
    ) {
      setIsLoading(false);
      form.setError('email', {
        type: 'custom',
        message: response.message,
      });
    }
    if (
      !response.ok &&
      response.status === 404 &&
      response.message === 'User not found'
    ) {
      setIsLoading(false);
      form.setError('email', {
        type: 'custom',
        message: response.message,
      });
    }
    if (!response.ok && response.message === 'Incorrect password') {
      setIsLoading(false);
      form.setError('password', {
        type: 'custom',
        message: response.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  // This function is used to submit the form
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await logUser(values.email, values.password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
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
            <CardFooter className="flex flex-col items-center gap-2 text-sm p-0">
              {!isLoading ? (
                <Button
                  className="w-full text-base"
                  type="submit"
                >
                  Sign in
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              )}
              <div className="flex flex-col items-center">
                <Link href="/sign-up">Sign up</Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
