<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $categories = Category::when($search, function ($query) use ($search) {
            $query->where('name', 'like', "%{$search}%");
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

        $totalCategories = Category::count();

        $activeCategories = Category::where(
            'is_active',
            true
        )->count();

        $inactiveCategories = Category::where(
            'is_active',
            false
        )->count();

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
            'filters' => [
                'search' => $search,
            ],

            'stats' => [
                'total' => $totalCategories,
                'active' => $activeCategories,
                'inactive' => $inactiveCategories,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable',
            'is_active' => 'boolean',
        ]);

        Category::create($validated);

        return redirect()->route('categories.index')
            ->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable',
            'is_active' => 'boolean',
        ]);

        $category->update($validated);

        return redirect()
        ->route('categories.index')
        ->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(Category $category)
    {
        if ($category->products()->exists()) {
            return back()->with(
                'error',
                'Kategori tidak dapat dihapus karena masih digunakan oleh satu atau lebih produk.'
            );
        }

        $category->delete();

        return back()->with(
            'success',
            'Kategori berhasil dihapus.'
        );
    }
}