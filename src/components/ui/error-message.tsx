type ErrorMessageProps = {
  message?: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return <p className='text-xs text-red-500 mt-1'>{message}</p>;
};
