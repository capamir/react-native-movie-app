import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants/icons";

interface Genre {
  id: number;
  name: string;
}

interface Actor {
  id: number;
  name: string;
}

interface MovieCardProps {
  id: number;
  title: string;
  plot_summary: string;
  image?: string | null;
  rating: number;
  genres: Genre[];
  actors: Actor[];
  created_at: string;
}

const MovieCard = ({
  id,
  image,
  title,
  rating,
  created_at,
}: MovieCardProps) => {
  // Construct full image URL or fallback placeholder
  const imageUrl = image
    ? image // Adjust base URL if needed
    : "https://placehold.co/600x400/1a1a1a/FFFFFF.png";

  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {rating.toFixed(1)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {new Date(created_at).getFullYear()}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
