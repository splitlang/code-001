# many_to_many.py
class Article:
    all = []

    def __init__(self, author, magazine, title):
        self.author = author
        self.magazine = magazine
        self.title = title
        author._articles.append(self)
        self.magazine.add_article(self)
        Article.all.append(self)

    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, title):
        if isinstance(title, str) and 5 <= len(title) <= 50:
            if not hasattr(self, '_title'):
                self._title = title
            else:
                raise AttributeError("Cannot change article's title after initialization.")
        else:
            raise ValueError("Article title must be a string between 5 and 50 characters long.")

    @property
    def author(self):
        return self._author

    @author.setter
    def author(self, author):
        if isinstance(author, Author):
            self._author = author
        else:
            raise ValueError("Author must be an instance of the Author class.")

    @property
    def magazine(self):
        return self._magazine

    @magazine.setter
    def magazine(self, magazine):
        if isinstance(magazine, Magazine):
            self._magazine = magazine
        else:
            raise ValueError("Magazine must be an instance of the Magazine class.")

class Author:
    def __init__(self, name):
        self.name = name
        self._articles = []

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, name):
        if isinstance(name, str) and len(name) > 0:
            if not hasattr(self, '_name'):
                self._name = name
            else:
                raise AttributeError("Cannot change author's name after initialization.")
        else:
            raise ValueError("Author's name must be a non-empty string.")

    def articles(self):
        return self._articles

    def magazines(self):
        return list(set(article.magazine for article in self._articles))

    def add_article(self, magazine, title):
        article = Article(self, magazine, title)
        return article

    def topic_areas(self):
        if not self._articles:
            return None
        return list(set(article.magazine.category for article in self._articles))

class Magazine:
    def __init__(self, name, category):
        self.name = name
        self.category = category
        self._articles = []

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, name):
        if isinstance(name, str) and 2 <= len(name) <= 16:
            self._name = name
        else:
            raise ValueError("Magazine name must be a string between 2 and 16 characters long.")

    @property
    def category(self):
        return self._category

    @category.setter
    def category(self, category):
        if isinstance(category, str) and len(category) > 0:
            self._category = category
        else:
            raise ValueError("Magazine category must be a non-empty string.")

    def add_article(self, article):
        self._articles.append(article)

    def article_titles(self):
        return [article.title for article in self._articles]

    def contributing_authors(self):
        author_counts = {}
        for article in self._articles:
            author = article.author
            author_counts[author] = author_counts.get(author, 0) + 1
        return [author for author, count in author_counts.items() if count > 2]
    
    __all__ = ['Article', 'Author', 'Magazine']