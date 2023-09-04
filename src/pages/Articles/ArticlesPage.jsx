import NewsArticles from "../../components/layout/ui/news/NewsFeed";
import { NewsService } from "../../services/news.service";
import { useQuery } from "@tanstack/react-query";

function ArticlesPage() {
  const { data } = useQuery(["articles"], () => NewsService.getArticles());

  return (
    <>
      <NewsArticles news={data} />
    </>
  );
}

export default ArticlesPage;
