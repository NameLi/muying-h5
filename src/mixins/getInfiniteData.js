export const getInfiniteData = {
  data() {
    return {
      loading: false,
      noData: false,
      noMoreData: false,
      isError: false,
      list: [],
      total: 0,
      page: 1,
      per_page: 20,
      form: {},
    };
  },

  computed: {
    isShowSkeleton() {
      return this.loading && this.page === 1;
    },
  },

  mounted() {
    this.loadMore();
  },

  methods: {
    async getData(fn, ...args) {

      if (this.isError) return;

      if (this.noMoreData && this.page === 1 && this.list.length === 0) {
        this.noMoreData = false;
      }

      if (this.loading || this.noMoreData) return;

      this.loading = true;

      let params = {
        page: this.page,
        per_page: this.per_page,
        ...this.form
      };

      const { code, data, total } = await fn(...args, params);

      if (code === 200) {
        // 是否无数据
        if (this.page === 1 && data.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }

        this.isError = false;

        this.page++;

        this.list.push(...data);
        this.total = total || 0

        if (data.length < this.per_page) {
          this.noMoreData = true;
        }
      } else {
        this.isError = true;
      }

      this.$nextTick(() => {
        this.loading = false;
      });
    },
  },
}