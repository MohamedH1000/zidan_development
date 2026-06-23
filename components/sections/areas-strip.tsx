import { getLocale } from "next-intl/server";
import { getAreaTags } from "@/config/site";
import { Marquee } from "@/components/ui/marquee";

export async function AreasStrip() {
  const locale = (await getLocale()) as "en" | "ar";
  return (
    <div className="border-y border-white/10 bg-ink-950 py-5 text-cream">
      <Marquee items={getAreaTags(locale)} />
    </div>
  );
}
