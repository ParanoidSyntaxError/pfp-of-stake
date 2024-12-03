import { CollectionCard } from "@/components/collection-card";

export default function ExplorePage() {
	return (
		<div
			className="mt-32"
		>
			<CollectionCard
                name="Cigtubers"
                description="Cigtubers is a collection of 222 3D Cigawrettes, brought to life for your own enjoyment."
                progress={75}
            />
		</div>
	);
}
