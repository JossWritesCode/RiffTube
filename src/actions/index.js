<<<<<<< HEAD
export const addFeature = payload => {
  return { type: 'ADD_FEATURE', payload: payload };
};

export const removeFeature = payload => {
  return { type: 'REMOVE_FEATURE', payload: payload };
};
||||||| merged common ancestors
=======
export const GOOGLE_USER_SIGNIN = 'GOOGLE_USER_SIGNIN';

export const setGoogleUser = googleUser => ({
    type: GOOGLE_USER_SIGNIN,
    payload: googleUser
  })
>>>>>>> 80b9623a2288353b1539079aeed58f37513eb2b4
