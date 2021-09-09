import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/NotFound.module.scss'

const NotFound: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>狂乱詞好: lyriqult</title>
        <meta name="description" content="404 not found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>404 not found. Go back to <Link href="/"><a>Home</a></Link></div>
      </main>
    </div>
  )
}

export default NotFound
