import Link from "next/link";

import type { PostType } from "lib/interface";

interface TagsTopProps {
  taglists: string[];
  postType: PostType;
}

const TagsTop: React.FC<TagsTopProps> = (props) => {
  const { taglists, postType } = props;
  return (
    <div className="flex grow flex-col gap-8">
      <h1>Tags</h1>
      <ul>
        {taglists.map((tag) => (
          <li
            className="m-2 inline-block text-lg text-pink-400 decoration-2 hover:underline hover:underline-offset-2"
            key={tag}
          >
            <Link href={`/${postType}/tag/${tag}`}>#{tag}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsTop;
