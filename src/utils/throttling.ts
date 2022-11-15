export default function throttling(ms = 150) : Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
