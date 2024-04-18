import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
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

export default function FormShortUrlUserCardContent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      customLink: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // await shortUrl(values.url, values.customLink);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
                    <Label htmlFor="customLink">Custom link (optional)</Label>
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
  );
}
