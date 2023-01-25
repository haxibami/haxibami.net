import Link from "next/link";

import { ChevronCircleLeftIcon, ChevronCircleRightIcon } from "components/Svg";

interface PagerProps {
  topPath: string;
  total: number;
  page: number;
  perPage: number;
  postType: string;
}

const Pager: React.FC<PagerProps> = (props) => {
  const { topPath, total, page, perPage } = props;

  const prevPage = page > 1 ? page - 1 : null;
  let nextPage = null;
  const pages = Math.ceil(total / perPage);
  if (page < pages) {
    nextPage = page + 1;
  }

  return (
    <nav className="flex w-full flex-row justify-between gap-8 text-xl">
      <span className="flex items-center justify-center">
        {prevPage ? (
          prevPage === 1 ? (
            <Link href={topPath}>
              <div className="pager-visible text-[color:var(--prevfg)] transition hover:bg-[color:var(--hover)]">
                <ChevronCircleLeftIcon className="h-4 w-4 fill-current" />
                Prev
              </div>
            </Link>
          ) : (
            <Link href={`${topPath}/page/${prevPage}`}>
              <div className="pager-visible text-[color:var(--prevfg)] transition">
                <ChevronCircleLeftIcon className="h-4 w-4 fill-current" />
                Prev
              </div>
            </Link>
          )
        ) : (
          <div className="pager-invisible"></div>
        )}
      </span>
      <span className="flex items-center justify-center">
        <div>
          {page} / {pages}
        </div>
      </span>
      <span className="flex items-center justify-center">
        {nextPage ? (
          <Link href={`${topPath}/page/${nextPage}`}>
            <div className="pager-visible border-solid border-[color:var(--nextbg)] bg-[color:var(--nextbg)] text-[color:var(--bg)] transition hover:border hover:bg-[color:var(--bg)] hover:text-[color:var(--nextbg)]">
              Next
              <ChevronCircleRightIcon className="h-4 w-4 fill-current" />
            </div>
          </Link>
        ) : (
          <div className="pager-invisible"></div>
        )}
      </span>
    </nav>
  );
};

export default Pager;
