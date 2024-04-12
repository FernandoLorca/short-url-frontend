'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadingStatesStore } from '@/store/loadingStatesStore';
import { authStatesStore } from '@/store/authStatesStore';
import { auth } from '@/api/auth';
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
  const isLoading = loadingStatesStore.useIsLoading(state => state.isLoading);
  const setIsLoading = loadingStatesStore.useIsLoading(
    state => state.setIsLoading
  );
  const setIsAuth = authStatesStore.useAuthStore(state => state.setIsAuth);
  const setUser = authStatesStore.useProfileStore(state => state.setUser);
  const setToken = authStatesStore.useAuthStore(state => state.setToken);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const resUser = await auth.registerUser(
        values.username,
        values.email,
        values.password,
        values.repeatPassword
      );

      if (
        !resUser.ok &&
        resUser.status === 409 &&
        resUser.message === 'Email already exists'
      ) {
        form.setError('email', {
          type: 'custom',
          message: resUser.message,
        });
        setIsLoading(false);
      }

      if (
        resUser.ok &&
        resUser.status === 201 &&
        resUser.message === 'User created'
      ) {
        router.push('/short-url');
      }

      setUser(resUser);

      if (resUser.user && resUser.user.token) {
        setToken(resUser.user.token);
        setIsAuth(true);
      }
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
              {!isLoading ? (
                <Button
                  className="w-full text-base"
                  type="submit"
                >
                  Sign up
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
                <Link href="/sign-in">Sign in</Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
