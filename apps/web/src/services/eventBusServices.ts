const eventBus = {
  on<T>(event: string, callback: (data?: T) => unknown) {
    document.addEventListener(event, (e: CustomEventInit<T>) => callback(e.detail));
  },
  dispatch<T>(event: string, data: T) {
    document.dispatchEvent(new CustomEvent<T>(event, { detail: data }));
  },
  remove<T>(event: string, callback: (data?: T) => unknown) {
    document.removeEventListener(event, (e: CustomEventInit<T>) => callback(e.detail));
  },
};

export default eventBus;
