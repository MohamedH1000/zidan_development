import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const logoUrl = "https://zidandevelopments.com/wp-content/uploads/2025/07/Zidan_White-e1770805439461.png";

/**
 * Brand logo used across the header and footer.
 * The image is tinted for dark surfaces so it remains visible on light
 * backgrounds while keeping the same visual language as the rest of the site.
 */
export function Logo({
  tone = "light",
  className,
  href = "/",
}: {
  tone?: "light" | "dark";
  className?: string;
  href?: string | null;
}) {
  const content = (
    <span className={cn("group inline-flex items-center", className)}>
      <Image
        src={logoUrl}
        alt="Zidan Development"
        width={740}
        height={250}
        sizes="180px"
        className={cn("h-9 w-auto max-w-[180px] object-contain", tone === "dark" ? "brightness-0" : "brightness-100")}
      />
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} aria-label="Zidan Development — home" className="inline-flex">
      {content}
    </Link>
  );
}
