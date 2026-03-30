import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IdentificationType, UserRoles } from '@/types/enums';
import { Form, FormControl, Input, Button } from '@components/ui';
import { CreateMemberSchema, type CreateMemberFormValues } from '../schemas';
import { useCreateMember } from '../hooks';

type CreateMemberFormProps = {
  onSuccess: () => void;
};

export const CreateMemberForm = ({ onSuccess }: CreateMemberFormProps) => {
  const { createMember, isLoading, error } = useCreateMember();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMemberFormValues>({
    resolver: zodResolver(CreateMemberSchema),
    defaultValues: {
      role: UserRoles.MEMBER,
    },
  });

  const onSubmit = async (values: CreateMemberFormValues) => {
    const result = await createMember(values);
    if (result) onSuccess();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-2 gap-4'>
        <FormControl
          label='First Name'
          htmlFor='firstName'
          required
          error={errors.firstName?.message}
        >
          <Input
            id='firstName'
            placeholder='John'
            hasError={!!errors.firstName}
            {...register('firstName')}
          />
        </FormControl>

        <FormControl label='Last Name' htmlFor='lastName' required error={errors.lastName?.message}>
          <Input
            id='lastName'
            placeholder='Doe'
            hasError={!!errors.lastName}
            {...register('lastName')}
          />
        </FormControl>
      </div>

      <FormControl label='Email' htmlFor='email' required error={errors.email?.message}>
        <Input
          id='email'
          type='email'
          placeholder='john@example.com'
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

      <div className='grid grid-cols-2 gap-4'>
        <FormControl
          label='ID Type'
          htmlFor='identificationType'
          required
          error={errors.identificationType?.message}
        >
          <select
            id='identificationType'
            className={`
              w-full px-3 py-2 text-sm rounded-md border bg-background text-foreground
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              transition-colors duration-150
              ${errors.identificationType ? 'border-red-500' : 'border-border'}
            `}
            {...register('identificationType')}
          >
            <option value=''>Select...</option>
            {Object.entries(IdentificationType).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        </FormControl>

        <FormControl
          label='ID Number'
          htmlFor='identificationNumber'
          required
          error={errors.identificationNumber?.message}
        >
          <Input
            id='identificationNumber'
            placeholder='1000000000'
            hasError={!!errors.identificationNumber}
            {...register('identificationNumber')}
          />
        </FormControl>
      </div>

      <input type='hidden' {...register('role')} />

      {error && <p className='text-xs text-red-500'>{error}</p>}

      <Button type='submit' isLoading={isLoading} className='w-full'>
        Create Member
      </Button>
    </Form>
  );
};
