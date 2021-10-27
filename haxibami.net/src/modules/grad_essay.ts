import MdToHtml from './parser'
import essay_starlight from '../articles/grad_essay.md'

export async function getStaticProps() {
  const contentHTML = await MdToHtml(essay_starlight)

  return {
    contentHTML
  }
}
