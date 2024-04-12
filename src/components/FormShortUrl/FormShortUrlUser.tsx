'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
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

const formSchema = z
  .object({
    url: z
      .string()
      .min(7, { message: 'Url must contain at least 7 characters' })
      .max(100),
    customLink: z.string().optional(),
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

export default function FormShortUrlUser() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      customLink: '',
    },
  });

  // const shortUrl = async (
  //   url: string,
  //   customLink: string | undefined | null
  // ) => {
  //   if (customLink === '') {
  //     customLink = null;
  //   }
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_SHORT_URL}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //         body: JSON.stringify({ url, customLink }),
  //       }
  //     );
  //     const data = await res.json();

  //     // setResponse(data);

  //     if (!user.ok && user.status === 401 && user.message === 'Token expired') {
  //       localStorage.removeItem('token');
  //       router.push('/');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // await shortUrl(values.url, values.customLink);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-10">
      <Card className="w-[550px]">
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
              <FormField
                control={form.control}
                name="customLink"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <Label htmlFor="customLink">
                          Custom link (optional)
                        </Label>
                        <Input
                          id="customLink"
                          placeholder="https://short-url.com/custom-name"
                          {...field}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex flex-col items-center gap-2 p-0">
                <Button
                  className="w-full"
                  type="submit"
                >
                  Short Url
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
