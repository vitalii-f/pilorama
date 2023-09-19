import { FirestoreService } from "src/services/firestore.service";
import NewsArticles from "../../components/layout/ui/news/NewsFeed";
import { useQuery } from "@tanstack/react-query";

function ArticlesPage() {
  const { data } = useQuery(["articles"], () => FirestoreService.getArticles());

  return (
    <>
      <NewsArticles news={data} />
    </>
  );
}

export default ArticlesPage;
