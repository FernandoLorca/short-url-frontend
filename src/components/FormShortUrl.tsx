'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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

export default function FormShortUrl() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="mt-10">
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
                <FormLabel>Short Url</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Paste your long url here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
          >
            Short URL
          </Button>
        </form>
      </Form>
    </div>
  );
}
