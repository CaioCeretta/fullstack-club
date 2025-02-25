import type { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

interface ConsumptionMethodOptionProps {
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
  slug: string;
}

const ConsumptionMethodOption = ({
  imageUrl,
  imageAlt,
  buttonText,
  option,
  slug,
}: ConsumptionMethodOptionProps) => {
  return (
    <CardContent className="flex flex-col items-center gap-8 py-8">
      <div className="w-20px relative aspect-square">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={78}
          height={78}
          className="object-contain"
        />
      </div>
      <Button variant={"secondary"} className="rounded-full" asChild>
        <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
          {buttonText}
        </Link>
      </Button>
    </CardContent>
  );
};

export default ConsumptionMethodOption;
