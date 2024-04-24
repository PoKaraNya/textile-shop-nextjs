import { getCategoryById } from '@/lib/api/categories/queries';

interface Props {
  params: {
    id: string
  }
}

async function CategoryIdPage({ params }: Props) {
  const { category } = await getCategoryById(params.id);
  return (
    <div>
      {params.id}
      {/* <Suspense fallback={<Loading />}> */}
      {JSON.stringify(category)}
      {/* </Suspense> */}
    </div>
  );
}

export default CategoryIdPage;
