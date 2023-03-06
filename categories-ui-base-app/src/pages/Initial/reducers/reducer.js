const initialState = {
  availableItems: [],
  links: [
      'show',
      'create'
  ]
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    default: return state;
  }
}
