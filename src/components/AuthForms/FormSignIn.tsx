'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { authStatesStore } from '@/store/authStatesStore';
import { userUrlsStatesStore } from '@/store/userUrlsStatesStore';
import { loadingStatesStore } from '@/store/loadingStatesStore';
import { auth } from '@/api/auth';
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

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must contain at least 6 characters' }),
});

export default function FormSignIn() {
  const router = useRouter();
  const isLoading = loadingStatesStore.useIsLoading(state => state.isLoading);
  const setIsLoading = loadingStatesStore.useIsLoading(
    state => state.setIsLoading
  );
  const setIsAuth = authStatesStore.useAuthStore(state => state.setIsAuth);
  const setUser = userUrlsStatesStore.useUserUrlsStateStore(
    state => state.setUser
  );
  const setToken = authStatesStore.useAuthStore(state => state.setToken);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const resUser = await auth.logUser(values.email, values.password);
      if (
        !resUser.ok &&
        resUser.status === 400 &&
        resUser.message === 'Invalid email'
      ) {
        setIsLoading(false);
        form.setError('email', {
          type: 'custom',
          message: resUser.message,
        });
      }
      if (
        !resUser.ok &&
        resUser.status === 404 &&
        resUser.message === 'User not found'
      ) {
        setIsLoading(false);
        form.setError('email', {
          type: 'custom',
          message: resUser.message,
        });
      }
      if (!resUser.ok && resUser.message === 'Incorrect password') {
        setIsLoading(false);
        form.setError('password', {
          type: 'custom',
          message: resUser.message,
        });
      }
      if (resUser.user) {
        setUser(resUser.user);
      }
      if (resUser.user && resUser.user.token) {
        setToken(resUser.user.token);
        setIsAuth(true);
      }
      if (
        resUser.ok &&
        resUser.status === 200 &&
        resUser.message === 'User found'
      ) {
        router.push('/short-url');
      }
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
