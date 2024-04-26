'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
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
import { Loader2 } from 'lucide-react';

const formSchema = z
  .object({
    url: z
      .string()
      .min(7, { message: 'Url must contain at least 7 characters' })
      .max(100),
  })
  .refine(
    data => {
      return data.url.startsWith('http://') || data.url.startsWith('https://');
    },
    {
      message: 'Url must start with http:// or https://',
      path: ['url'],
    }
  );

export default function FormShortUrlHome() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  const tokenValidation = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TOKEN_VALIDATION}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (data.ok && data.status === 200 && data.message === 'Token is valid') {
        router.push('/short-url');
        setIsLoading(false);
      } else {
        router.push('/sign-up');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    tokenValidation();
  };
  return (
    <div className="mt-10 flex justify-center">
      <Card className="max-w-[550px] w-full">
        <CardHeader>
          <CardTitle>Shorten your URL</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <Label htmlFor="url">Paste your long url here</Label>
                        <Input
                          id="url"
                          placeholder="https://long-url.com"
                          {...field}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex flex-col items-center gap-2 p-0">
                {!isLoading ? (
                  <Button
                    className="w-full"
                    type="submit"
                  >
                    Short Url
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
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
