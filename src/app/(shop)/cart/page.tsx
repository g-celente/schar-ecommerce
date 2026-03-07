import { Container } from "@/components/ui/Container";

export default function CartPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {/* CartDrawer / CartSummary will live in features/cart/components */}
    </Container>
  );
}
