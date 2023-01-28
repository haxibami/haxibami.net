import Link from "next/link";

import type { PostType } from "lib/interface";

interface TagListProps {
  tags: string[] | undefined;
  postType: PostType;
}

const TagList: React.FC<TagListProps> = (props) => {
  const { tags, postType } = props;
  return (
    <span className="flex flex-wrap gap-3 text-base">
      {tags
        ? tags.map((tag) => (
            <span className="px" key={tag}>
              <Link
                href={`/${postType}/tag/${tag}`}
                className="text-[color:var(--link)] decoration-2 underline-offset-2 hover:underline"
              >
                #{tag}
              </Link>
            </span>
          ))
        : null}
    </span>
  );
};

export default TagList;
