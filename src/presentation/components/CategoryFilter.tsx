import { Album } from '@/domain/entities/Album';

interface CategoryFilterProps {
  albums: Album[];
  onFilterChange: (category: string | null) => void;
  selectedCategory: string | null;
}

const ALL_CATEGORIES = 'All categories';

export const CategoryFilter = ({ albums, onFilterChange, selectedCategory }: CategoryFilterProps) => {
  const categories = [ALL_CATEGORIES, ...new Set(albums.map(album => album.category))].sort();

  return (
    <select
      value={selectedCategory || ALL_CATEGORIES}
      onChange={(e) => onFilterChange(e.target.value === ALL_CATEGORIES ? null : e.target.value)}
      className="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 
                hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}; 