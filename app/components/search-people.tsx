import { useEffect, useState } from 'react';

import { Form, useSubmit } from '@remix-run/react';
import { useDebounceCallback } from 'usehooks-ts';

import { Input } from './ui/input';

export const SearchPeople = ({
  searchPrompt = 'Search by Person Name...',
  searchText,
}: {
  searchText?: string;
  searchPrompt?: string;
}) => {
  const submit = useSubmit();
  const debounceSubmit = useDebounceCallback(submit, 500);

  const [searchInput, setSearchInput] = useState<string | undefined>(
    searchText,
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    debounceSubmit(event.currentTarget.form, {
      preventScrollReset: true,
    });
  };

  // keep local state in sync if url vars change
  useEffect(() => {
    setSearchInput(searchText);
  }, [searchText]);

  return (
    <Form method="post" reloadDocument className="flex gap-4 rounded-xl p-2">
      <Input
        type="text"
        name="search"
        value={searchInput}
        placeholder={searchPrompt}
        className="w-full"
        size="lg"
        onChange={handleSearchChange}
      />
    </Form>
  );
};
