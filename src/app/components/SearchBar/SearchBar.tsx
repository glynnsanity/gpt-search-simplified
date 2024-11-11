import { KeyboardEvent, RefObject } from 'react';
import { Search, ArrowRight } from 'lucide-react';

interface SearchBarProps {
  inputRef: RefObject<HTMLInputElement>;
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({
  inputRef,
  query,
  onQueryChange,
  onSearch,
  onKeyDown
}: SearchBarProps) => {
  return (
    <div className="relative w-full mt-3.5"> {/* Reduced margin-top */}
      <Search className="absolute top-4 w-8 left-0.5 h-5 rounded-full opacity-50 sm:left-2.5 sm:top-4 sm:h-6" />
      <input 
        ref={inputRef}
        className="h-14 w-full rounded-full border border-zinc-400 pr-9 pl-12 focus:border-zinc-600 focus:outline-none sm:h-13 sm:py-1.5 sm:pr-13 sm:pl-13 sm:text-sm"
        type="text"
        placeholder="What are you looking for?"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button>
        <ArrowRight 
          onClick={onSearch}
          className="absolute right-1.5 top-4 h-5 w-5 rounded-full bg-blue-500 p-1 hover:cursor-pointer hover:bg-blue-600 sm:right-3 sm:top-3 sm:h-8 sm:w-8 text-white"
        />
      </button>
    </div>
  );
};
