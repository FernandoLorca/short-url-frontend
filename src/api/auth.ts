import { IApiResponses } from '@/types';

const validateToken = async (token: string | null): Promise<boolean> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TOKEN_VALIDATION}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();

  if (!data.ok && data.status !== 200 && data.message !== 'Token is valid') {
    return false;
  }

  return true;
};

const registerUser = async (
  username: string,
  email: string,
  password: string,
  repeatPassword: string
): Promise<IApiResponses> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_SIGN_UP}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          repeatPassword,
        }),
      }
    );
    const user = await res.json();

    return user;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      status: 500,
      message: 'An error ocurred during user registration',
    };
  }
};

const logUser = async (
  email: string,
  password: string
): Promise<IApiResponses> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_SIGN_IN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const user = await res.json();

    return user;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      status: 500,
      message: 'An error ocurred during user registration',
    };
  }
};

export const auth = {
  validateToken,
  registerUser,
  logUser,
};
