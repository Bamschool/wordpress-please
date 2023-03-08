import { useRouter } from "next/router";
import Sidebar from "../../components/documentation/sidebar";
import Layout from "../../components/blog/layout";
const categories = [
  {
    title: "Getting Started",
    pages: [
      { subtitle: "Introduction", slug: "introduction" },
      { subtitle: "Installation", slug: "installation" },
      { subtitle: "Usage", slug: "usage" },
    ],
  },
  {
    title: "Configuration",
    pages: [
      { subtitle: "Basic Configuration", slug: "basic-configuration" },
      { subtitle: "Advanced Configuration", slug: "advanced-configuration" },
    ],
  },
  {
    title: "Deployment",
    pages: [
      { subtitle: "Heroku", slug: "heroku" },
      { subtitle: "Vercel", slug: "vercel" },
      { subtitle: "AWS", slug: "aws" },
    ],
  },
];

const DocumentationPage = (preview) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Layout preview={preview}>
      <div className="flex">
        <Sidebar categories={categories} />

        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold"> {slug}</h1>
          {/* 이곳에 해당 slug에 맞는 문서 내용을 추가하세요 */}
        </div>
      </div>
    </Layout>
  );
};

export default DocumentationPage;
