import Image from "next/image";

import { Card } from "@/components/ui/card";
import { getRestaurantBySlug } from "@/data/queries/get-restaurant-by-slug";

import ConsumptionMethodOption from "./_components/consumptionMethodOption";

interface RestaurantPageProps {
  params: { slug: string };
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    throw new Error("Restaurant not Found");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* Logo and Title */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      {/* Welcome */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Welcome!</h3>
        <p className="opacity-85">
          Choose how you prefer to enjoy your meal. We're here to offer
          convenience and flavor in every detail.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-14">
        <Card>
          <ConsumptionMethodOption
            imageUrl="/dine_in.png"
            imageAlt="Dine In"
            buttonText="Dine In"
            option="DINE_IN"
            slug={slug}
          />
        </Card>
        <Card>
          <ConsumptionMethodOption
            imageUrl="/takeaway.png"
            imageAlt="Take Away"
            buttonText="Take Away"
            option="TAKEAWAY"
            slug={slug}
          />
        </Card>
      </div>
    </div>
  );
};

export default RestaurantPage;
