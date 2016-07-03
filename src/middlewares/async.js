export default function({ dispatch }) {
  return next => action => {
    // if the action does not have a payload
    // or, the payload does not have a .then property, we don't care
    // send it on.
    if(!action.payload || !action.payload.then){
      return next(action);
    }
    action.payload
      .then(response => {
        // create a new action with the old type, but replace the promise
        // with data.
        const newAction = { ...action, payload: response };
        dispatch(newAction);
      });
  }
}
