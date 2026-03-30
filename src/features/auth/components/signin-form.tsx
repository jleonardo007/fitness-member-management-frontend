import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { Form, FormControl, Input, Button } from '@components/ui';
import { SigninSchema, type SigninFormValues } from '../schemas';
import { useSignin } from '../hooks';
import { ROUTES } from '@router/routes';

export const SigninForm = () => {
  const navigate = useNavigate();
  const { handleSignin, isLoading, error } = useSignin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit = async (values: SigninFormValues) => {
    await handleSignin(values.email, values.password);
    navigate(ROUTES.MEMBERS);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl label='Email' htmlFor='email' required error={errors.email?.message}>
        <Input
          id='email'
          type='email'
          placeholder='admin@fitness.com'
          hasError={!!errors.email}
          {...register('email')}
        />
      </FormControl>

      <FormControl label='Password' htmlFor='password' required error={errors.password?.message}>
        <Input
          id='password'
          type='password'
          placeholder='••••••••'
          hasError={!!errors.password}
          {...register('password')}
        />
      </FormControl>

      {error && <p className='text-sm text-red-500 text-center'>{error}</p>}

      <Button type='submit' isLoading={isLoading} className='w-full mt-2' variant='primary'>
        Sign in
      </Button>
    </Form>
  );
};
