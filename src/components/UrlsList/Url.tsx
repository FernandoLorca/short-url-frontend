import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { authStatesStore } from '@/store/authStatesStore';
import { userUrlsStatesStore } from '@/store/userUrlsStatesStore';
import { isUpdatingStore } from '@/store/isUpdatingStore';
import { urls } from '@/api/urls';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { MdCheck } from 'react-icons/md';
import Link from 'next/link';
import UrlEdit from './UrlEdit';
import UrlRemove from './UrlRemove';
import { Url as UrlType } from '@/types';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  customLink: z
    .string()
    .min(5)
    .max(40, { message: 'Custom link must be between 5 and 40 characters' }),
});

export default function Url({ url, index }: { url: UrlType; index: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = authStatesStore.useAuthStore(state => state.token);
  const setToken = authStatesStore.useAuthStore(state => state.setToken);
  const isUpdating = isUpdatingStore.useIsUpdating(state => state.isUpdating);
  const setIsUpdating = isUpdatingStore.useIsUpdating(
    state => state.setIsUpdating
  );
  const urlId = isUpdatingStore.useIsUpdating(state => state.urlId);
  const setUrlId = isUpdatingStore.useIsUpdating(state => state.setUrlId);
  const userUrls = userUrlsStatesStore.useUserUrlsStateStore(
    state => state.urls
  );

  const customLinkReplace = (
    urlShort: string | null,
    customLink: string | null
  ): string => {
    const url = urlShort?.slice(0, -10);
    return `${url}${customLink}`;
  };

  const lastUrlForSeparator = (index: number): boolean | undefined => {
    const urlsLength = userUrls?.length;
    if (index + 1 === urlsLength) return true;
    return false;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customLink: url.customLink || '',
    },
  });

  const updateUrl = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await urls.updateUrl(token, url.id, values.customLink);
      console.log(data);

      if (
        !data?.ok &&
        data?.status === 400 &&
        data?.message === 'Custom link already have that value'
      ) {
        form.setError('customLink', {
          type: 'custom',
          message: 'Custom link already exists',
        });
        return;
      }

      data?.user && setToken(data.user.token);
      setIsUpdating(false);
      setUrlId(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col break-all">
        <div className="flex justify-between pb-2">
          <div className="flex gap-2 text-xl font-bold w-full pr-5">
            <p className="flex items-center text-lg">🔗 </p>
            {isUpdating && urlId === url.id ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(updateUrl)}
                  className="space-y-8 w-full"
                >
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="customLink"
                      render={({ field }) => (
                        <FormItem className="grow">
                          <FormControl>
                            <>
                              <Input
                                id="customLink"
                                placeholder="Custom link"
                                className="w-full"
                                {...field}
                              />
                            </>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {!isLoading ? (
                      <Button type="submit">
                        <MdCheck className="cursor-pointer hover:opacity-75" />
                      </Button>
                    ) : (
                      <Button type="submit">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            ) : (
              <h4>{url.customLink}</h4>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <UrlEdit url={url} />
            <UrlRemove url={url} />
          </div>
        </div>
        <div className="inline-block">
          <Link
            href={url.original}
            target="_blank"
            className="hover:underline font-bold text-sky-400"
          >
            {!url.customLink
              ? url.short
              : customLinkReplace(url.short, url.customLink)}
          </Link>
        </div>
        <div className="inline-block">
          <Link
            href={url.original}
            target="_blank"
            className="hover:underline text-sky-700"
          >
            {url.original}
          </Link>
        </div>
      </div>
      {lastUrlForSeparator(index) ? (
        ''
      ) : (
        <div className="py-5">
          <Separator />
        </div>
      )}
    </>
  );
}
