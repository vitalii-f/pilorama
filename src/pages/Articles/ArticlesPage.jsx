import { FirestoreService } from "src/services/firestore.service";
import NewsArticles from "../../components/layout/ui/news/NewsFeed";
import { useQuery } from "@tanstack/react-query";

function ArticlesPage() {
  const { data, isLoading, isError } = useQuery(["articles"], () => FirestoreService.getArticles());

  if (isError) return <h2> Error... </h2>
  if (isLoading) return <h2> Loading.. </h2>
  return (
    <>
    {}
      <NewsArticles news={data} />
    </>
  );
}

export default ArticlesPage;
