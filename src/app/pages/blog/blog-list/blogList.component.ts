import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/common/service/blog.service';
import { PageInfoModel } from 'src/app/common/model/commonmodel/pageInfo.model';
import { ResultSetModel } from 'src/app/common/model/commonmodel/resultset.model';
import { NzMessageService } from 'ng-zorro-antd';
import { ArticleModel } from 'src/app/common/model/article/article.model';
import { BlogPublicInfoModel } from 'src/app/common/model/article/BlogPublicInfo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blogList.component.html',
  styleUrls: ['./blogList.component.css'],
})
export class BlogListComponent implements OnInit {
  constructor(
    private router: Router,
    private blogService: BlogService,
    private message: NzMessageService
  ) {}
  pageInfo: PageInfoModel = new PageInfoModel();
  resultSet: ResultSetModel = new ResultSetModel();
  articles: Array<ArticleModel> = new Array();
  deletedMap: Map<string, string> = new Map<string, string>();
  listOfType: any[] = ['JAVA', 'PATHON', 'C', 'C++', 'MYSQL'];
  listButton: Array<any> = new Array();
  statusFilters: Array<any> = [
    { text: '正常', value: '0' },
    { text: '删除', value: '1' },
    { text: '审核中', value: '2' },
  ];
  perviousTagTypes: any[] = [
    {
      type: '大数据',
      tags: ['JAVA', 'PATHON', 'C', 'C++', 'MYSQL'],
    },
    {
      type: '语言',
      tags: ['JAVA', 'PATHON', 'C', 'C++'],
    },
    {
      type: '数据库',
      tags: ['PATHON', 'MYSQL'],
    },
  ];
  // 查询未删除条件
  deletedExclude: any = {
    column: 'isDeleted',
    value: '0',
  };
  // 审核条件
  showExclude: any = {
    column: 'isShow',
    value: '1',
  };
  // 编辑缓存
  editCache: { [key: string]: { edit: boolean; data: ArticleModel } } = {};
  // 过滤条件
  blog: ArticleModel = new ArticleModel();

  ngOnInit() {
    this.listInit(1, 10);
    this.buttonOnInit(this.listOfType);
  }

  /**
   * 页面跳转
   * @param id id
   */
  moreInfomation(id: string) {
    this.router.navigate(['/other/blogdetailinfo'], {
      skipLocationChange: true,
      queryParams: {
        bid: id,
      },
    });
  }

  /**
   * 状态过滤条件添加
   * @param value
   */
  nzFilterChange(value: Array<string>) {
    if (!value) {
      this.pageInfo.exclude = null;
      this.selectList();
      return;
    }
    const tag = value.toString();
    // 查询正常状态(未删除，审核通过)
    if (tag === '0') {
      this.pageInfo.exclude = new Array<any>();
      this.pageInfo.exclude.push({
        column: 'isDeleted',
        value: '0',
      });
      this.pageInfo.exclude.push({
        column: 'isShow',
        value: '1',
      });
    }
    // 查询删除数据(已删除)
    if (tag === '1') {
      this.pageInfo.exclude = new Array<any>();
      this.pageInfo.exclude.push({
        column: 'isDeleted',
        value: '1',
      });
    }
    // 查询审核中数据(未删除,审核中)
    if (tag === '2') {
      this.pageInfo.exclude = new Array<any>();
      this.pageInfo.exclude.push({
        column: 'isDeleted',
        value: '0',
      });
      this.pageInfo.exclude.push({
        column: 'isShow',
        value: '0',
      });
    }
    this.selectList();
  }

  /**
   * 初始化表格数据
   * @param num num
   * @param size size
   */
  listInit(num: number, size: number) {
    this.pageInfo.pageNum = num;
    this.pageInfo.pageSize = size;
    this.selectList();
  }

  /**
   * 过滤按钮初始化
   * @param listOfType listOfType
   */
  buttonOnInit(listOfType: Array<string>) {
    this.listButton.push({ state: 'primary', name: '全部' });
    listOfType.forEach((item) => {
      const str = { state: 'default', name: item };
      this.listButton.push(str);
    });
  }

