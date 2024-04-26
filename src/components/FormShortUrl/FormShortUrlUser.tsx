'use client';
import { IoIosRemove } from 'react-icons/io';
import { LuMaximize } from 'react-icons/lu';
import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import FormShortUrlUserCardContent from './FormShortUrlUserCardContent';

export default function FormShortUrlUser() {
  const [isMinimize, setIsMinimize] = useState<boolean>(false);

  return (
    <Card className="max-w-[550px] mt-10 w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>URL shorterer</CardTitle>
          <div className="flex gap-2">
            {!isMinimize ? (
              <div
                className="cursor-pointer hover:opacity-75 text-xl"
                onClick={() => setIsMinimize(true)}
              >
                <IoIosRemove />
              </div>
            ) : (
              <div
                className="cursor-pointer hover:opacity-75 text-xl"
                onClick={() => setIsMinimize(false)}
              >
                <LuMaximize />
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      {!isMinimize ? <FormShortUrlUserCardContent /> : ''}
    </Card>
  );
}
