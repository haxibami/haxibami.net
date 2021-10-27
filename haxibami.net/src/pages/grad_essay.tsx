import React from 'react'
import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/Grad_essay.module.scss'

import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'

import MdToHtml from '../modules/parser'
import essay_starlight from '../articles/grad_essay.md'

export async function getStaticProps() {
  const contentHTML = await MdToHtml(essay_starlight)

  return {
    props: {
      contentHTML,
    }
  };
};

const processor = unified()
  .use(rehypeParse, {fragment: true})
  .use(rehypeReact, {
    createElement: React.createElement,
  });

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Grad_essay: NextPage<PageProps> = ({contentHTML}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>狂乱詞好: lyriqult</title>
        <meta name="description" content="Graduation essay" lang="ja" />
        <meta name="twitter:site" content="@haxibami" />
        <meta name="twitter:creator" content="@haxibami" />
        <meta name="twitter:image" content="https://www.haxibami.net/ogpicon.webp" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:url" content="https://www.haxibami.net" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="haxibami.net" />
        <meta property="og:description" content="haxibami's graduation essay" />
        <meta property="og:site_name" content="haxibami.net" />
        <meta property="og:image" content="https://www.haxibami.net/ogpicon.webp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <div className={styles.reader}>{processor.processSync(contentHTML).result}</div>
      </main>
    </div>
  )
}

export default Grad_essay
