
```jsx
'use client'

import Drawer from 'rc-drawer'
import { Suspense, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import NavList from './NavList'
import { CloseCircle } from 'iconsax-react'

const MobileNavs = ({ transparent = false }) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <button type='button' onClick={toggleOpen} className={twMerge('', transparent ? 'text-gray-300 hover:text-gray-50' : 'text-secondary-900')}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='h-8 w-8'>
          <path
            fillRule='evenodd'
            d='M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      {open && (
        <Drawer open={open} onClose={toggleOpen} className='w-[72vw] h-full z-[5] fixed right-0 top-0 bg-white p-6'>
          <button type='button' onClick={toggleOpen} className='absolute top-4 right-4'>
            <CloseCircle color='black' aria-hidden='true' className='h-7 w-7' />
          </button>
          <Suspense>
            <NavList transparent={transparent} className={'flex-col items-start !text-2xl gap-3'} />
          </Suspense>
        </Drawer>
      )}
    </>
  )
}

export default MobileNavs
```


```jsx
import { twMerge } from "tailwind-merge";
import { NavLabel } from "./NavItem";

export function NavDropdownButton({ label, children, transparent = false }) {
    return (
        <li>
            <button type="button" className={twMerge(
                "py-2.5 px-4 lg:px-5 rounded-full",
                "text-base font-semibold whitespace-nowrap text-[14px]",
                'flex items-center gap-2',
                transparent ?
                    'text-gray-200 hover:bg-white/5'
                    :
                    'text-secondary-900'
            )}>
                <NavLabel label={label} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="h-3 w-3">
                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                </svg>
            </button>
            {children}
        </li>
    );
}


export const Dropdown = ({ children, transparent = false }) => {
    return (
        <>
            <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {children}
            </ul>
        </>
    );
}
```


```jsx
import Logo, { LogoWhite } from '@/components/Logo'
import NavList from './NavList'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import MobileNavs from './MobileNavs'
import { Suspense } from 'react'

const NavBar = ({ className = 'sticky', transparent = false }) => {
  return (
    <>
      <nav className={twMerge('top-0 z-[2] flex h-16 w-full items-center bg-stone-900/50', className)}>
        <div className='mx-auto flex w-full max-w-screen-xl flex-1 items-center justify-between px-4 h-full'>
          <div className='md:w-2/12 flex-shrink-0 flex'>
            <Link href='/' className='router-link-active router-link-exact-active'>
              {transparent ? <LogoWhite /> : <Logo />}
            </Link>
          </div>
          <div className='hidden flex-grow lg:block'>
            <Suspense>
              <NavList transparent={transparent} />
            </Suspense>
          </div>
          <div className='hidden md:w-2/12 flex-shrink-0 lg:flex justify-end'></div>
          <div className='flex items-center justify-center lg:hidden'>
            <MobileNavs />
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar
```