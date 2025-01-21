'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom'; // Use useNavigate from react-router-dom
import classNames from 'classnames';

const formSchema = z.object({
  username: z.string({
    invalid_type_error: 'Your username must contain at least 6 characters.',
    required_error: 'You must fill in this field.',
  }).min(6).max(30),
  email: z.string({
    required_error: 'You must fill in your email address to complete registration.',
  }).email({
    message: 'Please provide a valid email address.',
  }),
  password: z.string({
    invalid_type_error: 'Your password must contain at least 8 characters.',
    required_error: 'You must fill in this field.',
  }).min(8),
  confirmPassword: z.string({
    required_error: 'You must fill in this field.',
  }),
}).refine(
  (values) => values.password === values.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

type FormValues = z.infer<typeof formSchema>;

interface SignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const SignUp: React.FC<SignupFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function handleLogin(data: FormValues) {
    setIsLoading(true);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`;
    const body = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmed: true,
      role: {
        id: 1,
      },
    };

    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => {
        const response = await res.json();

        if (response.jwt) {
          toast.success('Success', {
            description: 'Registration successfully complete!',
          });
          localStorage.setItem('sharelink.shop-jwt', response.jwt);
          localStorage.setItem('sharelink.shop-userId', response.user.id);
          navigate('/dashboard'); // Use navigate instead of router.push
        }

        if (response.error) {
          if (response.error.message === 'Email already taken') {
            alert('E-mail already exists.');
          } else if (response.error.message === 'This attribute must be unique') {
            alert('Username already registered.');
          } else {
            alert('Error: An error occurred while registering, please try again.');
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className={classNames('grid gap-6', className)} {...props}>
      <div className="flex flex-col space-y-2 text-center pt-3">
        <h1 className ="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm text-muted-foreground">
          Register with your email and password
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              {/* USERNAME FIELD */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full pb-4">
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        id="username"
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        placeholder="Choose a username"
                        className="w-full text-zinc-700"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* EMAIL ADDRESS FIELD */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full pb-4">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        id="email"
                        type="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        placeholder="name@example.com"
                        className="w-full text-zinc-700"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD FIELD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full pb-4">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        id="password"
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        placeholder="Must be at least 8 characters long"
                        className="w-full text-zinc-700"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CONFIRM PASSWORD FIELD */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full pb-4">
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        id="confirmPassword"
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        placeholder="Enter the same password again"
                        className="w-full text-zinc-700"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <div className="w-4 h-4 rounded-full border-2 border-x-white animate-spin mr-2" />
              )}
              Sign Up with Email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;