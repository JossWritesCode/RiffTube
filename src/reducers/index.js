export const initialState = {
  additionalPrice: 0,
  car: {
    price: 26395,
    name: '2019 Ford Mustang',
    image:
      'https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg',
    features: []
  },
  store: [
    { id: 1, name: 'V-6 engine', price: 1500 },
    { id: 2, name: 'Racing detail package', price: 1500 },
    { id: 3, name: 'Premium sound system', price: 500 },
    { id: 4, name: 'Rear spoiler', price: 250 }
  ]
};

export const featureReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FEATURE':
      const arrayOfCarFeatures = [...state.car.features];
      if (
        arrayOfCarFeatures.find(function(feature) {
          return feature.id === action.payload.id;
        }) === undefined
      ) {
        return {
          ...state,
          car: {
            ...state.car,
            price: state.car.price + action.payload.price,
            features: [...state.car.features, action.payload]
          }
        };
      } else {
        return state;
      }
    case 'REMOVE_FEATURE':
      const arrayOfCarFeaturesAfterRemove = [...state.car.features];
      arrayOfCarFeaturesAfterRemove.map(feature => {
        if (feature.id === action.payload.id) {
          arrayOfCarFeaturesAfterRemove.splice(
            arrayOfCarFeaturesAfterRemove.indexOf(feature),
            1
          );
        }
      });
      return {
        ...state,
        car: {
          ...state.car,
          price: state.car.price - action.payload.price,
          features: arrayOfCarFeaturesAfterRemove
        }
      };
    default:
      return state;
  }
};
