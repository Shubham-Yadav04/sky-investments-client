import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Article from '@/models/Article';
import dbConnect from '@/lib/mongodb';
import { format } from 'date-fns';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import DeleteArticleButton from '@/components/DeleteArticleButton';



export default async function AdminDashboard() {
    await dbConnect();
    const articles = await Article.find({}).sort({ publishedAt: -1 }).lean();
 const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }
    return (
        <div>
              <div className="mb-8 flex items-center justify-between border-b pb-4">
                <h2 className="text-2xl font-serif font-semibold text-gray-900">Dashboard</h2>
                <span className="text-sm text-gray-500">Welcome, {session.user?.name}</span>
            </div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-xl text-gray-700">All Articles</h1>
                <div className="flex gap-3">
                    {/* <Link
                        href="/admin/import"
                        className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                        Import PDF
                    </Link> */}
                    <Link
                        href="/admin/new"
                        className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                       <Plus size={16} />
                        New Article
                    </Link>
                </div>
            </div>

            <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left bg-white">
    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
      <tr>
        <th className="px-6 py-4">Title</th>
        <th className="px-6 py-4">Status</th>
        <th className="px-6 py-4">Reads</th>
        <th className="px-6 py-4">Date</th>
        <th className="px-6 py-4 text-right">Actions</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-100">
      {articles.length === 0 ? (
        <tr>
          <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
            No articles found.
          </td>
        </tr>
      ) : (
        articles.map((article: any) => (
          <tr key={article._id.toString()} className="hover:bg-gray-50/50">
            <td className="px-6 py-4 font-medium text-gray-900">
              {article.title}
              <div className="text-xs text-gray-400 truncate max-w-xs">
                {article.slug}
              </div>
            </td>

            <td className="px-6 py-4">
              <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                article.isPublished
                  ? 'bg-green-50 text-green-700'
                  : 'bg-yellow-50 text-yellow-700'
              }`}>
                {article.isPublished ? 'Published' : 'Draft'}
              </span>
            </td>

            <td className="px-6 py-4 text-gray-500 text-sm">
              {article.reads || 0}
            </td>

            <td className="px-6 py-4 text-gray-500 text-sm">
              {format(new Date(article.publishedAt), 'MMM d, yyyy')}
            </td>

            <td className="px-6 py-4 text-right flex justify-end gap-3">
              <Link href={`/admin/edit/${article.slug}`} className="text-blue-600 hover:text-blue-800">
                <Edit2 size={18} />
              </Link>
              <DeleteArticleButton slug={article.slug} />
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>


            </div>
            
  <div className=" md:hidden space-y-4 w-full h-fit ">
  {articles.length === 0 ? (
    <div className="text-center text-gray-500 py-8">
      No articles found.
    </div>
  ) : (
    articles.map((article: any) => (
      <div
        key={article._id.toString()}
        className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm"
      >
        <div className="font-semibold text-gray-900">
          {article.title}
        </div>

        <div className="text-xs text-gray-400 truncate mt-1">
          {article.slug}
        </div>

        <div className="flex items-center justify-between mt-3 text-sm">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            article.isPublished
              ? 'bg-green-50 text-green-700'
              : 'bg-yellow-50 text-yellow-700'
          }`}>
            {article.isPublished ? 'Published' : 'Draft'}
          </span>

          <span className="text-gray-500">
            {format(new Date(article.publishedAt), 'MMM d, yyyy')}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500">
            Reads: {article.reads || 0}
          </span>

          <div className="flex items-center gap-4">
            <Link href={`/admin/edit/${article.slug}`}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit2 size={18} />
            </Link>
            <DeleteArticleButton slug={article.slug} />
          </div>
        </div>
      </div>
    ))
  )}
</div>
        </div>
    );
}
