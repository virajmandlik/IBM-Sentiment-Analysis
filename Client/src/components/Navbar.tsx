import { useState, useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import SentifyLogo from "../assets/Sentify-logo.png"; // Image import
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { buttonVariants } from './ui/button';
import { Menu } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { Link } from 'react-router-dom';

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: '#howItWorks',
    label: 'Working',
  },
  {
    href: '#features',
    label: 'Features',
  },
  {
    href: '#testimonials',
    label: 'Testimonials',
  },
  {
    href: '#contact',
    label: 'Contact Us',
  },
  {
    href: '#faq',
    label: 'FAQ',
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <button
              onClick={scrollToTop}
              className="ml-2 font-bold text-xl flex items-center"
            >
              <img src={SentifyLogo} alt="Sentify Logo" className="h-20 w-auto mr-2" />
             
            </button>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={'left'}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">Sentify</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    rel="noreferrer noopener"
                    href="https://github.com/virajmandlik/IBM-Sentiment-Analysis"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: 'secondary',
                    })}`}
                  >
                    <GitHubLogoIcon className="mr-2 w-5 h-5" />
                    Github
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: 'ghost',
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <Link
              to="/signup"
              className={`border ${buttonVariants({ variant: 'secondary' })}`}
            >
              <GitHubLogoIcon className="mr-2 w-5 h-5" />
              Sign Up
            </Link>
            <Link
              to="/signin"
              className={`border ${buttonVariants({ variant: 'secondary' })}`}
            >
              <GitHubLogoIcon className="mr-2 w-5 h-5" />
              Sign In
            </Link>
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

// ScrollToTop Component
import { Button } from './ui/button';
import { ArrowUpToLine } from 'lucide-react';

export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showTopBtn && (
        <Button
          onClick={goToTop}
          className="fixed bottom-4 right-4 opacity-90 shadow-md"
          size="icon"
        >
          <ArrowUpToLine className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};
