import { Component, OnInit } from '@angular/core';
import { RecommendService } from '../../../common/service/Recommend.service';
import { ResultSetModel } from '../../../common/model/commonmodel/resultset.model';
import { ArticleModel } from '../../../common/model/article/article.model';
import { NzMessageService } from 'ng-zorro-antd';
import { BlogService } from '../../../common/service/blog.service';

@Component({
  selector: 'app-blog-statistic',
  templateUrl: './blogStatistic.component.html',
  styleUrls: ['./blogStatistic.component.css'],
})
export class BlogStatisticComponent implements OnInit {
  hotList: Array<ArticleModel>;
  homepageList: Array<ArticleModel>;
  isVisibleAdd = false;
  listOfData: Array<ArticleModel> = new Array<ArticleModel>();
  index = 0;
  checkList: Array<ArticleModel> = new Array<ArticleModel>();
  recommendLevel: any;
  searchInput = '';
  step = [
    {
      index: 0,
      state: 'process',
      title: '选择文章',
    },
    {
      index: 2,
      state: 'wait',
      title: '上传banner',
    },
  ];
  recommendName = '首页';
  constructor(
    private recommendService: RecommendService,
    private blogService: BlogService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getHotList();
    this.getList();
  }

  getHotList() {
    this.recommendService.getHotBlogs(10).subscribe((data) => {
      const blogData: ResultSetModel = data;
      if (blogData.code === 1) {
        this.hotList = blogData.entity;
      }
    });
  }

  getList() {
    if (this.recommendName === '侧栏') {
      this.recommendService.getSideBlogs().subscribe((data) => {
        const blogData: ResultSetModel = data;
        if (blogData.code === 1) {
          if (blogData.entity) {
            this.homepageList = blogData.entity;
          } else {
            this.homepageList = [];
          }
        }
      });
    } else {
      this.recommendService.getHomepageBlogs().subscribe((data) => {
        const blogData: ResultSetModel = data;
        if (blogData.code === 1) {
          if (blogData.entity) {
            this.homepageList = blogData.entity;
          } else {
            this.homepageList = [];
          }
        }
      });
    }
  }

  recommendClick() {
    let type = '1';
    if (this.recommendName === '侧栏') {
      type = '0';
    }
    this.blogService.getAllBlog(type).subscribe((data) => {
      this.listOfData = new Array<ArticleModel>();
      const blogData: ResultSetModel = data;
      if (blogData.code === 1) {
        blogData.entity.forEach((data2) => {
          const article: ArticleModel = data2;
          const blog = new ArticleModel();
          blog.id = article.id;
          blog.title = article.title;
          blog.type = article.type;
          blog.tag = article.tag;
          blog.blogRecommend.recommendType = 0;
          this.listOfData.push(blog);
        });
        this.isVisibleAdd = true;
      }
    });
  }

  cancel(id: string) {
    this.recommendService.cancel(id).subscribe((data) => {
      const blogData: ResultSetModel = data;
      if (blogData.code === 1) {
        this.getHotList();
        this.getList();
        this.message.success('取消推荐成功', { nzDuration: 1000 });
      } else {
        this.message.error('取消推荐失败', { nzDuration: 1000 });
      }
    });
  }
  handleCancelAdd() {
    this.isVisibleAdd = false;
    this.checkList = new Array<ArticleModel>();
    this.searchInput = '';
    this.revertStep();
  }

  checkedBlog(id: string) {
    for (const item of this.checkList) {
      if (item.id === id) {
        return true;
      }
    }
    return false;
  }

  handleOkAdd() {
    if (this.index === 0) {
      if (this.checkList.length !== 0) {
        this.index++;
        this.step[0].state = 'finish';
        this.step[1].state = 'process';
      } else {
        this.message.info('请添加需要推荐的文章', { nzDuration: 1000 });
      }
    } else if (this.index === 1) {
      if (this.recommendName === '侧栏') {
        this.checkList.forEach((item) => {
          item.blogRecommend.recommendType = 0;
        });
      } else {
        this.checkList.forEach((item) => {
          item.blogRecommend.recommendType = 1;
        });
      }
      this.recommendService.recommendList(this.checkList).subscribe((data) => {
        const blogData: ResultSetModel = data;
        if (blogData.code === 1) {
          this.checkList = new Array<ArticleModel>();
          this.searchInput = '';
          this.getList();
          this.revertStep();
          this.isVisibleAdd = false;
        }
      });
    }
  }

  revertStep() {
    this.step = [
      {
        index: 0,
        state: 'process',
        title: '选择文章',
      },
      {
        index: 1,
        state: 'wait',
        title: '上传banner',
      },
    ];
    this.index = 0;
  }

  onIndexChange(event: number): void {
    this.index = event;
  }

  addRem(blog, checked) {
    const check = this.checkList.filter((item) => {
      return item.id === blog.id;
    });

    if (checked) {
      if (check === undefined || check.length === 0) {
        this.checkList.push(blog);
      }
    } else {
      if (check.length === 1) {
        const index = this.checkList.indexOf(check[0]);
        this.checkList.splice(index, 1);
      }
    }
  }

  onExpandChange(blog: ArticleModel, expand) {
    blog.expand = !blog.expand;
  }

  handleChange(info: any, data: ArticleModel): void {
    if (info !== undefined && info.type === 'success') {
      this.message.success('图片上传成功', { nzDuration: 2000 });
      const url = info.file.response.entity;
      data.blogRecommend.imageUrl = url;
    }
  }
}
