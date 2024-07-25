import { useEffect, useState } from 'react';

import { Form, useSubmit } from '@remix-run/react';
import { useDebounceCallback } from 'usehooks-ts';

import { Input } from './ui/input';
import { Select } from './ui/select';

interface Options {
  label: string;
  value: string;
}

export const SearchPlanetsAndSpecies = ({
  onDropdownChange,
  onSearchChange,
  options,
  searchDropdown,
  searchPrompt = 'Search...',
  searchText,
}: {
  searchText?: string;
  searchDropdown?: string;
  onDropdownChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
  searchPrompt?: string;
  options: Options[];
}) => {
  const submit = useSubmit();
  const debounceSubmit = useDebounceCallback(submit, 500);

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    searchDropdown,
  );
  const [searchInput, setSearchInput] = useState<string | undefined>(
    searchText,
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    onDropdownChange && onDropdownChange(event.target.value);
    debounceSubmit(event.currentTarget.form, {
      preventScrollReset: true,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    onSearchChange && onSearchChange(event.target.value);
    debounceSubmit(event.currentTarget.form, {
      preventScrollReset: true,
    });
  };

  // keep local state in sync if url vars change
  useEffect(() => {
    setSelectedOption(searchDropdown);
  }, [searchDropdown]);

  useEffect(() => {
    setSearchInput(searchText);
  }, [searchText]);

  return (
    <Form method="post" reloadDocument className="flex gap-4 rounded-xl p-2">
      <Select
        selectPlaceholder={searchPrompt}
        name="planet"
        size={'lg'}
        value={selectedOption}
        options={options}
        onChange={handleSelectChange}
        disabled={!options.length}
      />
      <Input
        type="text"
        name="search"
        value={searchInput}
        placeholder={'Filter by Name'}
        className="w-full"
        size="lg"
        disabled={!selectedOption}
        onChange={handleSearchChange}
      />
    </Form>
  );
};
