export const addFeature = payload => {
  return { type: 'ADD_FEATURE', payload: payload };
};

export const removeFeature = payload => {
  return { type: 'REMOVE_FEATURE', payload: payload };
};
