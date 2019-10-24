export const GOOGLE_USER_SIGNIN = 'GOOGLE_USER_SIGNIN';

export const setGoogleUser = googleUser => ({
    type: GOOGLE_USER_SIGNIN,
    payload: googleUser
  })