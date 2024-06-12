export default function Page({ params }: { params: { category: string } }) {
  const { category } = params;
  return <div>{category} 리스트 페이지</div>;
}
