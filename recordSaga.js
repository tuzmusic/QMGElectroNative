import { runSaga } from "redux-saga";

export default async function recordSaga(saga, initialAction) {
  const dispatched = [];
  console.log("hello from record saga");

  await runSaga(
    {
      dispatch: action => {
        dispatched.push(action);
        console.log(dispatched);
      }
    },
    saga,
    initialAction
  ).done;

  console.log("dispatched:", dispatched);

  return dispatched;
}
