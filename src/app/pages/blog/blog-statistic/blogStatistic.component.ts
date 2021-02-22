import { Component, OnInit } from '@angular/core';
import { ResultSetModel } from '../../../common/model/commonmodel/resultset.model';
import { NzMessageService } from 'ng-zorro-antd';
import { BlogService } from '../../../common/service/blog.service';
import {BlogModel} from '../../../common/model/article/blog.model';

@Component({
  selector: 'app-blog-statistic',
  templateUrl: './blogStatistic.component.html',
  styleUrls: ['./blogStatistic.component.css'],
})
export class BlogStatisticComponent implements OnInit {
  hotList: Array<BlogModel>;
  homepageList: Array<BlogModel>;
  isVisibleAdd = false;
  listOfData: Array<BlogModel> = new Array<BlogModel>();
  index = 0;
  checkList: Array<BlogModel> = new Array<BlogModel>();
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
    private blogService: BlogService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    // this.getHotList();
    // this.getList();
  }

  // getHotList() {
  //   this.recommendService.getHotBlogs(10).subscribe((data) => {
  //     const blogData: ResultSetModel = data;
  //     if (blogData.code === 1) {
  //       this.hotList = blogData.entity;
  //     }
  //   });
  // }

  // getList() {
  //   if (this.recommendName === '侧栏') {
  //     this.recommendService.getSideBlogs().subscribe((data) => {
  //       const blogData: ResultSetModel = data;
  //       if (blogData.code === 1) {
  //         if (blogData.entity) {
  //           this.homepageList = blogData.entity;
  //         } else {
  //           this.homepageList = [];
  //         }
  //       }
  //     });
  //   } else {
  //     this.recommendService.getHomepageBlogs().subscribe((data) => {
  //       const blogData: ResultSetModel = data;
  //       if (blogData.code === 1) {
  //         if (blogData.entity) {
  //           this.homepageList = blogData.entity;
  //         } else {
  //           this.homepageList = [];
  //         }
  //       }
  //     });
  //   }
  // }

  recommendClick() {
    let type = '1';
    if (this.recommendName === '侧栏') {
      type = '0';
    }
    this.blogService.getAllBlog(type).subscribe((data) => {
      this.listOfData = new Array<BlogModel>();
      const blogData: ResultSetModel = data;
      if (blogData.code === 1) {
        blogData.entity.forEach((data2) => {
          const blog1: BlogModel = data2;
          const blog = new BlogModel();
          blog.id = blog1.id;
          blog.title = blog1.title;
          blog.tag = blog1.tag;
          blog.blogRecommend.recommendType = 0;
          this.listOfData.push(blog);
        });
        this.isVisibleAdd = true;
      }
    });
  }

  // cancel(id: string) {
  //   this.recommendService.cancel(id).subscribe((data) => {
  //     const blogData: ResultSetModel = data;
  //     if (blogData.code === 1) {
  //       this.getHotList();
  //       this.getList();
  //       this.message.success('取消推荐成功', { nzDuration: 1000 });
  //     } else {
  //       this.message.error('取消推荐失败', { nzDuration: 1000 });
  //     }
  //   });
  // 111}
  handleCancelAdd() {
    this.isVisibleAdd = false;
    this.checkList = new Array<BlogModel>();
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
      // this.recommendService.recommendList(this.checkList).subscribe((data) => {
      //   const blogData: ResultSetModel = data;
      //   if (blogData.code === 1) {
      //     this.checkList = new Array<BlogModel>();
      //     this.searchInput = '';
      //     this.getList();
      //     this.revertStep();
      //     this.isVisibleAdd = false;
      //   }
      // });
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

  onExpandChange(blog: BlogModel, expand) {
    blog.expand = !blog.expand;
  }

  handleChange(info: any, data: BlogModel): void {
    if (info !== undefined && info.type === 'success') {
      this.message.success('图片上传成功', { nzDuration: 2000 });
      const url = info.file.response.entity;
      data.blogRecommend.imageUrl = url;
    }
  }
}
