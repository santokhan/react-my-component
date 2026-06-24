# Pagination Component

A reusable client-side pagination component for Next.js App Router applications.

## Features

* Previous and next navigation buttons
* Direct page navigation via input
* Preserves existing query parameters
* Customizable page query parameter name
* Automatically prevents navigation outside valid page ranges
* Fully styled with Tailwind CSS

## Props

| Prop          | Type     | Required | Default  | Description                         |
| ------------- | -------- | -------- | -------- | ----------------------------------- |
| `currentPage` | `number` | Yes      | -        | Current active page                 |
| `totalPages`  | `number` | Yes      | -        | Total number of pages               |
| `paramName`   | `string` | No       | `"page"` | Query parameter used for pagination |
| `className`   | `string` | No       | -        | Additional CSS classes              |

## Example

```tsx
"use client";

import { startTransition, useRef, type FormEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paramName?: string;
  className?: string;
};

type SearchParamsLike = ReturnType<typeof useSearchParams>;

function buildPageUrl(
  pathname: string,
  searchParams: SearchParamsLike,
  paramName: string,
  page: number
) {
  const nextParams = new URLSearchParams(
    Array.from(searchParams.entries())
  );

  nextParams.set(paramName, String(page));

  return `${pathname}?${nextParams.toString()}`;
}

export default function Pagination({
  currentPage,
  totalPages,
  paramName = "page",
  className,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageInputRef = useRef<HTMLInputElement | null>(null);

  function goToPage(page: number) {
    const nextPage = Math.min(
      Math.max(page, 1),
      totalPages
    );

    const url = buildPageUrl(
      pathname,
      searchParams,
      paramName,
      nextPage
    );

    startTransition(() => {
      router.push(url);
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextPage = Number(
      pageInputRef.current?.value ?? currentPage
    );

    if (Number.isNaN(nextPage)) {
      return;
    }

    goToPage(nextPage);
  }

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={isFirstPage}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="size-4" />
        Prev
      </button>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3"
      >
        <label
          htmlFor="pagination-page"
          className="text-sm font-semibold text-slate-700"
        >
          Page
        </label>

        <input
          key={currentPage}
          id="pagination-page"
          ref={pageInputRef}
          type="number"
          min={1}
          max={totalPages}
          defaultValue={currentPage}
          aria-label="Page number"
          className="w-20 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-center text-sm font-semibold text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
        />

        <button
          type="submit"
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/15 transition hover:from-blue-700 hover:to-cyan-600"
        >
          Go
        </button>
      </form>

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={isLastPage}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
```

## Usage

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
/>
```

### Custom Query Parameter

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  paramName="p"
/>
```

This produces URLs such as:

```text
/products?p=1
/products?p=2
/products?p=3
```

### Preserving Existing Search Parameters

Given the URL:

```text
/products?category=phone&page=1
```

Navigating to page 2 results in:

```text
/products?category=phone&page=2
```

The component automatically preserves all existing search parameters while updating only the page parameter.
