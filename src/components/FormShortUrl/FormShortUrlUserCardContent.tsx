import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { urls } from '@/api/urls';
import { authStatesStore } from '@/store/authStatesStore';
import { userUrlsStatesStore } from '@/store/userUrlsStatesStore';
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
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type CustomLinkError = {
  error: string | null | undefined;
  inputValue: string | null | undefined;
};

const formSchema = z
  .object({
    url: z
      .string()
      .min(7, { message: 'Url must contain at least 7 characters' })
      .max(100),
    customLink: z
      .string()
      .refine(value => !value || value.length >= 5, {
        message: 'Custom link must have at least 5 characters',
        path: ['customLink'],
      })
      .refine(value => !value || value.length <= 40, {
        message: 'Custom link must have at most 40 characters',
        path: ['customLink'],
      })
      .optional(),
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
  const [customLinkError, setCustomLinkError] = useState<CustomLinkError>({
    error: null,
    inputValue: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = authStatesStore.useAuthStore(state => state.token);
  const setToken = authStatesStore.useAuthStore(state => state.setToken);
  const isAuth = authStatesStore.useAuthStore(state => state.isAuth);
  const setIsAuth = authStatesStore.useAuthStore(state => state.setIsAuth);
  const setUser = userUrlsStatesStore.useUserUrlsStateStore(
    state => state.setUser
  );
  const setUserUrl = userUrlsStatesStore.useUserUrlsStateStore(
    state => state.setUrl
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      customLink:
        customLinkError.error === null
          ? ''
          : customLinkError.inputValue || undefined,
    },
  });

  useEffect(() => {
    if (form.formState.errors.customLink) {
      setCustomLinkError({
        error: form.formState.errors.customLink.message,
        inputValue: form.getValues().customLink,
      });
    } else {
      setCustomLinkError({
        error: null,
        inputValue: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.errors.customLink, form.getValues().customLink]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { url, customLink } = values;
    setIsLoading(true);
    try {
      const data = await urls.shorUrl(token, url, customLink);

      if (data?.ok)
        setCustomLinkError({
          error: null,
          inputValue: '',
        });

      if (
        !data?.ok &&
        data?.status === 400 &&
        data?.message === 'Custom link already exists'
      ) {
        setCustomLinkError({
          error: data.message,
          inputValue: values.customLink,
        });
        return;
      }

      data?.user && setUser(data.user);
      data?.user && setToken(data.user.token);
      isAuth || setIsAuth(true);
      data?.urls && setUserUrl(data.urls);
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
                {customLinkError.error && (
                  <FormMessage>{customLinkError.error}</FormMessage>
                )}
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
  );
}
