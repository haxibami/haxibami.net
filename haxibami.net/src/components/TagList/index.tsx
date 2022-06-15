import Link from "next/link";
import type { PostType } from "lib/interface";
import Styles from "./style.module.scss";

interface TagListProps {
  tags: string[];
  postType: PostType;
}

const TagList: React.FC<TagListProps> = (props) => {
  const { tags, postType } = props;
  return (
    <span className={Styles.TileTags}>
      {tags.map((tag) => (
        <span className={Styles.TileTag} key={tag}>
          <Link href={`/${postType}/tag/${tag}`}>
            <a>#{tag}</a>
          </Link>
        </span>
      ))}
    </span>
  );
};

export default TagList;
