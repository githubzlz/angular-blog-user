import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/common/service/blog.service';
import { PageInfoModel } from 'src/app/common/model/commonmodel/pageInfo.model';
import { ResultSetModel } from 'src/app/common/model/commonmodel/resultset.model';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { BlogTypeService } from 'src/app/common/service/blogType.service';
import {ModuleService} from '../../../common/service/module.service';
import {ModuleModel} from '../../../common/model/module/module.model';
import {BlogModel} from '../../../common/model/article/blog.model';
import {MessageShowEnum} from '../../../common/constant/message.enum';

@Component({
  selector: 'app-blog',
  templateUrl: './blogList.component.html',
  styleUrls: ['./blogList.component.css'],
})
export class BlogListComponent implements OnInit {
  constructor(
    private router: Router,
    private blogService: BlogService,
    private message: NzMessageService,
    private blogTypeService: BlogTypeService,
    private moduleService: ModuleService
  ) {}

  // 所有的模块
  modules: Array<ModuleModel>;
  // 查询选中的模块
  moduleSelectedIndexes = [];

  // 是否显示菜单的选择
  showMenuSelect = false;
  // 选中模块包含的菜单
  secondCategory: Array<ModuleModel>;
  // 选中的菜单
  secondCategorySelectedIds = [];

  // 标签列表
  listOfTag: Array<any>;

  // 文章列表
  blogs: Array<BlogModel>;

  // 分页信息
  pageInfo: PageInfoModel = new PageInfoModel();

  // 过滤条件
  blog: BlogModel = new BlogModel();

  // 接口返回的数据
  resultSet: ResultSetModel = new ResultSetModel();

  // 列表表头的过滤器
  statusFilters: Array<any> = [
    { text: '正常', value: '0' },
    { text: '删除', value: '1' },
    { text: '审核中', value: '2' },
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

  // 修改文章标题和摘要时的编辑缓存
  editCache: { [key: string]: { edit: boolean; data: BlogModel } } = {};


  ngOnInit() {
    this.listInit(1, 10);
    this.queryTypeTree();
  }

  /**
   * 页面跳转
   * @param id id
   */
  moreInfomation(id: string) {
    this.router.navigate(['/write/write'], {
      skipLocationChange: true,
      queryParams: {
        bid: id,
      },
    });
  }

  /**
   * 查询模块
   */
  queryTypeTree() {

    const module = new ModuleModel();
    const pageInfo = new PageInfoModel();
    pageInfo.pageSize = 10000;
    pageInfo.pageNum = 1;
    module.pageInfo = pageInfo;
    this.moduleService.queryCategoryPageList(module, MessageShowEnum.NONE).subscribe((data) => {
      const dataE: ResultSetModel = data;
      this.modules = dataE.entity.list;
    });
  }

  /**
   * 根据选中的模块刷新菜单选项
   */
  refreshSecondCategory() {
    const length = this.moduleSelectedIndexes.length;
    // @ts-ignore
    this.showMenuSelect = length === 1;
    if (this.showMenuSelect) {
      // 查询二级分类信息
      const category = new ModuleModel();
      category.parentId = this.modules[this.moduleSelectedIndexes[0]].id;
      category.level = 2;
      category.pageInfo = {
        pageSize: 100,
        pageNum: 1
      };
      this.secondCategorySelectedIds = [];
      if (this.moduleSelectedIndexes.length === 1) {
        this.moduleService.queryCategoryPageList(category, MessageShowEnum.NONE).subscribe((res: ResultSetModel) => {
          if (ResultSetModel.isSuccess(res)) {
            this.secondCategory = res.entity.list;
          }
        });
      }
    }
  }

  /**
   * 列表查询
   */
  selectList() {

    // 构造查询条件
    const select: BlogModel = new BlogModel();
    // 分页信息
    select.pageInfo.pageNum = this.pageInfo.pageNum;
    select.pageInfo.pageSize = this.pageInfo.pageSize;
    // 过滤条件
    // 有过滤条件
    if (this.pageInfo.exclude && this.pageInfo.exclude.length !== 0) {
      select.pageInfo.exclude = this.pageInfo.exclude;
    } else {
    // 没有过滤条件时默认查未删除的文章
      select.pageInfo.exclude = new Array<any>();
      select.pageInfo.exclude.push({
        column: 'isDeleted',
        value: '0',
      });
    }

    // 根据种类过滤
    if (this.secondCategorySelectedIds.length !== 0) {
      select.categoryIds = this.secondCategorySelectedIds;
    } else {
      select.categoryIds = [];
      this.moduleSelectedIndexes.forEach(data => {
        select.categoryIds.push(this.modules[data].id);
      });
    }
    // 根据标签过滤
    select.tags = this.blog.tags;
    // 根据文章标题过滤
    select.title = this.blog.title;
    // 根据文章内容过滤
    select.blogContent.contentMd = this.blog.blogContent.contentMd;
    this.blogService.selectList(select).subscribe(
      (data) => {
        this.resultSet = data;
        this.pageInfo.pageNum = this.resultSet.entity.pageNum;
        this.pageInfo.pageSize = this.resultSet.entity.pageSize;
        this.pageInfo.totalSize = this.resultSet.entity.totalSize;
        this.blogs = this.resultSet.entity.list;
        this.updateEditCache();
      },
      (error) => {
        // this.message.error('查询列表失败,请重试', { nzDuration: 4000 });
      }
    );
  }

  /**
   * 状态过滤条件添加
   * @param value value
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
    const blog: BlogModel = new BlogModel();
    blog.id = this.editCache[id].data.id;
    blog.summary = this.editCache[id].data.summary;
    blog.title = this.editCache[id].data.title;
    this.blogService.updateTitleOrSummary(blog).subscribe(
      (data) => {
        Object.assign(this.blogs[index], this.editCache[id].data);
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
      data: { ...this.blogs[index] },
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
    this.blogs.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  /**
   * 重置查询条件
   */
  reSetTerms() {
    // 过滤条件重置
    this.moduleSelectedIndexes = [];
    this.secondCategorySelectedIds = [];
    this.blog = new BlogModel();
    // 分页查询条件重置
    this.pageInfo.list = null;
    this.pageInfo.exclude = null;
    this.pageInfo.orders = null;
    // 刷新列表
    this.selectList();
  }

  /**
   * 删除文章
   * @param id id
   */
  deletedArtcle(id: string) {
    this.blogService.deletedArtcle(id).subscribe(
      (data) => {
        this.resultSet = data;
        if (this.resultSet.code === 1) {
          this.listInit(this.pageInfo.pageNum, this.pageInfo.pageSize);
          this.message.success('删除成功,您还可以在回收站中找到它', {
            nzDuration: 4000,
          });
        } else {
          this.message.error(this.resultSet.message, { nzDuration: 4000 });
        }
      },
      (error) => {
        this.message.error('文章删除失败,请重试', { nzDuration: 4000 });
      }
    );
  }

  /**
   * 撤销删除
   */
  revokeDeletedArtcle(id: string) {
    this.blogService.revokeDeleted(id).subscribe(
      (data) => {
        this.resultSet = data;
        if (this.resultSet.code === 1) {
          this.listInit(this.pageInfo.pageNum, this.pageInfo.pageSize);
          this.message.success('恢复成功', {
            nzDuration: 4000,
          });
        } else {
          this.message.error('文章恢复失败,请重试', { nzDuration: 4000 });
        }
      },
      (error) => {
        this.message.error('文章恢复失败,请重试', { nzDuration: 4000 });
      }
    );
  }
}
