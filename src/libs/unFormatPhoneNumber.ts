export default function unformatPhoneNumber(value: string): string {
  return `010${value.replace(/-/g, '')}`;
}
