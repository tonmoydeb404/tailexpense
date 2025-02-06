import useSWRMutation, { SWRMutationHook } from "swr/mutation";

const useSWRMutationWithDefault: SWRMutationHook = (key, fetcher, options) => {
  const response = useSWRMutation(key, fetcher, options);

  if (typeof response.trigger === "function") {
    // @ts-expect-error - unresolved
    const trigger: typeof response.trigger = (body, triggerOptions) => {
      // @ts-expect-error - unresolved
      return response.trigger(body, {
        ...triggerOptions,
        // @ts-expect-error - unresolved
        onSuccess: (...args) => {
          // @ts-expect-error - unresolved
          options?.onSuccess?.(...args);
          triggerOptions?.onSuccess?.(...args);
        },
      });
    };

    return { ...response, trigger };
  }

  return response;
};

export default useSWRMutationWithDefault;
