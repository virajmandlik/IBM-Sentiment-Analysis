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

const formSchema = z.object({
  username: z
    .string()
    .min(6, { message: 'Your username must contain at least 6 characters.' })
    .max(30)
    .nonempty({ message: 'This field is required.' }),
  email: z
    .string()
    .email({ message: 'Please provide a valid email address.' })
    .nonempty({ message: 'This field is required.' }),
  password: z
    .string()
    .min(8, { message: 'Your password must contain at least 8 characters.' })
    .nonempty({ message: 'This field is required.' }),
  confirmPassword: z.string().nonempty({ message: 'This field is required.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof formSchema>;

export function SignUpForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function handleSignUp(data: FormValues) {
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

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const response = await res.json();

      if (response.jwt) {
        toast.success('Success', {
          description: 'Registration successfully complete!',
        });
        localStorage.setItem('sharelink.shop-jwt', response.jwt);
        localStorage.setItem('sharelink.shop-userId', response.user.id);
        // Replace this with router or navigation logic
        console.log('Redirect to dashboard');
      } else if (response.error) {
        if (response.error.message === 'Email already taken') {
          alert('E-mail already exists.');
        } else if (response.error.message === 'This attribute must be unique') {
          alert('Username already registered.');
        } else {
          alert('Error: An error occurred while registering, please try again.');
        }
      }
    } catch (error) {
      console.error('Sign-Up Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignUp)} className="grid gap-6">
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Choose a username"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="name@example.com"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter a strong password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Re-enter your password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading && (
            <div className="w-4 h-4 mr-2 rounded-full border-2 border-x-white animate-spin"></div>
          )}
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