  /**
   * 开始编辑表格
   * @param index index
   * @param id id
   */
  editArtcle(index: number, id: string) {
    this.editCache[id].edit = true;
    console.log(this.editCache[id].data);
  }

  /**
   * 保存编辑内容
   * @param index index
   * @param id id
   */
  saveEdit(index: number, id: string) {
    const blog: ArticleModel = new ArticleModel();
    blog.id = this.editCache[id].data.id;
    blog.summary = this.editCache[id].data.summary;
    blog.title = this.editCache[id].data.title;
    this.blogService.updateTitleOrSummary(blog).subscribe(
      (data) => {
        Object.assign(this.articles[index], this.editCache[id].data);
        this.editCache[id].edit = false;
        this.message.success('修改成功', { nzDuration: 1000 });
      },
      () => {
        this.message.error('修改失败', { nzDuration: 1000 });
      }
    );
  }

  /**
   * 放弃编辑
   * @param index index
   * @param id id
   */
  cancelEdit(index: number, id: string) {
    this.editCache[id] = {
      data: { ...this.articles[index] },
      edit: false,
    };
  }

  /**
   * 换页
   * @param data data
   */
  nzPageIndexChange(data: number) {
    this.pageInfo.pageNum = data;
    this.selectList();
  }

  /**
   * 设置每页的数量
   * @param data data
   */
  nzPageSizeChange(data: number) {
    this.pageInfo.pageSize = data;
    this.selectList();
  }

  /**
   * 更新表格编辑的缓存
   */
  updateEditCache(): void {
    this.articles.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  /**
   * 添加过滤
   * @param term 类型过滤
   */
  addTerms(index: number) {
    this.listButton.forEach((item) => {
      item.state = 'default';
    });
    this.listButton[index].state = 'primary';

    if (this.listButton[index].name === '全部') {
      this.blog.type = null;
      this.selectList();
      return;
    }
    this.blog.type = this.listButton[index].name;
    this.selectList();
  }

  /**
   * 重置查询条件
   */
  reSetTerms() {
    // 过滤条件重置
    this.blog = new ArticleModel();

    // 分页查询条件重置
    this.pageInfo.list = null;
    this.pageInfo.exclude = null;
    this.pageInfo.orders = null;

    // 按钮重置
    this.listButton.forEach((item) => {
      item.state = 'default';
    });
    this.listButton[0].state = 'primary';
    this.blog.type = null;

    // 刷新列表
    this.selectList();
  }

  /**
   * 列表查询
   */
  selectList() {
    const select: ArticleModel = new ArticleModel();
    select.pageInfo.pageNum = this.pageInfo.pageNum;
    select.pageInfo.pageSize = this.pageInfo.pageSize;
    select.pageInfo.exclude = this.pageInfo.exclude;
    select.tags = this.blog.tags;
    select.type = this.blog.type;
    select.title = this.blog.title;
    select.blogContent.contentMd = this.blog.blogContent.contentMd;
    this.blogService.selectList(select).subscribe(
      (data) => {
        this.resultSet = data;
        this.pageInfo.pageNum = this.resultSet.entity.pageNum;
        this.pageInfo.pageSize = this.resultSet.entity.pageSize;
        this.pageInfo.totalSize = this.resultSet.entity.totalSize;
        this.articles = this.resultSet.entity.list;
        this.updateEditCache();
      },
      (error) => {
        // this.message.error('查询列表失败,请重试', { nzDuration: 4000 });
      }
    );
  }

  /**
   * 删除文章
   * @param id id
   */
  deletedArtcle(id: string) {
    console.log(id);
    this.blogService.deletedArtcle(id).subscribe(
      (data) => {
        this.resultSet = data;
        if (this.resultSet.code === 1) {
          this.listInit(this.pageInfo.pageNum, this.pageInfo.pageSize);
          this.message.success('删除成功,您还可以在回收站中找到它', {
            nzDuration: 4000,
          });
        } else {
          this.message.error('文章删除失败,请重试', { nzDuration: 4000 });
        }
      },
      (error) => {
        this.message.error('文章删除失败,请重试', { nzDuration: 4000 });
      }
    );
  }
}