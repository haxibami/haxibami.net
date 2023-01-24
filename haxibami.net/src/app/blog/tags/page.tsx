import Footer from "components/Footer";
import Header from "components/PostTopHeader";
import TagsTop from "components/TagsTop";
import { fetchTags } from "lib/api";
import { tagsMenuTabs } from "lib/constant";
import Styles from "styles/tags.module.scss";

import type { PostType } from "lib/interface";

const postType: PostType = "blog";

export default async function Tags() {
  const taglist = await fetchTags("articles/blog");
  return (
    <div>
      <div id={Styles.Wrapper}>
        <Header posttype={postType} />
        <TagsTop
          tagsMenuTabs={tagsMenuTabs}
          taglists={taglist}
          postType={postType}
        />
        <Footer />
      </div>
    </div>
  );
}
