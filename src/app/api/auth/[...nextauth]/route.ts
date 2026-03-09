import { handlers } from "@/auth";

export const { GET, POST } = handlers;

// Ensure this route is never statically optimized
export const dynamic = "force-dynamic";
