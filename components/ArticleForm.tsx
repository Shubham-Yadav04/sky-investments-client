'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Editor from './Editor';

interface ArticleFormProps {
    initialData?: any;
}

export default function ArticleForm({ initialData }: ArticleFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const categoryOptions = [
        'Market Analysis & Trends',
        'IPO & Listing Insights',
        'Sector Deep Dives',
        'Growth Companies',
        'Personal Finance & Wealth Creation',
        'Commodities & Alternative Assets',
        'Geopolitics & Macroeconomics',
        'Financial Literacy & Basics',
    ];

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        coverImage: initialData?.coverImage || '',
        category: initialData?.category || categoryOptions[0],
        isTrending: initialData?.isTrending ?? false,
        isPublished: initialData?.isPublished ?? false, // Default false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const target = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: target.type === 'checkbox' ? target.checked : value }));
    };

    const generateSlug = () => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = initialData
                ? `/api/articles/${initialData.slug}`
                : '/api/articles';

            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Something went wrong');
            }

            router.push('/admin');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to save article');
        } finally {
            setLoading(false);
        }
    };

    return (
       <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto font-sans">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 tracking-wide"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={!initialData ? generateSlug : undefined}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded
                     bg-white dark:bg-black text-gray-900 dark:text-gray-100
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 dark:focus:ring-gray-400
                     font-medium tracking-wide"
          required
          placeholder="Enter the article title"
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 tracking-wide"
        >
          Slug
        </label>
        <input
          id="slug"
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded
                     bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-400
                     placeholder-gray-500 dark:placeholder-gray-600
                     font-medium tracking-wide"
          required
          disabled={!!initialData}
          placeholder="auto-generated-slug"
        />
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 tracking-wide"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded
                     bg-white dark:bg-black text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 dark:focus:ring-gray-400
                     font-medium tracking-wide"
          required
        >
          {categoryOptions.map((category) => (
            <option
              key={category}
              value={category}
              className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-normal"
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="coverImage"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 tracking-wide"
        >
          Cover Image URL
        </label>
        <input
          id="coverImage"
          type="text"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded
                     bg-white dark:bg-black text-gray-900 dark:text-gray-100
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 dark:focus:ring-gray-400
                     font-medium tracking-wide"
        />
      </div>

      <div className="flex items-center gap-6 pt-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isTrending"
            name="isTrending"
            checked={formData.isTrending}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isTrending: e.target.checked }))
            }
            className="h-4 w-4 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded
                       focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 dark:focus:ring-gray-400 bg-white dark:bg-black"
          />
          <label
            htmlFor="isTrending"
            className="text-sm font-semibold text-gray-700 dark:text-gray-300 select-none tracking-wide"
          >
            Trending
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))
            }
            className="h-4 w-4 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded
                       focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 dark:focus:ring-gray-400 bg-white dark:bg-black"
          />
          <label
            htmlFor="isPublished"
            className="text-sm font-semibold text-gray-700 dark:text-gray-300 select-none tracking-wide"
          >
            Publish immediately?
          </label>
        </div>
      </div>
    </div>
  </div>

  <div>
    <label
      htmlFor="excerpt"
      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 tracking-wide"
    >
      Excerpt (Short description)
    </label>
    <textarea
      id="excerpt"
      name="excerpt"
      value={formData.excerpt}
      onChange={handleChange}
      rows={3}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded
                 bg-white dark:bg-black text-gray-900 dark:text-gray-100
                 placeholder-gray-400 dark:placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 dark:focus:ring-gray-400
                 font-medium tracking-wide"
      required
      placeholder="Write a short summary..."
    />
  </div>

  <div>
    <label
      htmlFor="content"
      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 tracking-wide"
    >
      Content
    </label>
    <div
      id="content"
      className="min-h-[400px] rounded border border-gray-300 dark:border-gray-600
                 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
    >
      <Editor
        value={formData.content}
        onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
      />
    </div>
  </div>

  <div className="flex justify-end pt-4">
    <button
      type="submit"
      disabled={loading}
      className="bg-gray-900 dark:bg- text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors font-semibold tracking-wide disabled:opacity-50"
    >
      {loading ? 'Saving...' : initialData ? 'Update Article' : 'Create Article'}
    </button>
  </div>
</form>


    );
}
