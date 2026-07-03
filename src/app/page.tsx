import { getTheme } from "@/lib/theme";
import { ClassicHome } from "@/components/classic/classic-home";
import { ModernHome } from "@/components/modern/modern-home";

export default async function Home() {
  const theme = await getTheme();
  return theme === "modern" ? <ModernHome /> : <ClassicHome />;
}
