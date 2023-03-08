import Avatar from "./Avatar-sentence";
import Date from "../blog/date";
import KoreanCoverImage from "./korean-coverimage";
import PostTitle from "../blog/post-title";
import KoreanCategories from "./korean-categories";

export default function KoreanHeader({
  title,
  coverImage,
  date,
  author,
  categories,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar author={author} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <KoreanCoverImage title={title} coverImage={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar author={author} />
        </div>
        <div className="mb-6 text-lg">
          Posted <Date dateString={date} />
          <KoreanCategories categories={categories} />
        </div>
      </div>
    </>
  );
}
