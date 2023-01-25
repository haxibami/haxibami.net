import TagsDisplay from "components/TagsDisplay";
import { fetchTags } from "lib/api";

const postType = "grad_essay";

export default async function Tags() {
  const taglist = await fetchTags(`articles/${postType}`);
  return <TagsDisplay taglists={taglist} postType={postType} />;
}
