export function formatPrice(price: number): string {
  return (
    String(price)
      .split('')
      .reverse()
      .join('')
      .match(/.{1,3}/g)
      .join(' ')
      .split('')
      .reverse()
      .join('') + '$'
  );
}
