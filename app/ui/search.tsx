"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event?.target;
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) {
      params.set("query", value);
      console.log(value);
    } else {
      params.delete("query");
    }
    console.log("Searching...", value);
    replace(`${pathName}?${params.toString()}`);
  };

  const debounce = (func: any, delay: number) => {
    let timer: NodeJS.Timeout;
    return (params: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(params), delay);
    };
  };

  const search = debounce(handleSearch, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={search}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
