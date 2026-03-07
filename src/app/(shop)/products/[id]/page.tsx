import { Container } from "@/components/ui/Container";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  return (
    <Container className="py-10">
      <p className="text-sm text-muted-foreground">Product / {id}</p>
      {/* ProductDetail will live in features/product/components */}
    </Container>
  );
}
