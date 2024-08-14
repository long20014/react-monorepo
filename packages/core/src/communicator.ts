export const useCommunicator = () => {
  const { port1, port2 } = new MessageChannel();
  return {
    port1,
    port2
  }
}