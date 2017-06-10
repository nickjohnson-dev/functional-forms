export const hideIf = condition => showIf(!condition);

export function makeCancelable(promise) {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(val =>
      (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
    );
    promise.catch(error =>
      (hasCanceled ? reject({ isCanceled: true }) : reject(error)),
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
}

export function showIf(condition) {
  return result => (condition ? result() : null);
}
