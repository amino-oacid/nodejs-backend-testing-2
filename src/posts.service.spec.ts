import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const foundedPosts = postsService.findMany();

      expect(foundedPosts).toEqual(postsService.getAll());
    });

    it('should return correct posts for skip and limit options', () => {
      const skip: number = 1;
      const limit: number = 2;

      const foundedPosts = postsService.findMany({ skip, limit });
      const expectedPosts: Post[] = [
        { id: '2', text: 'Post 2' },
        { id: '3', text: 'Post 3' },
      ];

      expect(foundedPosts).toEqual(expectedPosts);

    });

    it('should delete post', () => {
        postsService.delete('1');

        const posts = postsService.getAll();
        expect(posts[0]).toEqual({id: '2', text: 'Post 2'});
    });

    it('should update post', () => {
      postsService.update('2', {text: 'updated post'});

      expect(postsService.find('2')?.text).toEqual('updated post');
    });

  });
});