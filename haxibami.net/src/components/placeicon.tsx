import * as React from "react"
import styles from '../styles/PlaceIcon.module.scss'
import { Twitter, Instagram, Github, Bookmark, Book, Blog, Write, Poem, Spotify } from 'modules/svg'

const PlaceIcon: React.FC = () => {

  const media = [
    {
      name: 'Twitter', link: 'https://twitter.com/haxibami',
      svg: <Twitter className={styles.Twitter} alt="twitter" layout="fill" />
    },
    {
      name: 'Instagram', link: 'https://instagram.com/haxibami',
      svg: <Instagram className={styles.Instagram} alt="instagram" layout="fill" />
    },
    {
      name: 'Github', link: 'https://github.com/haxibami',
      svg: <Github className={styles.Github} alt="github" layout="fill" />
    },
    {
      name: 'Bookmark', link: 'https://bookmeter.com/haxibami',
      svg: <Bookmark className={styles.Bookmark} alt="bookmark" layout="fill" />
    },
    {
      name: 'Book', link: 'https://haxibami.net/works',
      svg: <Book className={styles.Book} alt="book" layout="fill" />
    },
    {
      name: 'Blog', link: 'https://haxibami.hatenablog.jp',
      svg: <Blog className={styles.Blog1} alt="blog" layout="fill" />
    },
    {
      name: 'Write', link: 'https://haxibami.net/works',
      svg: <Write className={styles.Write} alt="kakuyomu" layout="fill" />
    },
    {
      name: 'Poem', link: 'https://utakatanka.jp/kajin/1102',
      svg: <Poem className={styles.Poem} alt="utakatanka" layout="fill" />
    },
    {
      name: 'Spotify', link: 'https://open.spotify.com/user/a0ndq420ky5fxfey4rpqx952w',
      svg: <Spotify className={styles.Spotify} alt="spotify" layout="fill" />
    }
  ];

  const Icons = (Link:string, BoxName:string, WrapperName:string, Svg: JSX.Element) => {
    return (
      <a href={Link}>
        <div className={BoxName}>
          <div className={WrapperName}>
            <Svg />
          </div>
        </div>
      </a>
    )
  }

  for (let i = 0; i < media.length; i++) {
    let Name = media[i].name;
    let Link = media[i].link;
    let BoxName = Name + '_box'
    let WrapperName = Name + '_wrapper'
    let Svg = media[i].svg
  }

  return (
    <div></div>
  );
}

export default PlaceIcon
