export const handleStatus = (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

export const handleErrors = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
    return;
  }
  console.error(error as string);
};
